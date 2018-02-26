<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HistoryDebt extends Model
{
    //
    protected $table = 'history_debts';
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }

    public function transform(){
        return [
            "id" => $this->id,
            "company" => [
                "id" => $this->company->id,
                "name" => $this->company->name,
            ],
            "value" => $this->value,
            "total_value" => $this->total_value,
            "date" => $this->date,
            "type" => $this->type,
        ];
    }
}
