<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceUserPack extends Model
{
    public function subscriptions()
    {
        return $this->hasMany(RoomServiceSubscription::class, 'user_pack_id');
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
