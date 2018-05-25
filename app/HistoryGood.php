<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HistoryGood extends Model
{
    //
    protected $table = 'history_goods';

    public function good()
    {
        return $this->belongsTo(Good::class, 'good_id');
    }

    public function importedGood()
    {
        return $this->belongsTo(ImportedGoods::class, 'imported_good_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class,'warehouse_id');
    }
}
