<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShipInfor extends Model
{
    protected $table = 'ship_infor';

    public function order() {
        return $this->hasOne(Order::class, 'ship_infor_id');
    }
}
