<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Board;
use App\Notification;
use App\Project;
use App\Repositories\NotificationRepository;
use Illuminate\Support\Facades\Redis;
use Modules\Task\Entities\ProjectUser;

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
        $member = ProjectUser::where("user_id", $userId)->where("project_id", $projectId)->first();
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

    public function loadProjectBoards($project, $currentUser)
    {

        $boards = Board::where('project_id', '=', $project->id)->where("status", "open")->orderBy('order')->get();

        $data = [
            "id" => $project->id,
            "title" => $project->title,
            "status" => $project->status,
            "description" => $project->description,
            "boards" => $boards->map(function ($board) {
                return $board->transformBoardWithCard();
            })
        ];


        if ($currentUser) {
            $projectUser = ProjectUser::where("project_id", $project->id)->where("user_id", $currentUser->id)->first();
            if ($projectUser) {
                $data["setting"] = $projectUser->setting;
            }
        }



        $members = $project->members->map(function ($member) {
            return [
                "id" => $member->id,
                "name" => $member->name,
                "email" => $member->email,
                "is_admin" => $member->pivot->role === 1,
                "added" => true,
                "avatar_url" => generate_protocol_url($member->avatar_url)
            ];
        });
        $cardLables = $project->labels()->get(['id', 'name', "color"]);
        $data['members'] = $members;
        $data['cardLabels'] = $cardLables;
        $data['canDragBoard'] = $project->can_drag_board;
        $data['canDragCard'] = $project->can_drag_card;
        return $data;
    }
}