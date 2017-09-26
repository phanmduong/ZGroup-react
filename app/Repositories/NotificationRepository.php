<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 21:07
 */

namespace App\Repositories;


use Illuminate\Support\Facades\Redis;

class NotificationRepository
{
    public function sendNotification($notification)
    {
        $data = array(
            "message" => $notification->message,
            "link" => $notification->url,
            'created_at' => format_time_to_mysql(strtotime($notification->created_at)),
            "receiver_id" => $notification->receiver_id,
            "actor_id" => $notification->actor_id,
            "icon" => $notification->icon,
            "color" => $notification->color
        );

        $publish_data = array(
            "event" => "notification",
            "data" => $data
        );

        Redis::publish(config("app.channel"), json_encode($publish_data));
    }
}