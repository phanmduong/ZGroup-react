<?php

namespace Modules\StudyClass\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Repositories\CourseRepository;
use App\Repositories\UserRepository;
use App\StudyClass;
use App\Repositories\GenRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ManageClassApiController extends ManageApiController
{
    protected $genRepository;
    protected $courseRepository;
    protected $userRepository;

    public function __construct(GenRepository $genRepository, CourseRepository $courseRepository, UserRepository $userRepository)
    {
        parent::__construct();
        $this->genRepository = $genRepository;
        $this->courseRepository = $courseRepository;
        $this->userRepository = $userRepository;
    }

    public function get_classes(Request $request)
    {

        $search = $request->search;
        $limit = 40;
        if ($request->limit)
            $limit = $request->limit;

        if ($search) {
            $classes = StudyClass::where('name', 'like', '%' . $search . '%')
                ->orderBy('created_at', 'desc')->paginate($limit);
        } else {
            $classes = StudyClass::orderBy('created_at', 'desc')->paginate($limit);
        }

        $data = [
            "classes" => $classes->map(function ($class) {
                $data = [
                    'id' => $class->id,
                    'name' => $class->name,
                    'datestart' => format_date($class->datestart),
                    'study_time' => $class->study_time,
                    'status' => $class->status,
                    'activated' => $class->activated,
                ];

                $teacher = $this->userRepository->user($class->teach);
                $teacher_assistant = $this->userRepository->user($class->assist);
                $gen = $this->genRepository->gen($class->gen);
                $course = $this->courseRepository->course($class->course);

                if ($gen)
                    $data['gen'] = $gen;

                if ($course)
                    $data['course'] = $course;

                if ($teacher)
                    $data['teacher'] = $teacher;

                if ($teacher_assistant)
                    $data['teacher_assistant'] = $teacher_assistant;

                if ($this->user->role == 2){
                    $data['edit_status'] = true;
                }

                if ($class->registers()->count() <= 0){
                    $data['is_delete'] = true;
                } else {
                    $data['is_delete'] = false;
                }

                return $data;
            })
        ];

        return $this->respondWithPagination($classes, $data);
    }
}
