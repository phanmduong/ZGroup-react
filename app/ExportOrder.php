<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExportOrder extends Model
{
    //
    protected $table = 'export_orders';

    public function good()
    {
        return $this->belongsTo(Good::class, "good_id");
    }

    public function company()
    {
        return $this->belongsTo(Company::class, "company_id");
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "good" => $this->good ?
                $this->good->getData(): [],
            "warehouse" => $this->warehouse ? [
                "id" => $this->warehouse->id,
                "name" => $this->warehouse->name,
            ] : [],
            "price" => $this->price,
            "quantity" => $this->quantity,
            "discount" => $this->discount,
            "total_price" => $this->total_price,
            "export_quantity" => $this->export_quantity,
            "created_at" => $this->created_at,

        ];
    }
}
