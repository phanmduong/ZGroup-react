<?php

namespace Modules\Base\Http\Controllers;

use App\Base;
use App\District;
use App\Http\Controllers\ManageApiController;
use App\Province;
use App\Room;
use App\Seat;
use App\Seats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageBaseApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function assignBaseInfo(&$base, $request)
    {
        $base->name = $request->name;
        $base->center = $request->center ? $request->center : 0;
        $base->longtitude = $request->longtitude;
        $base->latitude = $request->latitude;
        $base->avatar_url = $request->avatar_url;
        $base->district_id = $request->district_id;
        $base->display_status = $request->display_status;
        $base->images_url = $request->images_url;
        $base->description = $request->description;
        $base->address = $request->address;
        $base->save();
    }

    public function assignRoomInfo(&$room, $baseId, $request)
    {
        $room->name = $request->name;
        $room->base_id = $baseId;
        $room->type = $request->type;
        $room->seats_count = $request->seats_count;
        $room->images_url = $request->images_url;
        $room->avatar_url = $request->avatar_url;
        $room->address = $request->address;
        $room->save();
    }


    public function getAllProvinces()
    {
        $provinces = Province::all();
        $provinces = $provinces->map(function ($province) {
            $data = $province->transform();
            $data['districts'] = $province->districts->map(function ($district) {
                return $district->transform();
            });
            return $data;
        });

        return $this->respondSuccessWithStatus([
            'provinces' => $provinces
        ]);
    }


    public function getBases(Request $request)
    {
        $query = trim($request->q);

        $limit = 6;

        if ($query) {
            $bases = Base::where("name", "like", "%$query%")
                ->orWhere("address", "like", "%$query%")
                ->orderBy('created_at')->paginate($limit);
        } else {
            $bases = Base::orderBy('created_at')->paginate($limit);
        }

        $data = [
            "bases" => $bases->map(function ($base) {
                $data = [
                    'id' => $base->id,
                    'name' => $base->name,
                    'address' => $base->address,
                    'display_status' => $base->display_status,
                    'longitude' => $base->longtitude,
                    'latitude' => $base->latitude,
                    'created_at' => format_time_main($base->created_at),
                    'updated_at' => format_time_main($base->updated_at),
                    'center' => $base->center,
                    'images_url' => $base->images_url,
                    'avatar_url' => config('app.protocol') . trim_url($base->avatar_url),
                ];


                if ($base->district) {
                    $data['district'] = $base->district->transform();
                    $data['province'] = $base->district->province->transform();
                }

                return $data;
            }),

        ];
        return $this->respondWithPagination($bases, $data);
    }

    public function getBase($baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        $data = [
            'id' => $base->id,
            'name' => $base->name,
            'address' => $base->address,
            'display_status' => $base->display_status,
            'longitude' => $base->longtitude,
            'latitude' => $base->latitude,
            'created_at' => format_time_main($base->created_at),
            'updated_at' => format_time_main($base->updated_at),
            'center' => $base->center,
            'images_url' => $base->images_url,
            'avatar_url' => config('app.protocol') . trim_url($base->avatar_url),
        ];


        if ($base->district) {
            $data['district'] = $base->district->transform();
            $data['province'] = $base->district->province->transform();
            $data['province_id'] = $base->district->province->provinceid;
            $data['district_id'] = $base->district->districtid;
        }

        return $this->respondSuccessWithStatus([
            'base' => $data
        ]);
    }

    public function createBase(Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên cơ sở'
            ]);
        $base = new Base;
        $this->assignBaseInfo($base, $request);

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editBase($baseId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên cơ sở'
            ]);
        $base = Base::find($baseId);
        if ($base == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại cơ sở'
            ]);
        $this->assignBaseInfo($base, $request);

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function createRoom($baseId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên phòng'
            ]);
        $room = new Room;
        $this->assignRoomInfo($room, $baseId, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editRoom($baseId, $roomId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên phòng'
            ]);
        $room = Room::find($roomId);
        if ($room == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại phòng'
            ]);
        $this->assignRoomInfo($room, $baseId, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function createSeat($roomId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên'
            ]);
        $seat = new Seat;
        $seat->name = $request->name;
        $seat->type = $request->type;
        $seat->room_id = $roomId;
        $seat->save();
        $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editSeat($roomId, $seatId, Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên'
            ]);
        $seat = Seat::find($seatId);
        if ($seat == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại chỗ ngồi'
            ]);
        $seat->name = $request->name;
        $seat->type = $request->type;
        $seat->room_id = $roomId;
        $seat->save();
        $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}
