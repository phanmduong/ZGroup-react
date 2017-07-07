<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SmsTemplate extends Model
{
    protected $table = "sms_template";

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
