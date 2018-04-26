<?php

namespace Modules\TrongDongPalace\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Room;
use App\RoomServiceRegister;
use App\RoomServiceRegisterRoom;
use App\RoomServiceRegister;
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
            $data['register_rooms'] = $registerRooms->map(function ($register_room) {
                return [
                    'id' => $register_room->id,
                    'register_id' => $register_room->register->id,
                    'start_time' => format_time_to_mysql(strtotime($register_room->start_time)),
                    'end_time' => format_time_to_mysql(strtotime($register_room->end_time)),
                    'user' => $register_room->register->user,
                    'status' => $register_room->register->status,
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

    public function changeTime(Request $request)
    {
        $register_room = RoomServiceRegisterRoom::find($request->id);

        if ($register_room == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        $register_room->start_time = $request->start_time;
        $register_room->end_time = $request->end_time;
        $register_room->save();

        return [
            'id' => $register_room->id,
            'register_id' => $register_room->register->id,
            'start_time' => format_time_to_mysql(strtotime($register_room->start_time)),
            'end_time' => format_time_to_mysql(strtotime($register_room->end_time)),
            'user' => $register_room->register->user,
            'status' => $register_room->register->status,
        ];
    }

    public function changeStatus(Request $request)
    {
        $register = RoomServiceRegister::find($request->id);

        if ($register == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        $register->status = $request->status;

        $register->save();

        return $this->respondSuccessWithStatus([
            'register' => [
                'id' => $register->id,
                'status' => $register->status,
            ]
        ]);
    }
}
