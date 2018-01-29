<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceSubscriptionKind extends Model
{
    protected $table = 'room_service_subscription_kinds';

    public function subscriptions()
    {
        return $this->hasMany(RoomServiceSubscription::class, 'subscription_kind_id');
    }

    public function getData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'hours' => $this->hours
        ];
    }
}
