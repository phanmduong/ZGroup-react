<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotificationType extends Model
{
    use SoftDeletes;
    protected $table = "notification_types";
    protected $dates = ['deleted_at'];

    public function notifications()
    {
        return $this->belongsTo(Notification::class, "type");
    }

    public function mobile_notifications_type()
    {
        return $this->belongsTo(MobileNotificationType::class, 'mobile_notification_type_id');
    }

    public function transform(){
        return [
            'id' => $this->id,
            'color' => $this->color,
            'name' => $this->name,
            'description' => $this->template,
            'icon' => $this->icon,
            'type' => $this->type,
            'content' => $this->content_template,
            'mobile_notification' => $this->mobile_notification_type,
        ];
    }

}
