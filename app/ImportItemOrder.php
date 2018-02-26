<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImportItemOrder extends Model
{
    //
    protected $table = "import_item_orders";

    public function transform()
    {
        return [
            "id" => $this->id,
            "good" => [
                "id" => $this->good->id,
                "name" => $this->good->name,
                "code" => $this->good->code,
            ],
            "warehouse" => $this->warehouse ? [
                "id" => $this->warehouse->id,
                "name" => $this->warehouse->name,
            ] : [],
            "price" => $this->price,
            "quantity" => $this->quantity,
            "imported_quantity" => $this->imported_quantity,

        ];
    }
}
