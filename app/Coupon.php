<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
    //
    protected $table = 'coupons';

    use SoftDeletes;

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
            'activate' => $this->activate,
            'cover_url' => $this->cover_url
        ];
        if ($this->used_for == 'order')
            $data['order_value'] = $this->order_value;
        if ($this->used_for == 'good')
            $data['good'] = [
                'id' => $this->good ? $this->good->id : null,
                'name' => $this->good ? $this->good->name : null,
            ];
        if ($this->used_for == 'customer')
            $data['customer'] = [
                'id' => $this->user ? $this->user->id : null,
                'name' => $this->user ? $this->user->name : null
            ];
        if ($this->used_for == 'category')
            $data['category'] = [
                'id' => $this->goodCategory ? $this->goodCategory->id : null,
                'name' => $this->goodCategory ? $this->goodCategory->name : null
            ];
        if ($this->used_for == 'customer-group')
            $data['customer_group'] = [
                'id' => $this->customerGroup ? $this->customerGroup->id : null,
                'name' => $this->customerGroup ? $this->customerGroup->name : null
            ];
        return $data;
    }
}
