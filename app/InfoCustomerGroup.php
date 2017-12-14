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

    public function transfrom()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "color" => $this->color,
            "customers" => $this->customers->map(function ($customer) {
                return $customer->transfromCustomer();
            }),
        ];
    }
}
