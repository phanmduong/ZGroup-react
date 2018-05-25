<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contracts extends Model
{
    //
    protected $table = 'contracts';

    public function companyA(){
        return $this->belongsTo(Company::class,'company_a_id');
    }
    
    public function companyB(){
        return $this->belongsTo(Company::class,'company_b_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'staff_id');
    }
    
    public function signer()
    { 
        return $this->belongsTo(User::class, 'sign_staff_id');
    }

    public function transform()
    {
        $field = $this->field;
        //$field = Field::find($this->field_id);
        return [
            "id" => $this->id,
            "contract_number" => $this->contract_number,
            "type" => $this->type,
            "value" => $this->value,
            "due_date" => $this->due_date,
            "status" => $this->status,
            "company_a" => $this->companyA->transform(),
            "company_b" => $this->companyB->transform(),
            "staff" => $this->user->getData(),
            "sign_staff" => $this->signer->getData(),
            'note' => $this->note,
            'created_at' => $this->created_at,
        ];
    }
}
