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

    public function warehouse(){
        return $this->belongsTo(Warehouse::class,'warehouse_id');
    }
    public function transform(){
        return [
            "id" => $this->id,
            "good" => [
                "id" => $this->good->id,
                "name" => $this->good->name,
                "code" => $this->good->code,
            ],
            "warehouse" => [
                "id" => $this->warehouse->id,
                "name" => $this->warehouse->name,
            ],
            "company" => [
                "id" => $this->company->id,
                "name" => $this->company->name,
            ],
            "price" => $this->price,
            "quantity" => $this->quantity,
            "total_price" => $this->total_price,

        ];
    }
}
