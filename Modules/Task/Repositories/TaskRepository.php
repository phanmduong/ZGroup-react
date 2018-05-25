<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Card;
use App\Colorme\Transformers\TaskTransformer;
use App\Notification;
use App\Repositories\CalendarEventRepository;
use App\Repositories\NotificationRepository;
use App\Task;
use App\User;
use Illuminate\Support\Facades\Redis;
use Modules\Good\Entities\BoardTaskTaskList;
use Modules\Task\Entities\TaskList;
use Modules\Task\Transformers\MemberTransformer;

class TaskRepository
{
    protected $taskTransformer;
    protected $memberTransformer;
    protected $calendarEventRepository;
    protected $notificationRepository;

    public function __construct(
        NotificationRepository $notificationRepository,
        MemberTransformer $memberTransformer,
        CalendarEventRepository $calendarEventRepository,
        TaskTransformer $taskTransformer)
    {
        $this->notificationRepository = $notificationRepository;
        $this->taskTransformer = $taskTransformer;
        $this->calendarEventRepository = $calendarEventRepository;
        $this->memberTransformer = $memberTransformer;
    }

    public function saveTaskDeadline($task, $deadline, $currentUser)
    {
        $task->deadline = $deadline;
        $task->save();
        $this->calendarEventRepository->updateCalendarEvent("task", $task->id);

        $card = $task->taskList->card;
        $project = $card->board->project;
        $user = $task->member;

        if ($user && $currentUser && $currentUser->id != $user->id) {

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

    public function createTaskListFromTemplate($taskListId, $cardId, $currentUser)
    {
        $taskListTemplate = TaskList::find($taskListId);

        $taskList = $taskListTemplate->replicate();
        $taskList->role = "process";
        $taskList->card_id = $cardId;
        $taskList->save();

        $card = Card::find($cardId);

        $project = $card->board->project;

        foreach ($taskListTemplate->tasks as $item) {
            $task = $item->replicate();
            $task->task_template_id = $item->id;
            $task->task_list_id = $taskList->id;
            if ($task->span > 0 && $card->board_id == $task->current_board_id) {
                $date = new \DateTime();
                $date->modify("+$task->span hours");
                $task->deadline = $date->format("Y-m-d H:i:s");
            } else {
                $task->deadline = "";
            }
            $task->save();

            // copy boards from old task to the new one
            $boardTasks = $item->boardTasks;
            if ($boardTasks) {
                foreach ($boardTasks as $boardTask) {
                    $newBoardTask = $boardTask->replicate();
                    $newBoardTask->task_id = $task->id;
                    $newBoardTask->save();
                }
            }

            // copy users
            if ($item->users) {
                foreach ($item->users as $user) {
                    $task->users()->attach($user->id);
                }
            }

            // replicate all GoodPropertyItems
            foreach ($item->goodPropertyItems as $goodPropertyItem) {
                $task->goodPropertyItems()->attach($goodPropertyItem->id);
            }

        }
        // add only the users of current task to current board
        $currentTask = $taskList->tasks->where("current_board_id", $card->board_id)->first();
//            dd($currentTask);
        if ($currentTask) {
            foreach ($currentTask->users as $user) {
                $member = $card->assignees()->where("id", $user->id)->first();
                if ($member == null) {
                    $card->assignees()->attach($user->id);
                }

                $projectMember = $project->members()->where("user_id", $user->id)->first();
                if ($projectMember == null) {
                    $project->members()->attach($user->id);
                }

                if ($currentUser && $currentUser->id != $user->id) {

                    $notification = new Notification;
                    $notification->actor_id = $currentUser->id;
                    $notification->receiver_id = $user->id;
                    $notification->type = 19;
                    $message = $notification->notificationType->template;

                    $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
                    $message = str_replace('[[TASK]]', "<strong>" . $currentTask->title . "</strong>", $message);
                    $message = str_replace('[[CARD]]', "<strong>" . $card->title . "</strong>", $message);
                    $message = str_replace('[[PROJECT]]', "<strong>" . $project->title . "</strong>", $message);
                    $notification->message = $message;

                    $notification->color = $notification->notificationType->color;
                    $notification->icon = $notification->notificationType->icon;
                    $notification->url = '/project/' . $project->id . "/boards?card_id=" . $card->id;

                    $notification->save();

                    $this->notificationRepository->sendNotification($notification);
                }
            }

        }
        return [
            "id" => $taskList->id,
            "card_id" => $cardId,
            "role" => $taskList->role,
            "title" => $taskList->title,
            'tasks' => $taskList->tasks->map(function ($task) {
                return $task->transform();
            }),
            "card" => $card->transform(),
            "project_members" => $project->members->map(function ($member) {
                return [
                    "id" => $member->id,
                    "name" => $member->name,
                    "email" => $member->email,
                    "is_admin" => $member->pivot->role === 1,
                    "added" => true,
                    "avatar_url" => generate_protocol_url($member->avatar_url)
                ];
            })
        ];
    }

    public function addMemberToTask($task, $members, $currentUser)
    {
        $task->users()->detach();
        $card = $task->taskList->card;
        foreach ($members as $member) {
            $task->users()->attach($member->id);
            $userId = $member->id;
            if ($card) {
                $member = $card->assignees()->where("id", $userId)->first();

                if ($userId != 0 && $member == null) {
                    $card->assignees()->attach($userId);
                }


                $this->calendarEventRepository->updateCalendarEvent("task", $task->id);

                $card = $task->taskList->card;
                $project = $card->board->project;

                $user = User::find($userId);
                if ($currentUser && $user != null && $currentUser->id != $user->id) {

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

                    $this->notificationRepository->sendNotification($notification);
                }
            }
            $task->save();
        }


        return true;
    }
}