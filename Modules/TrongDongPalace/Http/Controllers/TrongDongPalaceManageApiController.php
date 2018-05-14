<?php

namespace Modules\TrongDongPalace\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Room;
use App\RoomServiceRegister;
use App\RoomServiceRegisterRoom;
use App\RoomType;
use App\User;
use Illuminate\Http\Request;


class TrongDongPalaceManageApiController extends ManageApiController
{
    public function allRegisterRoom(Request $request){
        $limit = $request->limit ? $request->limit : 20;
        $datas = RoomServiceRegister::query();
               
            
            $datas = $datas->orderBy('created_at', 'desc')->paginate($limit);
            return $this->respondWithPagination($datas, [
                "data" => $datas->map(function ($data) {
                    return $data->getData();
                })
            ]);
         
            
        }

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
                    'campaign_id' => $register_room->register->campaign_id,
                    'note' => $register_room->register->note,
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

    public function createRegisterRoom(Request $request)
    {
        if ($request->name == null) {
            return $this->respondErrorWithStatus("Thiếu name");
        }
        if ($request->email == null) {
            return $this->respondErrorWithStatus("Thiếu email");
        }
        if ($request->phone == null) {
            return $this->respondErrorWithStatus("Thiếu phone");
        }
        if ($request->status == null) {
            return $this->respondErrorWithStatus("Thiếu status");
        }
        if ($request->base_id == null) {
            return $this->respondErrorWithStatus("Thiếu base_id");
        }
        if ($request->base_id == null) {
            return $this->respondErrorWithStatus("Thiếu room_id");
        }
        if ($request->start_time == null) {
            return $this->respondErrorWithStatus("Thiếu start_time");
        }
        if ($request->end_time == null) {
            return $this->respondErrorWithStatus("Thiếu end_time");
        }

        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = bcrypt($phone);
            $user->username = $request->email;
            $user->email = $request->email;
        }
        $user->rate = 5;
        $user->name = $request->name;
        $user->phone = $phone;
        $user->address = $request->address;
        $user->save();

        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->status = $request->status;
        $register->campaign_id = $request->campaign_id ? $request->campaign_id : 0;
        $register->saler_id = $this->user->id;
        $register->type = 'room';
        $register->base_id = $request->base_id;
        $register->note = $request->note;
        $register->save();

        $registerRoom = new RoomServiceRegisterRoom();
        $registerRoom->start_time = $request->start_time;
        $registerRoom->end_time = $request->end_time;
        $registerRoom->room_id = $request->room_id;
        $registerRoom->room_service_register_id = $register->id;
        $registerRoom->save();

        return $this->respondSuccessWithStatus([
            'register_room' => [
                'id' => $registerRoom->id,
                'register_id' => $register->id,
                'start_time' => format_time_to_mysql(strtotime($registerRoom->start_time)),
                'end_time' => format_time_to_mysql(strtotime($registerRoom->end_time)),
                'user' => $user,
                'status' => $register->status,
                'room_id' => $registerRoom->room_id,
                'note' => $register->note,
                'campaign_id' => $register->campaign_id,
            ]
        ]);
    }

    public function editRegisterRoom(Request $request)
    {
        if ($request->id == null) {
            return $this->respondErrorWithStatus("Thiếu id");
        }

        if ($request->name == null) {
            return $this->respondErrorWithStatus("Thiếu name");
        }
        if ($request->email == null) {
            return $this->respondErrorWithStatus("Thiếu email");
        }
        if ($request->phone == null) {
            return $this->respondErrorWithStatus("Thiếu phone");
        }
        if ($request->status == null) {
            return $this->respondErrorWithStatus("Thiếu status");
        }
        if ($request->base_id == null) {
            return $this->respondErrorWithStatus("Thiếu base_id");
        }
        if ($request->base_id == null) {
            return $this->respondErrorWithStatus("Thiếu room_id");
        }
        if ($request->start_time == null) {
            return $this->respondErrorWithStatus("Thiếu start_time");
        }
        if ($request->end_time == null) {
            return $this->respondErrorWithStatus("Thiếu end_time");
        }


        $registerRoom = RoomServiceRegisterRoom::find($request->id);
        $register = $registerRoom->register;


        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $user = $register->user;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->phone = $phone;
        $user->save();


        $register->status = $request->status;
        $register->campaign_id = $request->campaign_id ? $request->campaign_id : 0;
        $register->base_id = $request->base_id;
        $register->note = $request->note;
        $register->save();

        $registerRoom->start_time = $request->start_time;
        $registerRoom->end_time = $request->end_time;
        $registerRoom->room_id = $request->room_id;
        $registerRoom->save();

        return $this->respondSuccessWithStatus([
            'register_room' => [
                'id' => $registerRoom->id,
                'register_id' => $register->id,
                'start_time' => format_time_to_mysql(strtotime($registerRoom->start_time)),
                'end_time' => format_time_to_mysql(strtotime($registerRoom->end_time)),
                'user' => $user,
                'status' => $register->status,
                'room_id' => $registerRoom->room_id,
                'note' => $register->note,
                'campaign_id' => $register->campaign_id,
            ]
        ]);
    }
}
