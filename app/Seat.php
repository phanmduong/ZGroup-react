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

    public function getData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'room' => $this->room ? $this->room->getData() : [],
            'type' => $this->type,
            "x" => $this->x,
            "y" => $this->y,
            "r" => $this->r,
            "color" => $this->color
        ];
    }
}
