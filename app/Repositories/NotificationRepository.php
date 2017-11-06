<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 21:07
 */

namespace App\Repositories;


use App\Notification;
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
            "color" => $notification->color,
            "id" => $notification->id
        );

        $publish_data = array(
            "event" => "notification",
            "data" => $data
        );

        $jsonData = json_encode($publish_data);

        Redis::publish(config("app.channel"), $jsonData);
        send_push_notification($jsonData);
    }

    public function sendLikeNotification($actor, $receiverId, $product)
    {

        $notification = new Notification();
        $notification->product_id = $product->id;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $receiverId;
        $notification->type = 0;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $product->title . "</strong>", $message);
        $notification->message = $message;

        $notification->color = $notification->notificationType->color;
        $notification->icon = $notification->notificationType->icon;
        $notification->url = $url;

        $notification->save();

        $this->sendNotification($notification);
    }

}