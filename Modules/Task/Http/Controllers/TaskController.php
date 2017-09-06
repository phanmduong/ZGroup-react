<?php

namespace Modules\Task\Http\Controllers;

use App\Board;
use App\Card;
use App\Colorme\Transformers\BoardTransformer;
use App\Colorme\Transformers\CardTransformer;
use App\Colorme\Transformers\TaskTransformer;
use App\Http\Controllers\ManageApiController;
use App\Notification;
use App\Project;
use App\Repositories\UserRepository;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Redis;
use Modules\Task\Entities\CardLabel;
use Modules\Task\Entities\TaskList;
use Modules\Task\Repositories\UserCardRepository;
use Modules\Task\Transformers\MemberTransformer;

class TaskController extends ManageApiController
{
    protected $boardTransformer;
    protected $cardTransformer;
    protected $memberTransformer;
    protected $taskTransformer;
    protected $userRepository;
    protected $userCardRepository;

    public function __construct(
        UserRepository $userRepository,
        TaskTransformer $taskTransformer,
        MemberTransformer $memberTransformer,
        BoardTransformer $boardTransformer,
        CardTransformer $cardTransformer,
        UserCardRepository $userCardRepository)
    {
        parent::__construct();
        $this->boardTransformer = $boardTransformer;
        $this->cardTransformer = $cardTransformer;
        $this->taskTransformer = $taskTransformer;
        $this->userRepository = $userRepository;
        $this->memberTransformer = $memberTransformer;
        $this->userCardRepository = $userCardRepository;
    }


    public function createProject(Request $request)
    {
        if ($request->title == null) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $project = Project::find($request->id);
            $message = "Sửa dự án thành công";
        } else {
            $project = new Project();
            $message = "Tạo dự án thành công";
        }

        $project->title = trim($request->title);
        $project->description = trim($request->description);
        $project->creator_id = $this->user->id;
        $project->editor_id = $this->user->id;
        $project->color = $request->color;
        if ($request->status) {
            $project->status = $request->status;
        } else {
            $project->status = Project::$OPEN;
        }
        $project->save();

        return $this->respondSuccessWithStatus(["message" => $message]);
    }

    public function deleteProject($projectId)
    {
        $project = Project::find($projectId);
        if ($project == null) {
            return $this->responseNotFound("dự án không tồn tại");
        }
        $project->delete();
        return $this->respondSuccessWithStatus(['message' => "Xoá cơ sở thành công"]);
    }

    public function project($projectId)
    {
        $project = Project::find($projectId);
        if ($project == null) {
            return $this->responseNotFound("Cơ sở không tồn tại");
        }
        $data = [
            "id" => $projectId,
            "title" => $project->title,
            "description" => $project->description
        ];
        return $this->respondSuccessWithStatus($data);
    }


    public function projects(Request $request)
    {
        $query = trim($request->q);

        $limit = 20;

        if ($query) {
            $projects = Project::where("title", "like", "%$query%")
                ->orWhere("description", "like", "%$query%")
                ->orderBy('created_at')->paginate($limit);
        } else {
            $projects = Project::orderBy('created_at')->paginate($limit);
        }


        $data = [
            "projects" => $projects->map(function ($project) {
                return $project->transform();
            }),

        ];
        return $this->respondWithPagination($projects, $data);
    }

    public function changeProjectStatus($projectId, Request $request)
    {
        $project = Project::find($projectId);
        $project->status = $request->status;
        $project->save();

        return $this->respondSuccessWithStatus(["message" => "Thay đổi trạng thái dự án thành công"]);
    }

    public function getBoards($projectId, Request $request)
    {

        $boards = Board::where('project_id', '=', $projectId)->orderBy('order')->get();
        $data = [
            "boards" => $boards->map(function ($board) {
                $cards = $board->cards()->where("status", "open")->orderBy('order')->get();
                return [
                    'id' => $board->id,
                    'title' => $board->title,
                    'order' => $board->order,
                    'cards' => $cards->map(function ($card) {
                        $taskListIds = $card->taskLists->pluck("id");
                        $hasDeadline = $card->deadline && $card->deadline != "0000-00-00 00:00:00";
                        return [
                            'id' => $card->id,
                            'title' => $card->title,
                            "deadline_elapse" => $hasDeadline ? time_remain_string(strtotime($card->deadline)) : null,
                            "deadline" => $hasDeadline ? format_vn_short_datetime(strtotime($card->deadline)) : null,
                            'board_id' => $card->board_id,
                            'order' => $card->order,
                            "cardLabels" => $card->cardLabels,
                            "tasks" => Task::whereIn("task_list_id", $taskListIds)->get(),
                            "members" => $this->memberTransformer->transformCollection($card->assignees)
                        ];
                    })
                ];
            })
        ];
        return $this->respond($data);
    }

    public function createCard(Request $request)
    {
        if (is_null($request->title) ||
            is_null($request->board_id)) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $card = Card::find($request->id);
        } else {
            $card = new Card();
        }
        DB::statement("UPDATE cards SET `order` = `order` + 1 where cards.board_id = " . $request->board_id);


        $card->title = trim($request->title);
        $card->description = trim($request->description);
        $card->order = 0;
        $card->board_id = $request->board_id;
        $card->editor_id = $this->user->id;
        $card->creator_id = $this->user->id;
        $card->save();

        return $this->respond(["card" => $this->cardTransformer->transform($card)]);
    }

    public function createBoard(Request $request)
    {
        if (is_null($request->title) || is_null($request->project_id)) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $board = Board::find($request->id);
            $message = "Sửa bảng thành công";
        } else {
            $board = new Board();
            $message = "Tạo bảng thành công";
            $temp = Board::where('project_id', '=', $request->project_id)
                ->orderBy('order', 'desc')->first();

            if ($temp) {
                $order = $temp->order;
            } else {
                $order = 0;
            }
            $board->order = $order + 1;
        }

        $board->title = trim($request->title);
        $board->project_id = trim($request->project_id);
        $board->editor_id = $this->user->id;
        $board->creator_id = $this->user->id;
        $board->save();

        return $this->respond([
            "message" => $message,
            "board" => $this->boardTransformer->transform($board)
        ]);
    }

    public function updateCards(Request $request)
    {
        if (is_null($request->cards) || is_null($request->board_id)) {
            return $this->responseBadRequest("Thiếu params");
        }

        $cards = json_decode($request->cards);
        $board_id = $request->board_id;
        foreach ($cards as $c) {
            $card = Card::find($c->id);
            $card->board_id = $board_id;
            $card->order = $c->order;
            $card->save();
        }
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function updateBoards(Request $request)
    {
        if (is_null($request->boards)) {
            return $this->responseBadRequest("Thiếu params");
        }

        $boards = json_decode($request->boards);
        foreach ($boards as $b) {
            $board = Board::find($b->id);
            $board->order = $b->order;
            $board->save();
        }
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }


    public function updateCard($cardId, Request $request)
    {
        if (is_null($request->description)) {
            return $this->responseBadRequest("Thiếu params");
        }
        $card = Card::find($cardId);
        $card->description = trim($request->description);
        $card->save();

        $currentUser = $this->user;

        foreach ($card->assignees as $assignee) {
            if ($currentUser && $currentUser->id != $assignee->id) {

                $project = $card->board->project;

                $notification = new Notification;
                $notification->actor_id = $currentUser->id;
                $notification->card_id = $cardId;
                $notification->receiver_id = $assignee->id;
                $notification->type = 11;
                $message = $notification->notificationType->template;

                $message = str_replace('[[USER]]', "<strong>" . $currentUser->name . "</strong>", $message);
                $message = str_replace('[[CARD]]', "<strong>" . $card->title . "</strong>", $message);
                $notification->message = $message;

                $notification->color = $notification->notificationType->color;
                $notification->icon = $notification->notificationType->icon;
                $notification->url = '/project/' . $project->id . '/boards'. "?card_id=" . $cardId;

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

        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function createTaskList(Request $request)
    {
        if (is_null($request->title) || is_null($request->card_id)) {
            return $this->responseBadRequest("Thiếu params");
        }
        $taskList = new TaskList();
        $taskList->title = trim($request->title);
        $taskList->card_id = $request->card_id;
        $taskList->save();
        return $this->respondSuccessWithStatus([
            "id" => $taskList->id,
            "card_id" => $request->card_id,
            "title" => $taskList->title
        ]);
    }

    public function taskLists($cardId)
    {
        $card = Card::find($cardId);
        if (is_null($card)) {
            return $this->responseBadRequest("Card không tồn tại");
        }
        $taskLists = $card->taskLists->map(function ($taskList) {
            return [
                'id' => $taskList->id,
                'title' => $taskList->title,
                'tasks' => $this->taskTransformer->transformCollection($taskList->tasks)
            ];
        });
        return $this->respond($taskLists);
    }

    public function createTask(Request $request)
    {
        if (is_null($request->title)) {
            return $this->responseBadRequest("Thiếu params");
        }
        $task = new Task();
        $task->title = $request->title;
        $task->task_list_id = $request->task_list_id;
        $task->creator_id = $this->user->id;
        $task->editor_id = $this->user->id;
        $task->save();
        return $this->respond([
            "task" => $this->taskTransformer->transform($task)
        ]);
    }

    public function deleteTask($taskId)
    {
        $task = Task::find($taskId);
        if (is_null($task)) {
            return $this->responseBadRequest("Công việc không tồn tại");
        }
        $task->delete();
        return $this->respond(["message" => "success"]);
    }

    public function toggleTask($taskId)
    {
        $task = Task::find($taskId);
        if (is_null($task)) {
            return $this->responseBadRequest("Công việc không tồn tại");
        }
        $task->status = !$task->status;
        $task->save();
        return $this->respond(["message" => "success"]);
    }

    public function loadMembers($filter = "", Request $request)
    {
        $card = Card::find($request->card_id);
        if (is_null($card)) {
            return $this->responseBadRequest("Thẻ không tồn tại");
        }
        $this->memberTransformer->setCard($card);

        $members = $this->userRepository->loadStaffs($filter, 10, 0);

        return $this->respond([
            "members" => $this->memberTransformer->transformCollection($members)
        ]);
    }

    public function deleteTaskList($id)
    {
        $taskList = TaskList::find($id);
        if (is_null($taskList)) {
            return $this->responseBadRequest("Công việc không tồn tại");
        }
        $taskList->delete();
        return $this->respond(["message" => "success"]);
    }

    public function loadCalendarEvents($userId)
    {
        $calendarEvents = $this->userCardRepository->loadCalendarEvents($userId);
        return $this->respondSuccessWithStatus([
            "calendarEvents" => $calendarEvents
        ]);
    }


}
