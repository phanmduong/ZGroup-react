<?php

namespace Modules\StudyClass\Http\Controllers;

use App\ClassLesson;
use App\ClassLessonChange;
use App\Course;
use App\Gen;
use App\Group;
use App\Http\Controllers\ManageApiController;
use App\Repositories\ClassRepository;
use App\Repositories\CourseRepository;
use App\Repositories\RoomRepository;
use App\Repositories\ScheduleRepository;
use App\Repositories\UserRepository;
use App\Room;
use App\Schedule;
use App\StudyClass;
use App\Repositories\GenRepository;
use App\TeachingLesson;
use App\TeachingLessonChange;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ManageClassApiController extends ManageApiController
{
    protected $classRepository;
    protected $scheduleRepository;
    protected $roomRepository;
    protected $courseRepository;
    protected $genRepository;
    protected $userRepository;

    public function __construct(ClassRepository $classRepository, ScheduleRepository $scheduleRepository, RoomRepository $roomRepository,
                                CourseRepository $courseRepository, GenRepository $genRepository, UserRepository $userRepository)
    {
        parent::__construct();
        $this->classRepository = $classRepository;
        $this->scheduleRepository = $scheduleRepository;
        $this->roomRepository = $roomRepository;
        $this->courseRepository = $courseRepository;
        $this->userRepository = $userRepository;
        $this->genRepository = $genRepository;
    }

    public function get_classes(Request $request)
    {

        $search = $request->search;
        $limit = $request->limit ? $request->limit : 20;
        if ($request->limit)
            $limit = $request->limit;
        $classes = StudyClass::query();
        if ($search)
            $classes = $classes->where('name', 'like', '%' . $search . '%');
        if($request->gen_id)
            $classes = $classes->where('gen_id', $request->gen_id);
        if($request->base_id)
            $classes = $classes->where('base_id', $request->base_id);
        if ($request->teacher_id)
            $classes = $classes->where(function ($query) use ($request) {
                    $query->where('teacher_id', $request->teacher_id)
                        ->orWhere('teaching_assistant_id', $request->teacher_id);
                });

        $classes = $classes->orderBy('gen_id', 'desc')->paginate($limit);

        $data = [
            "classes" => $classes->map(function ($class) {
                $data = $this->classRepository->get_class($class);
                $data['edit_status'] = $this->classRepository->edit_status($this->user);
                $data['is_delete_class'] = $this->classRepository->is_delete($this->user, $class);
                $data['is_duplicate'] = $this->classRepository->is_duplicate($this->user);
                return $data;
            }),
            'is_create_class' => $this->classRepository->is_create($this->user)
        ];

        return $this->respondWithPagination($classes, $data);
    }

    public function duplicate_class($class_id)
    {
        $new_class = StudyClass::find($class_id)->replicate();
        $new_class->activated = 0;
        $new_class->save();

        $group = new Group();
        $group->name = "Lớp " . $new_class->name . " duplicate";
        $group->class_id = $new_class->id;
        $group->avatar_url = $new_class->course->icon_url;
        $group->creator_id = $this->user->id;
        $group->save();

        // auto generate time for class lesson
        generate_class_lesson($new_class);

        // create class lessons
        set_class_lesson_time($new_class);

        $data = $this->classRepository->get_class($new_class);

        $data['edit_status'] = $this->classRepository->edit_status($this->user);
        $data['is_delete_class'] = $this->classRepository->is_delete($this->user, $new_class);
        $data['is_duplicate'] = $this->classRepository->is_duplicate($this->user);

        return $this->respondSuccessWithStatus([
            'class' => $data
        ]);
    }

    public function delete_class(Request $request)
    {

        $class = StudyClass::find($request->class_id);

        if ($class) {
            if (!$this->classRepository->is_delete($this->user, $class)) {
                return $this->responseWithError("Không thể xóa lớp. Lớp đã có " . $class->registers()->count() . " học viên");
            }

            $class->delete();
            $group = $class->group;
            if ($group) {
                $group->delete();
            }

            return $this->respondSuccessWithStatus([
                'message' => "Xóa lớp thành công"
            ]);
        }

        return $this->responseWithError("Lớp không tồn tại");
    }

    public function change_status(Request $request)
    {

        if ($this->user->role === 2) {
            $class_id = $request->class_id;
            $class = $this->classRepository->change_status($class_id);
            if ($class) {
                return $this->respondSuccessWithStatus([
                    'class' => [
                        'id' => $class->id,
                        'status' => $class->status
                    ]
                ]);
            }
            return $this->responseWithError("Có lỗi xảy ra");
        }

        return $this->responseUnAuthorized();
    }

    public function get_data_class($class_id)
    {
        $class = StudyClass::find($class_id);

        if (!$class) {
            return $this->responseWithError("Lớp này không tồn tại");
        }

        $data = $this->classRepository->get_class($class);
        $registers = $this->classRepository->get_student($class);
        $attendances = $this->classRepository->get_attendances_class($class);

        if (isset($data['teacher']))
            $data['teacher']['attendances'] = $this->classRepository->attendances_teacher($class);

        if (isset($data['teacher_assistant']))
            $data['teacher_assistant']['attendances'] = $this->classRepository->attendances_teaching_assistant($class);

        if ($registers) {
            $data['registers'] = $registers;
        }

        if ($attendances) {
            $data['attendances'] = $attendances;
        }


        return $this->respondSuccessWithStatus([
            'class' => $data
        ]);
    }

    public function info_create_class()
    {


        $schedules = $this->scheduleRepository->schedules(Schedule::all());
        $rooms = $this->roomRepository->rooms(Room::orderBy('base_id')->get());
        $courses = $this->courseRepository->courses(Course::all());
        $gens = $this->genRepository->gens(Gen::orderBy('id', 'desc')->get());
        $staffs = $this->userRepository->staffs();

        return $this->respondSuccessWithStatus([
            'schedules' => $schedules,
            'rooms' => $rooms,
            'courses' => $courses,
            'gens' => $gens,
            'staffs' => $staffs,
        ]);

    }

    public function store_class(Request $request)
    {
        if ($request->id) {
            $class = StudyClass::find($request->id);
        } else {
            $class = new StudyClass();
        }

        $class->datestart = date('Y-m-d', strtotime($request->datestart));

        $class->name = $request->name;
        $class->schedule_id = $request->schedule_id;
        $class->room_id = $request->room_id;
        $class->base_id = Room::find($class->room_id)->base->id;
        $class->description = $request->description;

        $class->gen_id = $request->gen_id;
        $class->target = $request->target;
        $class->regis_target = $request->regis_target;
        $class->course_id = $request->course_id;
        $class->teaching_assistant_id = $request->teaching_assistant_id;
        $class->teacher_id = $request->teacher_id;
        $class->study_time = $request->study_time;
        $class->status = ($request->status == null) ? 0 : 1;
        $class->type = $request->type ? $request->type : "active";

        $class->save();


        if ($request->id) {
            $group = Group::where("class_id", $class->id)->first();
            if ($group) {
                $group->name = "Lớp " . $class->name;
                $group->avatar_url = $class->course->icon_url;
                $group->link = extract_class_name($class->name);
                $group->save();
            }
        } else {
            $group = new Group();
            $group->name = "Lớp " . $class->name;
            $group->creator_id = $this->user->id;
            $group->class_id = $class->id;
            $group->avatar_url = $class->course->icon_url;
            $group->link = extract_class_name($class->name);
            $group->save();

            $this->classRepository->generateClassLesson($class);

        }

        if ($request->schedule_id) {
            $this->classRepository->setClassLessonTime($class);
        }

        $data = $this->classRepository->get_class($class);

        $data['edit_status'] = $this->classRepository->edit_status($this->user);
        $data['is_delete_class'] = $this->classRepository->is_delete($this->user, $class);
        $data['is_duplicate'] = $this->classRepository->is_duplicate($this->user);


        return $this->respondSuccessWithStatus([
            'class' => $data
        ]);
    }

    public function change_class_lesson(Request $request)
    {

        if ($request->id) {
            $class_lesson = ClassLesson::find($request->id);

            if ($class_lesson) {
                $class_lesson_change = new ClassLessonChange();
                $class_lesson_change->class_lesson_id = $class_lesson->id;
                $class_lesson_change->old_time = $class_lesson->time;
                $class_lesson_change->new_time = format_date_to_mysql($request->time);
                $class_lesson_change->note = $request->note;
                $class_lesson_change->actor_id = $this->user->id;

                $class_lesson_change->save();
                $class_lesson->time = format_date_to_mysql($request->time);

                $class_lesson->save();

                return $this->respondSuccessWithStatus([
                    'class_lesson' => $class_lesson
                ]);
            } else {
                return $this->respondErrorWithStatus("Buổi này không tồn tại");
            }
        }
        return $this->respondErrorWithStatus("Thiếu class_lesson_id");
    }

    public function staffs()
    {
        $staffs = $this->userRepository->staffs();
        return $this->respondSuccessWithStatus([
            'staffs' => $staffs
        ]);
    }

    public function change_teaching_assistant(Request $request)
    {
        if ($request->id) {
            $teaching_lesson = TeachingLesson::where('class_lesson_id', $request->id)->first();

            if ($teaching_lesson) {
                $teaching_lesson_change = new TeachingLessonChange();
                $teaching_lesson_change->class_lesson_id = $request->id;
                $teaching_lesson_change->role = 2;
                $teaching_lesson_change->old_user_id = $teaching_lesson->teaching_assistant_id;
                $teaching_lesson_change->new_user_id = $request->staff_id;
                $teaching_lesson_change->note = $request->note;
                $teaching_lesson_change->actor_id = $this->user->id;

                $teaching_lesson_change->save();

                $teaching_lesson->teaching_assistant_id = $request->staff_id;
                $teaching_lesson->save();

                return $this->respondSuccessWithStatus([
                    'class_lesson' => [
                        'id' => $teaching_lesson->class_lesson_id,
                        'staff' => $this->userRepository->staff($teaching_lesson->teaching_assistant)
                    ]
                ]);
            } else {
                return $this->respondErrorWithStatus("Buổi này không tồn tại");
            }
        }
        return $this->respondErrorWithStatus("Thiếu class_lesson_id");
    }

    public function change_teacher(Request $request)
    {
        if ($request->id) {
            $teaching_lesson = TeachingLesson::where('class_lesson_id', $request->id)->first();

            if ($teaching_lesson) {
                $teaching_lesson_change = new TeachingLessonChange();
                $teaching_lesson_change->class_lesson_id = $request->id;
                $teaching_lesson_change->role = 1;
                $teaching_lesson_change->old_user_id = $teaching_lesson->teacher_id;
                $teaching_lesson_change->new_user_id = $request->staff_id;
                $teaching_lesson_change->note = $request->note;
                $teaching_lesson_change->actor_id = $this->user->id;

                $teaching_lesson_change->save();

                $teaching_lesson->teacher_id = $request->staff_id;
                $teaching_lesson->save();

                return $this->respondSuccessWithStatus([
                    'class_lesson' => [
                        'id' => $teaching_lesson->class_lesson_id,
                        'staff' => $this->userRepository->staff($teaching_lesson->teacher)
                    ]
                ]);
            } else {
                return $this->respondErrorWithStatus("Buổi này không tồn tại");
            }
        }
        return $this->respondErrorWithStatus("Thiếu class_lesson_id");
    }
}
