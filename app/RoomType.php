<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RoomType extends Model
{
    //
    protected $table = 'room_types';

    use SoftDeletes;

    public function rooms()
    {
        return $this->hasMany(Room::class, 'room_type_id');
    }

    public function getData() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'type_name' => $this->type_name,
            'price' => $this->price,
            'member_price' => $this->member_price,
        ];
    }
}
