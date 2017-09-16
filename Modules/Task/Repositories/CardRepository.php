<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\CalendarEvent;
use App\Card;
use App\CardComment;
use App\Colorme\Transformers\TaskTransformer;
use App\Notification;
use App\User;
use Illuminate\Support\Facades\Redis;

class CardRepository
{
    protected $taskTransformer;

    public function __construct(TaskTransformer $taskTransformer)
    {
        $this->taskTransformer = $taskTransformer;
    }

    public function saveCardComment($content, $commenter_id, $card_id, $currentUser)
    {
        $cardComment = new  CardComment();
        $cardComment->content = $content;
        $cardComment->commenter_id = $commenter_id;
        $cardComment->card_id = $card_id;
        $cardComment->save();

        $card = $cardComment->card;
        $publish_data = array(
            "event" => "card_comment",
            "data" => $cardComment->transform()
        );

        Redis::publish(config("app.channel"), json_encode($publish_data));

        $project = $card->board->project;
        foreach ($card->assignees as $user) {
            if ($currentUser && $currentUser->id != $user->id) {

                $notification = new Notification;
                $notification->actor_id = $currentUser->id;
                $notification->receiver_id = $user->id;
                $notification->type = 18;
                $message = $notification->notificationType->template;

                $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
                $message = str_replace('[[CARD]]', "<strong>" . $card->name . "</strong>", $message);
                $message = str_replace('[[PROJECT]]', "<strong>" . $project->title . "</strong>", $message);
                $notification->message = $message;

                $notification->color = $notification->notificationType->color;
                $notification->icon = $notification->notificationType->icon;
                $notification->url = '/project/' . $project->id . "/boards?card_id=" . $card->id;

                $notification->save();

                $data = array(
                    "message" => $message,
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

        return $cardComment;
    }
}