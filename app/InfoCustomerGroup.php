<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InfoCustomerGroup extends Model
{
    //
    use SoftDeletes;
    protected $table = 'info_customer_groups';

    public function customers()
    {
        return $this->belongsToMany(User::class, 'customer_groups', 'customer_group_id', 'customer_id');
    }
    public function coupons(){
        return $this->hasMany(Coupon::class,'customer_group_id');
    }
}
