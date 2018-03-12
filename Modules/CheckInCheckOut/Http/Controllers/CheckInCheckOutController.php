<?php

namespace Modules\CheckInCheckOut\Http\Controllers;

use App\Base;
use App\ClassLesson;
use App\Colorme\Transformers\ShiftTransformer;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Repositories\NotificationRepository;
use App\Repositories\UserRepository;
use App\Shift;
use App\TeachingLesson;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Repositories\CheckInCheckOutRepository;

class CheckInCheckOutController extends ManageApiController
{

    protected $checkInCheckOutRepository;
    protected $notificationRepository;
    protected $shiftTransformer;
    protected $userRepository;

    public function __construct(
        NotificationRepository $notificationRepository,
        CheckInCheckOutRepository $checkInCheckOutRepository, ShiftTransformer $shiftTransformer, UserRepository $userRepository)
    {
        parent::__construct();
        $this->notificationRepository = $notificationRepository;
        $this->checkInCheckOutRepository = $checkInCheckOutRepository;
        $this->shiftTransformer = $shiftTransformer;
        $this->userRepository = $userRepository;
    }

    public function checkDevice(Request $request)
    {
        $device_id = $request->device_id;
        $os = $request->device_os;
        $device_name = $request->device_name;
        $message = "";
        if (is_null($device_id)) {
            $message .= "Bạn cần truyền lên device_id\n";
        }
        if (is_null($os)) {
            $message .= "Bạn cần truyền lên device_os\n";
        }
        if (is_null($device_name)) {
            $message .= "Bạn cần truyền lên device_name\n";
        }
        if ($message !== "") {
            return $this->responseBadRequest($message);
        }
        $user_id = $this->user->id;
        $check = $this->checkInCheckOutRepository->checkDevice($device_name, $os, $device_id, $user_id);
        if ($check === 0) {
            return $this->respondSuccessWithStatus(["message" => "OK"]);
        } else {
            $user = User::find($check);
            return $this->respondErrorWithStatus([
                "device_user" => [
                    'name' => $user->name,
                    'id' => $user->id
                ]
            ]);
        }

    }

    /**
     * Đo khoảng cách từ điểm A(long1, la1) và điểm B(long2, la2) xem có lớn hơn allowdistance(khoảng cách cho phép) không.
     * @return Response (True/False)
     */
    public function getDistance(Request $request)
    {
        $long = $request->long;
        $lat = $request->lat;
        $base_id = $request->base_id;
        $long = (double)$long;
        $lat = (double)$lat;
        $base = Base::find($base_id);

        $distance = haversineGreatCircleDistance($lat, $long, $base->latitude, $base->longtitude);

        if ($distance < $base->distance_allow) {
            $inRange = true;
        } else {
            $inRange = false;
        }
        return $this->respondSuccessWithStatus([
            "in_allow_range" => $inRange,
            "distance" => $distance
        ]);
    }

    public function history()
    {
        $checkInCheckouts = $this->user->checkInCheckOuts()->orderBy("created_at", "desc")->paginate(20);
        $items = $checkInCheckouts->map(function ($item) {
            $data = [
                "id" => $item->id,
                "status" => $item->status,
                "message" => $item->message
            ];
            if ($item->wifi) {
                $data["wifi"] = $item->wifi->name;
            }
            if ($item->base) {
                $data["base"] = $item->base->name;
            }
            if ($item->teacherTeachingLesson) {
                $class = $item->teacherTeachingLesson->classLesson->studyClass;
                $data["class"] = [
                    "icon_url" => $class->course->icon_url,
                    "name" => $class->name,
                    "role" => "Giảng viên"
                ];
            }
            if ($item->taTeachingLesson) {
                $class = $item->taTeachingLesson->classLesson->studyClass;
                $data["class"] = [
                    "icon_url" => $class->course->icon_url,
                    "name" => $class->name,
                    "role" => "Trợ giảng"
                ];
            }
            if ($item->shift) {
                $shiftSession = $item->shift->shift_session;
                $data["shift"] = [
                    "name" => $shiftSession->name,
                    "start_time" => $shiftSession->start_time,
                    "end_time" => $shiftSession->end_time,
                    "role" => "Nhân viên Sales"
                ];
            }
            return $data;
        });
        return $this->respondWithPagination($checkInCheckouts, ["data" => $items]);
    }

    private function sendCheckInCheckOutNotification($checkInCheckOut)
    {
        if ($checkInCheckOut->shift_id != null && $checkInCheckOut->shift_id > 0) {
            if ($checkInCheckOut->kind == 1) {
//                $this->notificationRepository->sendConfirm();
            }

        }
    }


    public function checkIn(Request $request)
    {
        $long = $request->long;
        $lat = $request->lat;
        $device_id = $request->device_id;
        $mac = $request->mac;
        $wifiName = $request->wifi_name;

        $message = "";
        if (is_null($long)) {
            $message .= "Bạn cần truyền lên long\n";
        }
        if (is_null($lat)) {
            $message .= "Bạn cần truyền lên lat\n";
        }
        if (is_null($device_id)) {
            $message .= "Bạn cần truyền lên device_id\n";
        }
        if (is_null($mac)) {
            $message .= "Bạn cần truyền lên mac\n";
        }

        if (is_null($wifiName)) {
            $message .= "Bạn cần truyền lên wifi_name\n";
        }

        if ($message !== "") {
            return $this->responseBadRequest($message);
        }

        $checkIn = $this->checkInCheckOutRepository->addCheckInCheckOut(1, $long, $lat, $this->user->id, $device_id, $mac, $wifiName);

        if ($checkIn->status === 1) {

//            $this->notificationRepository->sendConfirmCheckInTeachNotification();
            return $this->respondSuccessWithStatus([
                "check_in" => [
                    'time' => format_time(strtotime($checkIn->created_at)),
                    'base' => $checkIn->base ? $checkIn->base->name : "",
                ],
                "message" => $checkIn->message
            ]);

        }
        if ($checkIn->status === 6) {

//            $this->notificationRepository->sendConfirmCheckInTeachNotification();
            return $this->respondSuccessWithStatus([
                "check_in" => [
                    'time' => format_time(strtotime($checkIn->created_at)),
                    'base' => $checkIn->base ? $checkIn->base->name : "",
                ],
                "message" => $checkIn->message
            ]);

        }
        if ($checkIn->status === 5) {
            return $this->respondErrorWithData([
                "check_in" => [
                    'time' => format_time(strtotime($checkIn->created_at)),
                    'base' => $checkIn->base ? $checkIn->base->name : ""
                ],
                "message" => $checkIn->message
            ]);

        }
        if ($checkIn->status === 2) {
            return $this->respondErrorWithData([
                    'message' => "Mạng Wifi không hợp lệ",
                    "check_in" => [
                        'time' => format_time(strtotime($checkIn->created_at)),
                        'base' => $checkIn->base ? $checkIn->base->name : "",
                    ],
                ]
            );
        }
        if ($checkIn->status === 3) {
            return $this->respondErrorWithData([
                    'message' => "Khoảng cách quá xa so với cơ sở gần nhất (long: " . $long . ", lat: " . $lat . ",distance: " . $checkIn->distance . ")",
                    "check_in" => [
                        'time' => format_time(strtotime($checkIn->created_at)),
                        'base' => "Bạn ở quá xa"
                    ],
                ]
            );
        }
        if ($checkIn->status === 4) {
            return $this->respondErrorWithData([
                    'message' => $checkIn->message,
                    "check_in" => [
                        'time' => format_time(strtotime($checkIn->created_at)),
                        'base' => $checkIn->base ? $checkIn->base->name : ""
                    ],
                ]
            );
        }
    }

    public function checkOut(Request $request)
    {
        $long = $request->long;
        $lat = $request->lat;
        $device_id = $request->device_id;
        $mac = $request->mac;
        $wifiName = $request->wifi_name;

        $message = "";
        if (is_null($long)) {
            $message .= "Bạn cần truyền lên long\n";
        }
        if (is_null($lat)) {
            $message .= "Bạn cần truyền lên lat\n";
        }
        if (is_null($device_id)) {
            $message .= "Bạn cần truyền lên device_id\n";
        }
        if (is_null($mac)) {
            $message .= "Bạn cần truyền lên mac\n";
        }
        if (is_null($mac)) {
            $message .= "Bạn cần truyền lên wifi_name\n";
        }
        if ($message !== "") {
            return $this->responseBadRequest($message);
        }
        $checkOut = $this->checkInCheckOutRepository->addCheckInCheckOut(2, $long, $lat, $this->user->id, $device_id, $mac, $wifiName);

        if ($checkOut->status === 1) {
            return $this->respondSuccessWithStatus([
                "check_in" => [
                    'time' => format_time(strtotime($checkOut->created_at)),
                    'base' => $checkOut->base ? $checkOut->base->name : "",

                ],
                "message" => $checkOut->message
            ]);
        }
        if ($checkOut->status === 6) {

//            $this->notificationRepository->sendConfirmCheckInTeachNotification();
            return $this->respondSuccessWithStatus([
                "check_in" => [
                    'time' => format_time(strtotime($checkOut->created_at)),
                    'base' => $checkOut->base ? $checkOut->base->name : "",
                ],
                "message" => $checkOut->message
            ]);

        }
        if ($checkOut->status === 5) {
            return $this->respondErrorWithData([
                "check_in" => [
                    'time' => format_time(strtotime($checkOut->created_at)),
                    'base' => $checkOut->base ? $checkOut->base->name : "",
                ],
                "message" => $checkOut->message
            ]);

        }
        if ($checkOut->status === 4) {
            return $this->respondErrorWithData([
                    'message' => $checkOut->message,
                    "check_in" => [
                        'base' => $checkOut->base ? $checkOut->base->name : "",
                        'time' => format_time(strtotime($checkOut->created_at)),
                    ],
                ]
            );
        }
        if ($checkOut->status === 2) {
            return $this->respondErrorWithData([
                    'message' => "Mạng Wifi không hợp lệ",
                    "check_in" => [
                        'base' => $checkOut->base ? $checkOut->base->name : "",
                        'time' => format_time(strtotime($checkOut->created_at))
                    ],
                ]
            );
        }
        if ($checkOut->status === 3) {
            return $this->respondErrorWithData([
                    'message' => "Khoảng cách quá xa so với cơ sở gần nhất (long: " . $long . ", lat: " . $lat . ",distance: " . $checkOut->distance . ")",
                    "check_in" => [
                        'time' => format_time(strtotime($checkOut->created_at)),
                        'base' => "Bạn ở quá xa"
                    ],
                ]
            );
        }
    }

    public function statisticAttendanceStaffs(Request $request)
    {
        $gen_id = $request->gen_id;

        if ($gen_id && $gen_id != 0) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }

        $startTime = $request->start_time;
        $endTime = $request->end_time;
        $teaching_lessons = TeachingLesson::join('class_lesson', 'class_lesson.id', '=', 'teaching_lessons.class_lesson_id')
            ->join('classes', 'classes.id', '=', 'class_lesson.class_id')->join('lessons', 'lessons.id', '=', 'class_lesson.lesson_id')
            ->join('courses', 'courses.id', '=', 'classes.course_id')
            ->select('teaching_lessons.*', 'classes.name as class_name', 'classes.name as class_name', 'classes.gen_id', 'classes.base_id', 'class_lesson.time',
                'class_lesson.start_time', 'class_lesson.end_time', 'lessons.order', 'courses.icon_url as course_icon_url'
            )->whereNull('classes.deleted_at');


        if ($startTime && $endTime) {
            $shifts = Shift::whereBetween('date', array($startTime, $endTime))->whereNotNull('user_id')->where('user_id', '>', 0);
            $teaching_lessons = $teaching_lessons->whereBetween('time', array($startTime, $endTime));
        } else {
            $shifts = $current_gen->shifts()->whereNotNull('user_id')->where('user_id', '>', 0);
            $teaching_lessons = $teaching_lessons->where('gen_id', $current_gen->id);
        }

        if ($request->base_id && $request->base_id != 0) {
            $shifts = $shifts->where('base_id', $request->base_id);
            $teaching_lessons = $teaching_lessons->where('base_id', $request->base_id);
        }

        $teaching_lessons = $teaching_lessons->where(function ($query) {
            $query->whereNotNull('teaching_lessons.class_position_id')
                ->orWhere('teaching_lessons.teacher_id', '>', 0)
                ->orWhere('teaching_lessons.teaching_assistant_id', '>', 0);
        });

        $teachers = $teaching_lessons->get()->map(function ($teacher_lesson) {

            $data = [
                'class_name' => $teacher_lesson->class_name,
                'course_avatar_url' => generate_protocol_url($teacher_lesson->course_icon_url),
                'time' => date_shift(strtotime($teacher_lesson->time)),
                'start_time' => format_time_shift(strtotime($teacher_lesson->start_time)),
                'end_time' => format_time_shift(strtotime($teacher_lesson->end_time)),
                'order' => $teacher_lesson->order,
            ];
            if ($teacher_lesson->teacher) {
                $data['teacher'] = $this->userRepository->staff($teacher_lesson->teacher);
                if ($teacher_lesson->teacher_check_in) {
                    $data['teacher_check_in'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->teacher_check_in);
                }
                if ($teacher_lesson->teacher_check_out) {
                    $data['teacher_check_out'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->teacher_check_out);
                }
            }
            if ($teacher_lesson->teaching_assistant) {
                $data['teaching_assistant'] = $this->userRepository->staff($teacher_lesson->teaching_assistant);
                if ($teacher_lesson->ta_check_in) {
                    $data['ta_check_in'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->ta_check_in);
                }
                if ($teacher_lesson->ta_check_out) {
                    $data['ta_check_out'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->ta_check_out);
                }
            }

            if ($teacher_lesson->class_position) {
                if ($teacher_lesson->class_position->position_id == 1) {
                    if ($teacher_lesson->staff) {
                        $data['teacher'] = $this->userRepository->staff($teacher_lesson->staff);
                        if ($teacher_lesson->teacher_check_in) {
                            $data['teacher_check_in'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->check_in);
                        }
                        if ($teacher_lesson->teacher_check_out) {
                            $data['teacher_check_out'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->check_out);
                        }
                    }
                }
                if ($teacher_lesson->class_position->position_id == 2) {
                    if ($teacher_lesson->staff) {
                        $data['teaching_assistant'] = $this->userRepository->staff($teacher_lesson->staff);
                        if ($teacher_lesson->ta_check_in) {
                            $data['ta_check_in'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->check_in);
                        }
                        if ($teacher_lesson->ta_check_out) {
                            $data['ta_check_out'] = $this->checkInCheckOutRepository->getCheckInCheckOut($teacher_lesson->check_out);
                        }
                    }
                }
            }


            return $data;
        });

        $shifts = $shifts->join('users', 'users.id', '=', 'shifts.user_id')
            ->join('shift_sessions', 'shift_sessions.id', '=', 'shifts.shift_session_id')
            ->join('bases', 'bases.id', '=', 'shifts.base_id')
            ->join('gens', 'gens.id', '=', 'shifts.gen_id')
            ->select('shifts.*', 'shift_sessions.*', 'users.name as user_name', 'users.color as user_color', 'users.avatar_url as user_avatar_url',
                'shift_sessions.name as shift_session_name', 'bases.name as base_name', 'gens.name as gen_name', 'bases.address as base_address'
            );

        $shifts = $shifts->get()->map(function ($shift) {
            $data = [
                'user' => [
                    'id' => $shift->user_id,
                    'name' => $shift->user_name,
                    'color' => $shift->user_color,
                    'avatar_url' => $shift->user_avatar_url ? generate_protocol_url($shift->user_avatar_url) : url('img/user.png'),
                ],
                'name' => $shift->shift_session_name,
                'id' => $shift->id,
                'date' => date_shift(strtotime($shift->date)),
                'week' => $shift->week,
                'gen' => ['name' => $shift->gen_name],
                'base' => ['name' => $shift->base_name, 'address' => $shift->base_address],
                'start_time' => format_time_shift(strtotime($shift->start_time)),
                'end_time' => format_time_shift(strtotime($shift->end_time))
            ];
            if ($shift->check_in) {
                $data['check_in'] = $this->checkInCheckOutRepository->getCheckInCheckOut($shift->check_in);
            }
            if ($shift->check_out) {
                $data['check_out'] = $this->checkInCheckOutRepository->getCheckInCheckOut($shift->check_out);
            }
            return $data;
        });

        $data = [];

        $data['sales_marketing'] = $shifts;
        $data['teachers'] = $teachers;

        return $this->respondSuccessWithStatus($data);
    }


}
