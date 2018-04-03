<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SmsTemplateType extends Model
{
    protected $table = "sms_template_types";

    public function getData()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "color" => $this->color
        ];
    }
}
