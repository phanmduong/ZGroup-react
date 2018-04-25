<?php

namespace Modules\TrongDongPalace\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Room;
use App\RoomServiceRegisterRoom;
use App\RoomServiceRegister;
use App\RoomType;
use Illuminate\Http\Request;


class TrongDongPalaceManageApiController extends ManageApiController
{
    public function dashboard(Request $request)
    {
        $rooms = Room::pluck('id')->toArray();
        $registerRooms = RoomServiceRegisterRoom::whereIn('room_id', $rooms)->get();
        $registerRooms = $registerRooms->map(function ($room) {
            return [
                'start_time' => format_time_to_mysql(strtotime($room->start_time)),
                'end_time' => format_time_to_mysql(strtotime($room->end_time)),
            ];
        });

        return $this->respondSuccessWithStatus([
            'register_rooms' => $registerRooms
        ]);
    }

    public function rooms()
    {
        $rooms = Room::all();
        $rooms = $rooms->map(function ($room) {
            return [
                'name' => $room->name,
                'id' => $room->id,
                'base_id' => $room->base_id,
                'room_type_id' => $room->room_type_id,
            ];
        });
        return $this->respondSuccessWithStatus([
            'rooms' => $rooms
        ]);
    }

    public function roomTypes()
    {
        $roomTypes = RoomType::all();
        $roomTypes = $roomTypes->map(function ($roomType) {
            return [
                'name' => $roomType->name,
                'id' => $roomType->id,
            ];
        });

        return $this->respondSuccessWithStatus([
            'room_types' => $roomTypes
        ]);
    }
}
