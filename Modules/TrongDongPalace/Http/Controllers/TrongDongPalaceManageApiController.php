<?php

namespace Modules\TrongDongPalace\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Room;
use App\RoomServiceRegisterRoom;
use App\RoomType;
use Illuminate\Http\Request;


class TrongDongPalaceManageApiController extends ManageApiController
{
    public function dashboard(Request $request)
    {
        if ($request->room_id != null && $request->room_id > 0) {
            $rooms = Room::where('id', $request->room_id);
        } else {
            $rooms = Room::query();

            if ($request->base_id != null && $request->base_id > 0) {
                $rooms = Room::where('base_id', $request->base_id);

            } else if ($this->user->base_id != null && $this->user->base_id) {
                $rooms = Room::where('base_id', $this->user->base_id);
            }

            if ($request->room_type_id != null && $request->room_type_id > 0) {
                $rooms = $rooms->where('room_type_id', $request->room_type_id);
            }

        }


        $rooms = $rooms->get();
        $rooms = $rooms->map(function ($room) {
            $data = [
                'id' => $room->id,
                'name' => $room->name,
                'seats_count' => $room->seats_count,
                'type' => $room->roomType,
                'base' => $room->base,
            ];


            $registerRooms = $room->room_service_register_room()->get();
            $data['register_rooms'] = $registerRooms->map(function ($room) {
                return [
                    'start_time' => format_time_to_mysql(strtotime($room->start_time)),
                    'end_time' => format_time_to_mysql(strtotime($room->end_time)),
                ];
            });

            return $data;
        });

        return $this->respondSuccessWithStatus([
            'rooms' => $rooms
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
