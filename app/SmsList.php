<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SmsList extends Model
{
    protected $table = "sms_list";

    public function classes()
    {
        return $this->belongsToMany(StudyClass::class, "sms_list_class", 'sms_list_id', 'class_id');
    }
}
