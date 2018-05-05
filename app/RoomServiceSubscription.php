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

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'price' => $this->price,
            'description' => $this->description,
            'subscription_kind_name' => $this->subscription_kind->name,
            'hours' => $this->subscription_kind->hours,
            'user_pack_name' => $this->user_pack->name,
            'extra_time' => $this->extra_time,
            'booking_discount' => $this->booking_discount,
        ];
        if ($this->user_pack)
            $data['user_pack'] = $this->user_pack->getData();
        return $data;
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'price' => $this->price,
            'description' => $this->description,
            'extra_time' => $this->extra_time,
            'booking_discount' => $this->booking_discount,
            'subcription_kind' => [
                'id' => $this->subscription_kind->id,
                'name' => $this->subscription_kind->name,
                'hours' => $this->subscription_kind->hours,
            ],
        ];
    }
}
