<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImportedGoods extends Model
{
    protected $table = "imported_goods";

    public function good()
    {
        return $this->belongsTo('App\Good', 'good_id');
    }

    public function warehouse()
    {
        return $this->belongsTo('App\Warehouse', 'warehouse_id');
    }

    public function staff()
    {
        return $this->belongsTo('App\User', 'staff_id');
    }
}
