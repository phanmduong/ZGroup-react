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

//        switch ($notification->notificationType->type) {
//        case "manage":
//            Redis::publish(config("app.channel"), $jsonData);
//            break;
//        case "social":
//            Redis::publish(config("app.social_channel"), $jsonData);
//            break;

//    }
//        send_push_notification($jsonData);
        Redis::publish(config("app.channel"), $jsonData);
    }

    public function sendLikeNotification($actor, $product)
    {

        $notification = new Notification();
        $notification->product_id = $product->id;
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $product->author->id;
        $notification->type = 35;

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

//        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendCreateTopicNotification($actor, $receiver, $topic)
    {
        $notification = new Notification;
        $notification->actor_id = $actor->id;
        $notification->product_id = $topic->id;
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
        $notification->product_id = $product->id;
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
        $notification->product_id = $product->id;
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
        $student = $register->user;
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
                    $notification->url = "/profile/" . $student->username . "/progress";
                    $notification->product_id = $student->username;
                    $notification->save();
                    $this->sendNotification($notification);
                }

            }
        }

    }

    public function sendRemindCheckInTeachNofication($reciever, $class, $time)
    {
        $notification = new Notification;
        $notification->actor_id = 0;
        $notification->receiver_id = $reciever->id;
        $notification->product_id = 'checkin';
        $notification->type = 23;

        $message = $notification->notificationType->template;

        $message = str_replace('[[CLASS_NAME]]', "<strong>" . $class->name . "</strong>", $message);
        $message = str_replace('[[TIME]]', "<strong>" . $time . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $reciever->avatar_url ? $reciever->avatar_url : defaultAvatarUrl();

        $notification->url = "#";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendRemindCheckOutTeachNofication($reciever, $class, $time)
    {
        $notification = new Notification;
        $notification->actor_id = 0;
        $notification->receiver_id = $reciever->id;
        $notification->product_id = 'checkout';
        $notification->type = 24;

        $message = $notification->notificationType->template;

        $message = str_replace('[[CLASS_NAME]]', "<strong>" . $class->name . "</strong>", $message);
        $message = str_replace('[[TIME]]', "<strong>" . $time . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $reciever->avatar_url ? $reciever->avatar_url : defaultAvatarUrl();

        $notification->url = "#";

        $notification->save();
        $this->sendNotification($notification);
    }


    public function sendRemindCheckInSMNofication($shift)
    {
        if ($shift->user == null) {
            return;
        }
        if ($shift->shift_session == null) {
            return;
        }
        $user = $shift->user;
        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $user->id;
        $notification->product_id = "checkin";
        $notification->type = 25;

        $message = $notification->notificationType->template;

        $session = $shift->shift_session;

        $message = str_replace('[[SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);
        $message = str_replace('[[TIME]]', "<strong>" . $session->start_time . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();

        $notification->url = "/";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendRemindCheckOutSMNofication($shift)
    {
        if ($shift->user == null) {
            return;
        }
        if ($shift->shift_session == null) {
            return;
        }
        $user = $shift->user;
        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $user->id;
        $notification->product_id = "checkout";
        $notification->type = 26;

        $message = $notification->notificationType->template;

        $session = $shift->shift_session;

        $message = str_replace('[[SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);
        $message = str_replace('[[TIME]]', "<strong>" . $session->end_time . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();

        $notification->url = "/";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendConfirmCheckInTeachNotification($class, $reciever)
    {
        $notification = new Notification;
        $notification->actor_id = 0;
        $notification->receiver_id = $reciever->id;
        $notification->product_id = 'checkin';
        $notification->type = 27;

        $message = $notification->notificationType->template;

        $message = str_replace('[[CLASS_NAME]]', "<strong>" . $class->name . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $reciever->avatar_url ? $reciever->avatar_url : defaultAvatarUrl();

        $notification->url = "#";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendConfirmCheckOutTeachNotification($class, $reciever)
    {
        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $reciever->id;
        $notification->product_id = 'checkout';
        $notification->type = 28;

        $message = $notification->notificationType->template;

        $message = str_replace('[[CLASS_NAME]]', "<strong>" . $class->name . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $reciever->avatar_url ? $reciever->avatar_url : defaultAvatarUrl();

        $notification->url = "#";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendConfirmCheckInSMNotification($shift)
    {
        if ($shift->user == null) {
            return;
        }
        if ($shift->shift_session == null) {
            return;
        }

        $user = $shift->user;
        $session = $shift->shift_session;

        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $user->id;
        $notification->product_id = 'checkin';
        $notification->type = 29;

        $message = $notification->notificationType->template;

        $message = str_replace('[[SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();

        $notification->url = "#";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendConfirmCheckOutSMNotification($shift)
    {
        if ($shift->user == null) {
            return;
        }
        if ($shift->shift_session == null) {
            return;
        }

        $user = $shift->user;
        $session = $shift->shift_session;

        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $user->id;
        $notification->product_id = 'checkout';
        $notification->type = 30;

        $message = $notification->notificationType->template;

        $message = str_replace('[[SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();

        $notification->url = "#";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendMoneyTransferingNotification($transaction)
    {
        $actor = $transaction->sender;
        $receiver = $transaction->receiver;
        if ($receiver == null || $actor == null) {
            return;
        }
        $notification = new Notification();
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $receiver->id;
        $notification->product_id = $transaction->id;
        $notification->type = 3;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[AMOUNT]]', "<strong>" . $transaction->money . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $receiver->name . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $actor->avatar_url ? $actor->avatar_url : defaultAvatarUrl();

        $notification->url = "/manage/sendmoney";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendMoneyTransferredNotification($transaction)
    {
        $actor = $transaction->sender;
        $receiver = $transaction->receiver;
        if ($receiver == null || $actor == null) {
            return;
        }
        $notification = new Notification();
        $notification->actor_id = $actor->id;
        $notification->receiver_id = $receiver->id;
        $notification->product_id = $transaction->id;
        $notification->type = 4;

        $message = $notification->notificationType->template;

        $message = str_replace('[[ACTOR]]', "<strong>" . $actor->name . "</strong>", $message);
        $message = str_replace('[[AMOUNT]]', "<strong>" . $transaction->money . "</strong>", $message);
        $message = str_replace('[[TARGET]]', "<strong>" . $receiver->name . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $actor->avatar_url ? $actor->avatar_url : defaultAvatarUrl();

        $notification->url = "/manage/sendmoney";

        $notification->save();
        $this->sendNotification($notification);
    }

//    public function sendConfirmCheckInWorkShiftNotification($workShiftUser)
//    {
//        $user = $workShiftUser->user;
//        $session = $workShiftUser->workShift->work_shift_session;
//
//        if ($session == null) {
//            return;
//        }
//
//        $notification = new Notification();
//        $notification->actor_id = 0;
//        $notification->receiver_id = $user->id;
//        $notification->product_id = 'checkin_work_shift';
//        $notification->type = 31;
//
//        $message = $notification->notificationType->template;
//
//        $message = str_replace('[[WORK_SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);
//
//        $notification->message = $message;
//        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();
//
//        $notification->url = config("app.protocol") . "manage." . config("app.domain") . "/work-shift/shift-registers";
//
//        $notification->save();
//        $this->sendNotification($notification);
//    }
//
//    public function sendConfirmCheckOutWorkShiftNotification($workShiftUser)
//    {
//        $session = $workShiftUser->workShift->work_shift_session;
//
//        if ($session == null) {
//            return;
//        }
//
//        $user = $workShiftUser->user;
//        $session = $workShiftUser->shift_session;
//
//        $notification = new Notification();
//        $notification->actor_id = 0;
//        $notification->receiver_id = $user->id;
//        $notification->product_id = 'checkout_work_shift';
//        $notification->type = 32;
//
//        $message = $notification->notificationType->template;
//
//        $message = str_replace('[[WORK_SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);
//
//        $notification->message = $message;
//        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();
//
//        $notification->url = config("app.protocol") . "manage." . config("app.domain") . "/work-shift/shift-registers";
//
//        $notification->save();
//        $this->sendNotification($notification);
//    }

    public function sendRemindCheckInWorkShiftNofication($workShiftUser)
    {
        $session = $workShiftUser->workShift->work_shift_session;
        if ($session == null) {
            return;
        }
        $user = $workShiftUser->user;

        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $user->id;
        $notification->product_id = "checkin";
        $notification->type = 33;

        $message = $notification->notificationType->template;

        $message = str_replace('[[WORK_SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);
        $message = str_replace('[[TIME]]', "<strong>" . $session->start_time . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();

        $notification->url = "/";

        $notification->save();
        $this->sendNotification($notification);
    }

    public function sendRemindCheckOutWorkShiftNofication($workShiftUser)
    {
        $session = $workShiftUser->workShift->work_shift_session;
        if ($session == null) {
            return;
        }
        $user = $workShiftUser->user;

        $notification = new Notification();
        $notification->actor_id = 0;
        $notification->receiver_id = $user->id;
        $notification->product_id = "checkout";
        $notification->type = 34;

        $message = $notification->notificationType->template;

        $message = str_replace('[[WORK_SHIFT]]', "<strong>" . $session->name . "(" . $session->start_time . "-" . $session->end_time . ")" . "</strong>", $message);
        $message = str_replace('[[TIME]]', "<strong>" . $session->end_time . "</strong>", $message);

        $notification->message = $message;
        $notification->image_url = $user->avatar_url ? $user->avatar_url : defaultAvatarUrl();

        $notification->url = "/";

        $notification->save();
        $this->sendNotification($notification);
    }


}