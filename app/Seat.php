<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    //
    protected $table = 'seats';

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
