<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PrintOrder extends Model
{
    //
    protected $table = "print_orders";

    public function good()
    {
        return $this->belongsTo(Good::class, "good_id");
    }

    public function company()
    {
        return $this->belongsTo(Company::class, "company_id");
    }

    public function staff()
    {
        return $this->belongsTo(User::class, "staff_id");
    }

    public function staffImport()
    {
        return $this->belongsTo(User::class, "import_staff_id");
    }
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "command_code" => $this->command_code,
            "staff" => [
                "id" => $this->staff->id,
                "name" => $this->staff->name,
                "avatar_url" => $this->staff->avatar_url,
            ],
            "import_staff" => $this->staffImport ? [
                "id" => $this->staffImport->id,
                "name" => $this->staffImport->name,
                "avatar_url" => $this->staffImport->avatar_url,
            ] : [],
            "status" => $this->status,
            "company" => $this->company ? [
                "id" => $this->company->id,
                "name" => $this->company->name,
            ] : [],
            "good" => $this->good ?
                $this->good->getData()
             : [],
            "warehouse" => $this->warehouse ? [
                "id" => $this->warehouse->id,
                "name" => $this->warehouse->name,
            ] : [],
            "quantity" => $this->quantity,
            "core1" => $this->core1,
            "core2" => $this->core2,
            "cover1" => $this->cover1,
            "cover2" => $this->cover2,
            "spare_part1" => $this->spare_part1,
            "spare_part2" => $this->spare_part2,
            "packing1" => $this->packing1,
            "packing2" => $this->packing2,
            "other" => $this->other,
            "price" => $this->price,
            "note" => $this->note,
            "order_date" => $this->order_date,
            "receive_date" => $this->receive_date,
            "import_quantity" => $this->import_quantity,
            "created_at" => $this->created_at,
        ];
    }
}
