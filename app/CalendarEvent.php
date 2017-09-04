<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $table = "calendar_events";

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
