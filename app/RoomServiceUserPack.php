<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceUserPack extends Model
{
    protected $table = 'room_service_user_packs';

    public function subscriptions()
    {
        return $this->hasMany(RoomServiceSubscription::class, 'user_pack_id');
    }

    public function getData()
    {
        $subscriptions = $this->subscriptions;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar_url' => $this->avatar_url,
            'detail' => $this->detail,
            'status' => $this->status,
            'subscriptions' => $subscriptions->map(function ($sub){
                return $sub->transform();
            }),
        ];
    }

    public function roomServiceBenefits(){

        return $this->belongsToMany(RoomServiceBenefit::class,'room_service_user_pack_benefit','user_pack_id','benefit_id')->withPivot('value');
    }
}
