<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceSubscriptionKind extends Model
{
    public function subscriptions(){
        return $this->hasMany(RoomServiceSubscription::class, 'subscription_kind_id');
    }
}
