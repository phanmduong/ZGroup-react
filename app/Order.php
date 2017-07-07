<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    public function good()
    {
        return $this->belongsTo('App\Good', 'good_id');
    }

    public function staff()
    {
        return $this->belongsTo('App\User', 'staff_id');
    }
}
