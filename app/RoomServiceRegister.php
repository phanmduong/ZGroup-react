<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegister extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subscription()
    {
        return $this->belongsTo(RoomServiceSubscription::class, 'subscription_id');
    }
}
