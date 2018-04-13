<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ZHistoryGood extends Model
{
    //
    protected $table = 'zhistory_goods';
    public function itemOrder(){
        return $this->belongsTo(ItemOrder::class,'item_order_id');
    }
    public function good(){
        return $this->belongsTo(Good::class,'good_id');
    }
    public function warehouse(){
        return $this->belongsTo(Warehouse::class,'warehouse_id');
    }

    public function transform(){
        return[
            "id" => $this->id,
            "quantity" => $this->quantity,
            "good" => $this->good ? [
                "id" => $this->good->id,
                "name" => $this->good->name,
            ] : [],
            "order" => $this->itemOrder ? [
                "id" => $this->itemOrder->id,
                "type" => $this->itemOrder->type,
                "command_code" => $this->itemOrder->command_code,
                "staff" => [
                    "id" => $this->itemOrder->staffImportOrExport->id,
                    "name" => $this->itemOrder->staffImportOrExport->name,
                ],
                "created_at" => format_vn_short_datetime(strtotime($this->itemOrder->created_at))
            ] : null,
            "warehouse" => $this->warehouse ? [
                "id" => $this->warehouse->id,
                "name" => $this->warehouse->name,
            ] :null,
        ];
    }
}
