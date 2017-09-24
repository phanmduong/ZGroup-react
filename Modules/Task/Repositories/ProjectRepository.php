<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Notification;
use App\Project;
use App\Repositories\NotificationRepository;
use Illuminate\Support\Facades\Redis;

class ProjectRepository
{
    protected $notificationRepository;

    public function __construct(
        NotificationRepository $notificationRepository
    )
    {
        $this->notificationRepository = $notificationRepository;
    }

    public function assignRoleMember($projectId, $memberId, $role, $currentUser)
    {
        $project = Project::find($projectId);
        $project->members()->updateExistingPivot($memberId, [
            "adder_id" => $currentUser->id,
            "role" => $role
        ]);
    }

    public function notiAssignProject($currentUser, $project, $receiverId)
    {
        if ($currentUser && $currentUser->id != $receiverId) {


            $notification = new Notification;
            $notification->actor_id = $currentUser->id;
            $notification->receiver_id = $receiverId;
            $notification->type = 14;
            $message = $notification->notificationType->template;

            $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
            $message = str_replace('[[PROJECT]]', "<strong>" . $project->title . "</strong>", $message);
            $notification->message = $message;

            $notification->color = $notification->notificationType->color;
            $notification->icon = $notification->notificationType->icon;
            $notification->url = '/project/' . $project->id . '/boards';

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

    public function notiRemoveFromProject($currentUser, $project, $receiverId)
    {
        if ($currentUser && $currentUser->id != $receiverId) {


            $notification = new Notification;
            $notification->actor_id = $currentUser->id;
            $notification->receiver_id = $receiverId;
            $notification->type = 15;
            $message = $notification->notificationType->template;

            $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
            $message = str_replace('[[PROJECT]]', "<strong>" . $project->title . "</strong>", $message);
            $notification->message = $message;

            $notification->color = $notification->notificationType->color;
            $notification->icon = $notification->notificationType->icon;
            $notification->url = '/project/list';

            $notification->save();

            $this->notificationRepository->sendNotification($notification);
        }
    }

    public function assign($projectId, $userId, $currentUser, $role = 0)
    {
        $project = Project::find($projectId);
        $member = $project->members()->where('id', '=', $userId)->first();
        if ($member) {
            $project->members()->detach($userId);
            $this->notiRemoveFromProject($currentUser, $project, $userId);
        } else {
            $project->members()->attach($userId, [
                "adder_id" => $currentUser->id,
                "role" => $role
            ]);
            $this->notiAssignProject($currentUser, $project, $userId);

        }

        return true;
    }
}