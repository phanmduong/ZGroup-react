<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemOrder extends Model
{
    //
    protected $table = "item_orders";

    public function exportOrder()
    {
        return $this->hasMany(ExportOrder::class, 'item_order_id');
    }

    public function staff()
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function staffImportOrExport()
    {
        return $this->belongsTo(User::class, 'import_export_staff_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function importOrder()
    {
        return $this->hasMany(ImportItemOrder::class, 'item_order_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "company" => $this->company->transform(),
            "staff" => $this->staff ? [
                "id" => $this->staff->id,
                "name" => $this->staff->name,
                "avatar_url" => $this->staff->avatar_url,
            ] : [],
            "staff_import_or_export" => $this->staffImportOrExport ? [
                "id" => $this->staffImportOrExport->id,
                "name" => $this->staffImportOrExport->name,
                "avatar_url" => $this->staffImportOrExport->avatar_url,
            ] : [],
            "command_code" => $this->command_code,
            "status" => $this->status,
            "note" => $this->note,
            "date" => $this->date,
            "created_at" => $this->created_at,
            "goods" => $this->exportOrder->map(function ($good) {
                return $good->transform();
            })
        ];
    }

    public function importTransform()
    {
        $pp = $this->importOrder()->take($this->good_count)->get();
        return [
            "id" => $this->id,
            "company" => [
                "id" => $this->company->id,
                "name" => $this->company->name,
            ],
            "staff" => $this->staff ? [
                "id" => $this->staff->id,
                "name" => $this->staff->name,
                "avatar_url" => $this->staff->avatar_url,
            ] : [],
            "staff_import_or_export" => $this->staffImportOrExport ? [
                "id" => $this->staffImportOrExport->id,
                "name" => $this->staffImportOrExport->name,
                "avatar_url" => $this->staffImportOrExport->avatar_url,
            ] : [],
            "command_code" => $this->command_code,
            "status" => $this->status,
            "note" => $this->note,
            "date" => $this->date,
            "created_at" => $this->created_at,
            "goods" => $pp->map(function ($good) {
                return $good->transform();
            }),
            "good_count" => $this->good_count,
        ];
    }
}
