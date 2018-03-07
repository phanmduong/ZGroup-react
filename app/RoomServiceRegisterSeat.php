<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegisterSeat extends Model
{
    protected $table = "room_service_register_seat";
    public function register()
    {
        return $this->belongsTo(RoomServiceRegister::class, 'room_service_register_id');
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id');
    }
}
