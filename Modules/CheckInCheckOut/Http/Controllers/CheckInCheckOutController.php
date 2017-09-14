<?php

namespace Modules\CheckInCheckOut\Http\Controllers;

use App\Base;
use App\Http\Controllers\ManageApiController;
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
            "in_allow_range" => $inRange
        ]);
    }


    public function checkIn(Request $request)
    {
        $long = $request->long;
        $lat = $request->lat;
        $device_id = $request->device_id;
        $mac = $request->mac;

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
        if ($message !== "") {
            return $this->responseBadRequest($message);
        }
        $checkIn = $this->checkInCheckOutRepository->addCheckInCheckOut(1, $long, $lat, $this->user->id, $device_id, $mac);
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

    public function checkOut(Request $request)
    {
        $long = $request->long;
        $lat = $request->lat;
        $device_id = $request->device_id;
        $mac = $request->mac;

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
        if ($message !== "") {
            return $this->responseBadRequest($message);
        }
        $checkIn = $this->checkInCheckOutRepository->addCheckInCheckOut(2, $long, $lat, $this->user->id, $device_id, $mac);
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
