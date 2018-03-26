<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SendNotification extends Model
{
    public function notificationType()
    {
        return $this->belongsTo(NotificationType::class, "notification_type_id");
    }

    public function creator()
    {
        return $this->belongsTo(User::class, "creator_id");
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'creator' => [
                'id' => $this->creator->id,
                'name' => $this->creator->name,
                'color' => $this->creator->color,
            ],
            'notification_type' => [
                'id' => $this->notificationType->id,
                'name' => $this->notificationType->name,
            ]
        ];
    }
}
