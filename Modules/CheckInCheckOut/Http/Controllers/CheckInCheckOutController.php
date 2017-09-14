<?php

namespace Modules\CheckInCheckOut\Http\Controllers;

use App\Base;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CheckInCheckOutController extends ManageApiController
{
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

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('checkincheckout::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('checkincheckout::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('checkincheckout::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
