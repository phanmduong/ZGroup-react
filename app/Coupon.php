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

    public function customerGroup()
    {
        return $this->belongsTo(InfoCustomerGroup::class, 'customer_group_id');
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'discount_type' => $this->discount_type,
            'discount_value' => $this->discount_value,
            'type' => $this->type,
            'used_for' => $this->used_for,
            'quantity' => $this->rate,
            'shared' => $this->shared,
            'start_time' => format_vn_date(strtotime($this->start_time)),
            'end_time' => format_vn_date(strtotime($this->end_time)),
            'active' => $this->active,
        ];
        return $data;
    }
}
