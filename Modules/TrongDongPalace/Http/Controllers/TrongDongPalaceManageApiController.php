<?php

namespace Modules\TrongDongPalace\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Room;
use App\RoomServiceRegisterRoom;
use Illuminate\Http\Request;


class TrongDongPalaceManageApi extends ManageApiController
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
}
