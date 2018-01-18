<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seats extends Model
{
    //
    protected $table = 'seats';

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
