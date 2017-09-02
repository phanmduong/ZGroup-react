<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotificationType extends Model
{
    protected $table = "notification_types";

    public function notifications()
    {
        return $this->belongsTo(Notification::class, "type");
    }

}
