<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    //
    protected $table = 'coupons';

    public function goods()
    {
        return $this->belongsToMany(Good::class, 'coupon_good', 'coupon_id','good_id');
    }
}
