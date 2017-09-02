<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 9/2/17
 * Time: 3:08 PM
 */

namespace Modules\Notification\Transformer;


use App\Colorme\Transformers\Transformer;

class NotificationTransformer extends Transformer
{

    public function transform($notification)
    {
        $data = [
            'id' => $notification->id,
            'receiver_id' => $notification->receiver_id,
            "type" => $notification->type,
            'created_at' => time_elapsed_string(strtotime($notification->created_at)),
            'seen' => $notification->seen == 1
        ];
        switch ($notification->type) {
            case 7:
                $card = $notification->card;
                $board = $card->board;
                $data["url"] = "/project/" . $board->project_id . "/boards";
                $message = $notification->notificationType->template;

                $message = str_replace('[[ACTOR]]', $notification->actor->name, $message);
                $message = str_replace('[[CARD]]', $card->title, $message);
                $message = str_replace('[[PROJECT]]', $board->project->name, $message);
                $data["message"] = $message;
                break;
        }
        return $data;
    }
}