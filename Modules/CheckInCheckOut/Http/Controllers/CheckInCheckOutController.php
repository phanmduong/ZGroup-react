<?php

namespace Modules\CheckInCheckOut\Http\Controllers;

use App\Base;
use App\Http\Controllers\ManageApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Repositories\CheckInCheckOutRepository;

class CheckInCheckOutController extends ManageApiController
{

    protected $checkInCheckOutRepository;

    public function __construct(CheckInCheckOutRepository $checkInCheckOutRepository)
    {
        parent::__construct();
        $this->checkInCheckOutRepository = $checkInCheckOutRepository;
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
            return $this->respondSuccessWithStatus([
                "check_in" => [
                    'time' => format_time(strtotime($checkIn->created_at)),
                    'base' => $checkIn->base ? $checkIn->base->name : "",
                ],
                "message" => $checkIn->message
            ]);

        }
        if ($checkIn->status === 5) {
            return $this->respondSuccessWithStatus([
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
                    'message' => "Khoảng cách quá xa so với cơ sở gần nhất",
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
        if ($checkOut->status === 5) {
            return $this->respondSuccessWithStatus([
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
                    'message' => "Khoảng cách quá xa so với cơ sở gần nhất",
                    "check_in" => [
                        'time' => format_time(strtotime($checkOut->created_at)),
                        'base' => "Bạn ở quá xa"
                    ],
                ]
            );
        }
    }


}
