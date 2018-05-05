<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegisterRoom extends Model
{
    protected $table = 'room_service_register_room';

    public function register()
    {
        return $this->belongsTo(RoomServiceRegister::class, 'room_service_register_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function getData()
    {
        $data = [
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'room' => $this->room ? $this->room->getData() : [],
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'staff' => $this->user ? $this->user->getData() :"",
        ];
        return $data;
    }
}
