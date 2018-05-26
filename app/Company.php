<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $table = 'companies';

    public function field(){
        return $this->belongsTo(Field::class,'field_id');
    }
    
    public function contract(){
        return $this->belongsTo(Contracts::class,'contract_id');
    }

    public function transform()
    {
        $field = $this->field;
        //$field = Field::find($this->field_id);
        return [
            "id" => $this->id,
            "name" => $this->name,
            "registered_business_address" => $this->registered_business_address,
            "office_address" => $this->office_address,
            "phone_company" => $this->phone_company,
            "tax_code" => $this->tax_code,
            "account_name" => $this->account_name,
            "account_number" => $this->account_number,
            "account_value" => $this->account_value,
            "bank_name" => $this->bank_name,
            "bank_branch" => $this->bank_branch,
            "field" => [
                "id" => $field->id,
                "name" => $field->name,
            ],
            "user_contact" => $this->user_contact,
            "user_contact_phone" =>$this->user_contact_phone,
            "user_contact1" => $this->user_contact1,
            "user_contact_phone1" =>$this->user_contact_phone1,
            "user_contact2" => $this->user_contact2,
            "type" => $this->type,
            "partner_code" =>$this->partner_code,
            "discount_comic" => $this->discount_comic,
            "discount_text" => $this->discount_text,
        ];
    }
}
