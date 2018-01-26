<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceUserPack extends Model
{
    public function subscriptions()
    {
        return $this->hasMany(RoomServiceSubscription::class, 'user_pack_id');
    }

    public function getData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar_url' => $this->avatar_url,
            'detail' => $this->detail,
        ];
    }
}
