<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegisterRoom extends Model
{
    public function register()
    {
        return $this->belongsTo(RoomServiceRegister::class, 'room_service_register_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
