<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceSubscription extends Model
{
    public function user_pack()
    {
        return $this->belongsTo(RoomServiceUserPack::class, 'user_pack_id');
    }

    public function subscription_kind()
    {
        return $this->belongsTo(RoomServiceSubscriptionKind::class, 'subscription_kind_id');
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'price' => $this->price,
            'description' => $this->description,
            'subscription_kind_name' => $this->subscription_kind->name,
            'hours' => $this->subscription_kind->hours,
            'user_pack_name' => $this->user_pack->name,
        ];
    }
}
