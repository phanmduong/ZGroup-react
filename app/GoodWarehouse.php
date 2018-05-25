<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoodWarehouse extends Model
{
    protected $table = "good_warehouse";

    public function warehouse()
    {
        return $this->belongsTo('App\Warehouse', 'warehouse_id');
    }

    public function good()
    {
        return $this->belongsTo('App\Good', 'good_id');
    }
}
