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

    public function seats()
    {
        return $this->hasMany(Seat::class, 'room_id');
    }

    public function getData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'base' => $this->base->transform(),
            'seats_count' => $this->seats_count,
            'images_url' => $this->images_url,
            'avatar_url' => $this->avatar_url,
            'address' => $this->address,
        ];
    }
}
