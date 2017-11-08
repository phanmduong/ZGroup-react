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
            "image_url" => $notification->image_url,
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

        switch ($notification->notificationType->type) {
            case "manage":
                Redis::publish(config("app.channel"), $jsonData);
                break;
            case "social":
                Redis::publish(config("app.social_channel"), $jsonData);
                break;
        }


        send_push_notification($jsonData);
    }

    public function sendLikeNotification($actor, $product)
    {

        $notification = new Notification();
        $notification->product_id = $product->id;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $product->author->id;
        $notification->type = 0;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $product->title . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = generate_protocol_url($actor->avatar_url) ? generate_protocol_url($actor->avatar_url) : defaultAvatarUrl();
        $notification->url = "/post/" . convert_vi_to_en($product->title) . "-" . $product->id;

        $notification->save();

        $this->sendNotification($notification);
    }

    public function sendCommentNotification($actor, $product)
    {
        $notification = new Notification;
        $notification->product_id = $product->id;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $product->author->id;
        $notification->type = 1;
        $notification->save();

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $product->title . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = generate_protocol_url($actor->avatar_url) ? generate_protocol_url($actor->avatar_url) : defaultAvatarUrl();
        $notification->url = "/post/" . convert_vi_to_en($product->title) . "-" . $product->id;

        $notification->save();

        $this->sendNotification($notification);
    }

    public function sendAlsoCommentNotification($product, $commenter, $actor)
    {
        $notification = new Notification;
        $notification->product_id = $product->id;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $commenter->id;
        $notification->type = 2;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $product->title . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = generate_protocol_url($actor->avatar_url) ? generate_protocol_url($actor->avatar_url) : defaultAvatarUrl();
        $notification->url = "/post/" . convert_vi_to_en($product->title) . "-" . $product->id;

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendCreateTopicNotification($actor, $receiver, $topic)
    {
        $notification = new Notification;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $receiver->id;
        $notification->type = 5;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $topic->title . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = generate_protocol_url($actor->avatar_url) ? generate_protocol_url($actor->avatar_url) : defaultAvatarUrl();

        $group = $topic->group;
        if ($group) {
            $notification->url = "/group/" . $group->id . "/topic/" . $topic->id;
        }


        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendFeatureProductNotification($actor, $product)
    {
        $notification = new Notification;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $product->author->id;
        $notification->type = 6;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $product->title . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = generate_protocol_url($actor->avatar_url) ? generate_protocol_url($actor->avatar_url) : defaultAvatarUrl();

        $notification->url = "/post/" . convert_vi_to_en($product->title) . "-" . $product->id;

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendSubmitHomeworkNotification($student, $product, $topic, $teacher)
    {
        $notification = new Notification;
        $notification->actor_id = $student->id;
        $notification->receiver_id = $teacher->id;
        $notification->type = 13;
        $class = $topic->group->studyClass;

        $message = $notification->notificationType->template;

        $message = str_replace('[[TEACHER]]', "<strong>" . $teacher->name . "</strong>", $message);
        $message = str_replace('[[STUDENT]]', "<strong>" . $student->name . "</strong>", $message);
        $message = str_replace('[[PRODUCT]]', "<strong>" . $product->title . "</strong>", $message);
        $message = str_replace('[[TOPIC]]', "<strong>" . $topic->title . "</strong>", $message);
        $message = str_replace('[[CLASS]]', "<strong>" . $class->name . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $student->avatar_url ? $student->avatar_url : defaultAvatarUrl();

        $notification->url = "/post/" . convert_vi_to_en($product->title) . "-" . $product->id;

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendConfirmStudentAttendanceNotification($actor, $attendance)
    {

        $register = $attendance->register;

        if ($register) {

            $notification = new Notification;
            $notification->actor_id = $actor->id;
            $notification->receiver_id = $register->user_id;
            $notification->type = 22;

            $classLesson = $attendance->classLesson;
            if ($classLesson) {
                $class = $classLesson->studyClass;
                $lesson = $classLesson->lesson;
                if ($class && $lesson) {
                    $message = $notification->notificationType->template;
                    $message = str_replace('[[LESSON_ORDER]]', "<strong>" . $lesson->order . "</strong>", $message);
                    $message = str_replace('[[CLASS_NAME]]', "<strong>" . $class->name . "</strong>", $message);
                    $notification->message = $message;
                    $notification->image_url = $actor->avatar_url ? $actor->avatar_url : defaultAvatarUrl();
                    $notification->url = "/profile/" . $actor->username . "/progress";

                    $notification->save();
                    $this->sendNotification($notification);
                }

            }
        }

    }


}