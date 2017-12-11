<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/12/17
 * Time: 21:28
 */

namespace App\Repositories;


class RoomRepository
{
    public function rooms($rooms)
    {
        if ($rooms) {
            return $rooms->map(function ($room) {
                return $this->room($room);
            });
        }
    }

    public function room($room)
    {
        if ($room)
            return [
                'id' => $room->id,
                'name' => $room->name,
                'base' => $room->base()->withTrashed()->get()->name,
                'address' => $room->base()->withTrashed()->get()->address,
                'base_id' => $room->base()->withTrashed()->get()->id
            ];
    }
}