<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Colorme\Transformers\TaskTransformer;
use App\Notification;
use App\Repositories\CalendarEventRepository;
use App\User;
use Illuminate\Support\Facades\Redis;

class TaskRepository
{
    protected $taskTransformer;
    protected $calendarEventRepository;

    public function __construct(
        CalendarEventRepository $calendarEventRepository,
        TaskTransformer $taskTransformer)
    {
        $this->taskTransformer = $taskTransformer;
        $this->calendarEventRepository = $calendarEventRepository;
    }

    public function saveTaskDeadline($task, $deadline, $currentUser)
    {
        $task->deadline = $deadline;
        $task->save();
        $this->calendarEventRepository->updateCalendarEvent("task", $task->id);

        $card = $task->taskList->card;
        $project = $card->board->project;
        $user = $task->member;
        if ($currentUser && $currentUser->id != $user->id) {

            $notification = new Notification;
            $notification->actor_id = $currentUser->id;
            $notification->receiver_id = $user->id;
            $notification->type = 20;
            $message = $notification->notificationType->template;

            $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
            $message = str_replace('[[TASK]]', "<strong>" . $task->title . "</strong>", $message);
            $message = str_replace('[[DEADLINE]]', "<strong>" . format_vn_short_datetime(strtotime($deadline)) . "</strong>", $message);
            $message = str_replace('[[CARD]]', "<strong>" . $card->title . "</strong>", $message);
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
        return $task;
    }

    public function addMemberToTask($task, $userId, $currentUser)
    {
        $task->assignee_id = $userId;
        $card = $task->taskList->card;
        $member = $card->assignees()->where("id", $userId)->first();
        if ($userId != 0 && $member == null) {
            $card->assignees()->attach($userId);
        }
        $task->save();

        $card = $task->taskList->card;
        $project = $card->board->project;

        $user = User::find($userId);
        if ($currentUser && $currentUser->id != $user->id) {

            $notification = new Notification;
            $notification->actor_id = $currentUser->id;
            $notification->receiver_id = $user->id;
            $notification->type = 19;
            $message = $notification->notificationType->template;

            $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
            $message = str_replace('[[TASK]]', "<strong>" . $task->title . "</strong>", $message);
            $message = str_replace('[[CARD]]', "<strong>" . $card->title . "</strong>", $message);
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
        return true;
    }
}