<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceBenefit extends Model
{
    //
    public function roomServiceUserPacks(){

        return $this->belongsToMany(RoomServiceUserPack::class, 'room_service_user_pack_benefit','benefit_id','user_pack_id')->withPivot('value');
    }

}
