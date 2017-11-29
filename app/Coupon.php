<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    //
    protected $table = 'coupons';

    public function good()
    {
        return $this->belongsTo(Good::class, 'good_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function goodCategory()
    {
        return $this->belongsTo(GoodCategory::class, 'category_id');
    }
}
