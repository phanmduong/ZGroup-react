<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $table = "warehouses";

    public function importedGoods()
    {
        return $this->hasMany('App\ImportedGoods', 'warehouse_id');
    }

    public function good()
    {
        return $this->belongsTo('App\Good', 'good_id');
    }

    public function goodWarehouses()
    {
        return $this->hasMany('App\GoodWarehouse', 'warehouse_id');
    }

    public function base()
    {
        return $this->belongsTo(Base::class, 'base_id');
    }

    public function Transform()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "address" => $this->location
        ];
    }
}