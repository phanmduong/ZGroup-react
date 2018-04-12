<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegisterSeat extends Model
{
    protected $table = 'room_service_register_seat';

    public function register()
    {
        return $this->belongsTo(RoomServiceRegister::class, 'room_service_register_id');
    }
    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function transform()
    {
        $data = [
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'seat' => $this->seat->getData(),
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'staff' => $this->user ? $this->user->getData() :"",
        ];
        return $data;
    }
}
