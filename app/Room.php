<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'rooms';

    public function base()
    {
        return $this->belongsTo('App\Base', 'base_id');
    }

    public function classes()
    {
        return $this->hasMany('App\StudyClass', 'room_id');
    }

    public function seats() {
        return $this->hasMany(Seats::class, 'room_id');
    }
}
