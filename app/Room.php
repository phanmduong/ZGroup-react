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

    public function roomType()
    {
        return $this->belongsTo(RoomType::class, 'room_type_id');
    }

    public function getRoomDetail()
    {
        $data = $this->getData();
        $data['room_layout_url'] = $this->room_layout_url;
        $data['height'] = $this->height;
        $data['width'] = $this->width;
        $data['seats'] = $this->seats;
        return $data;
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'base' => $this->base->transform(),
            'seats_count' => $this->seats_count,
            'avatar_url' => $this->avatar_url,
            'images_url' => $this->images_url,
            'width' => $this->width,
            'height' => $this->height,
            'room_layout_url' => $this->room_layout_url,
        ];
        if ($this->roomType) {
            $data['room_type'] = $this->roomType->getData();
        }
        return $data;
    }

    public function room_service_register_room()
    {
        return $this->hasMany(RoomServiceRegisterRoom::class, 'room_id');
    }
}
