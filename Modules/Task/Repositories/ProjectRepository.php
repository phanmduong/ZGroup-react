<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Project;

class ProjectRepository
{
    public function assign($projectId, $userId, $currentUser = null)
    {
        $project = Project::find($projectId);
        $member = $project->members()->where('id', '=', $userId)->first();
        if ($member) {
            $project->members()->detach($userId);
        } else {
            $project->members()->attach($userId);

//            if ($currentUser && $currentUser->id != $userId) {
//
//                $project = $card->board->project;
//
//                $notification = new Notification;
//                $notification->actor_id = $currentUser->id;
//                $notification->card_id = $cardId;
//                $notification->receiver_id = $userId;
//                $notification->type = 7;
//                $message = $notification->notificationType->template;
//
//                $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
//                $message = str_replace('[[CARD]]', "<strong>" . $card->title . "</strong>", $message);
//                $message = str_replace('[[PROJECT]]', "<strong>" . $project->title . "</strong>", $message);
//                $notification->message = $message;
//
//                $notification->color = $notification->notificationType->color;
//                $notification->icon = $notification->notificationType->icon;
//                $notification->url = '/project/' . $project->id . '/boards' . "?card_id=" . $cardId;
//
//                $notification->save();
//
//                $data = array(
//                    "message" => $message,
//                    "link" => $notification->url,
//                    'created_at' => format_time_to_mysql(strtotime($notification->created_at)),
//                    "receiver_id" => $notification->receiver_id,
//                    "actor_id" => $notification->actor_id,
//                    "icon" => $notification->icon,
//                    "color" => $notification->color
//                );
//
//                $publish_data = array(
//                    "event" => "notification",
//                    "data" => $data
//                );
//
//                Redis::publish(config("app.channel"), json_encode($publish_data));
//            }

        }

        return true;
    }
}