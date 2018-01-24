<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegisterSeat extends Model
{
    public function register()
    {
        return $this->belongsTo(RoomServiceRegister::class, 'room_service_register_id');
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id');
    }
}
