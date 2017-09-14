<?php

namespace Modules\CheckInCheckOut\Http\Controllers;

use App\Base;
use App\Http\Controllers\ManageApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
                    'base' => $checkIn->base->name,

                ],
                "message" => "Check in thành công"
            ]);
        }
        if ($checkIn->status === 2) {
            return $this->respondErrorWithData([
                    'message' => "Mạng Wifi không hợp lệ",
                    "check_in" => [
                        'time' => format_time(strtotime($checkIn->created_at)),
                    ],
                ]
            );
        }
        if ($checkIn->status === 3) {
            return $this->respondErrorWithData([
                    'message' => "Khoảng cách quá xa so với cơ sở gần nhất",
                    "check_in" => [
                        'time' => format_time(strtotime($checkIn->created_at)),
                        'base' => "Bạn ở quá xab"
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
        $checkIn = $this->checkInCheckOutRepository->addCheckInCheckOut(2, $long, $lat, $this->user->id, $device_id, $mac, $wifiName);
        if ($checkIn->status === 1) {
            return $this->respondSuccessWithStatus(["message" => "Check in thành công"]);
        }
        if ($checkIn->status === 2) {
            return $this->respondErrorWithStatus("Mạng Wifi không hợp lệ");
        }
        if ($checkIn->status === 3) {
            return $this->respondErrorWithStatus("Khoảng cách quá xa so với cơ sở gần nhất");
        }

    }


}
