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
    public function transform()
    {
        $field = $this->field;
        return [
            "id" => $this->id,
            "name" => $this->name,
            "registered_business_address" => $this->registered_business_address,
            "office_address" => $this->offcice_address,
            "phone_company" => $this->company,
            "tax_code" => $this->tax_code,
            "info_account" => $this->info_account,
            "field" => [
                "id" => $field->id,
                "name" => $field->name,
            ],
            "user_contact" => $this->user_contact,
            "user_contact_phone" =>$this->user_contact_phone,
            "type" => $this->type,
            "partner_code" =>$this->partner_code
        ];
    }
}
