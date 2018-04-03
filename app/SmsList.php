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

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function templates()
    {
        return $this->hasMany(SmsTemplate::class, "sms_list_id");
    }

    public function getData()
    {
        return [
            "id" => $this->id,
            "user" => [
                "id" => $this->user->id,
                "avatar_url" => $this->user->avatar_url
            ],
            "name" => $this->name,
            "description" => $this->description,
            "status" => $this->status,
            "sms_campaign_type_id" => $this->sms_campaign_type_id,
            "budget" => 0
        ];
    }
}
