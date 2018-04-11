<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sms extends Model
{
    protected $table = "sms";

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
