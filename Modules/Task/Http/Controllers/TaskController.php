<?php

namespace Modules\Task\Http\Controllers;

use App\Board;
use App\Card;
use App\CardComment;
use App\Colorme\Transformers\BoardTransformer;
use App\Colorme\Transformers\CardTransformer;
use App\Colorme\Transformers\TaskTransformer;
use App\Good;
use App\Http\Controllers\ManageApiController;
use App\Notification;
use App\Project;
use App\Repositories\UserRepository;
use App\Task;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Redis;
use Modules\Book\Entities\Barcode;
use Modules\Good\Repositories\GoodRepository;
use Modules\Task\Entities\CardLabel;
use Modules\Task\Entities\ProjectUser;
use Modules\Task\Entities\TaskList;
use Modules\Task\Repositories\ProjectRepository;
use Modules\Task\Repositories\TaskRepository;
use Modules\Task\Repositories\UserCardRepository;
use Modules\Task\Transformers\MemberTransformer;

class TaskController extends ManageApiController
{
    protected $boardTransformer;
    protected $cardTransformer;
    protected $memberTransformer;
    protected $taskTransformer;
    protected $userRepository;
    protected $projectRepository;
    protected $taskRepository;
    protected $userCardRepository;
    protected $goodRepository;

    public function __construct(
        UserRepository $userRepository,
        TaskTransformer $taskTransformer,
        MemberTransformer $memberTransformer,
        TaskRepository $taskRepository,
        GoodRepository $goodRepository,
        BoardTransformer $boardTransformer,
        CardTransformer $cardTransformer,
        ProjectRepository $projectRepository,
        UserCardRepository $userCardRepository)
    {
        parent::__construct();
        $this->boardTransformer = $boardTransformer;
        $this->cardTransformer = $cardTransformer;
        $this->taskTransformer = $taskTransformer;
        $this->userRepository = $userRepository;
        $this->memberTransformer = $memberTransformer;
        $this->userCardRepository = $userCardRepository;
        $this->projectRepository = $projectRepository;
        $this->goodRepository = $goodRepository;
        $this->taskRepository = $taskRepository;
    }

    private function notiEditTitleProject($currentUser, $project, $receiverId, $oldName)
    {
        if ($currentUser && $currentUser->id != $receiverId) {


            $notification = new Notification;
            $notification->actor_id = $currentUser->id;
            $notification->receiver_id = $receiverId;
            $notification->type = 16;
            $message = $notification->notificationType->template;

            $message = str_replace('[[ACTOR]]', "<strong>" . $currentUser->name . "</strong>", $message);
            $message = str_replace('[[PROJECT]]', "<strong>" . $oldName . "</strong>", $message);
            $message = str_replace('[[NEW_NAME]]', "<strong>" . $project->title . "</strong>", $message);
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


    private function notiEditDescriptionProject($currentUser, $project, $receiverId)
    {
        if ($currentUser && $currentUser->id != $receiverId) {


            $notification = new Notification;
            $notification->actor_id = $currentUser->id;
            $notification->receiver_id = $receiverId;
            $notification->type = 17;
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
        $oldTitle = $project->title;
        $project->title = trim($request->title);
        $oldDescription = $project->description;
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

        if ($oldTitle !== $project->title) {
            foreach ($project->members as $member) {
                $this->notiEditTitleProject($this->user, $project, $member->id, $oldTitle);
            }
        }
        if ($oldDescription !== $project->description) {
            foreach ($project->members as $member) {
                $this->notiEditDescriptionProject($this->user, $project, $member->id);
            }
        }
        if ($request->start_board) {
            $boardId = $request->start_board["id"];
            $boards = $project->boards;
            foreach ($boards as $board) {
                if ($board->id == $boardId) {
                    $board->is_start = true;
                    $board->save();
                } else {
                    $board->is_start = false;
                    $board->save();
                }
            }
        } else {
            $board = $project->boards()->where('is_start', 1)->first();
            if ($board) {
                $board->is_start = 0;
                $board->save();
            }
        }


        $this->projectRepository->assign($project->id, $this->user->id, $this->user, Project::$ADMIN_ROLE);

        return $this->respondSuccessWithStatus(["project" => $project->transform()]);
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

    public function getProject($projectId)
    {
        $project = Project::find($projectId);
        if ($project == null) {
            return $this->responseNotFound("dự án không tồn tại");
        }


        return $this->respondSuccessWithStatus($project->transform());
    }

    public function toggleProject($projectId)
    {
        $project = Project::find($projectId);
        $project->status = $project->status == "open" ? "close" : "open";
        $project->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa trạng thái thành công"
        ]);
    }

    public function loadProjects($request, $status)
    {
        $query = trim($request->q);

        $limit = 20;

        if ($request->limit) {
            $limit = $request->limit;
        }

        $projects = Project::where('status', $status)->select("projects.*");

        if ($this->user->role === 2) {
            if ($query) {
                $projects = $projects->where(function ($q) use ($query) {
                    $q->where("title", "like", "%$query%")
                        ->orWhere("description", "like", "%$query%");
                });
            }
        } else {
            $projects = $projects
                ->join('project_user', 'projects.id', '=', 'project_user.project_id')
                ->where('project_user.user_id', $this->user->id);
            if ($query) {
                $projects = $projects->where(function ($q) use ($query) {
                    $q->where("title", "like", "%$query%")
                        ->orWhere("description", "like", "%$query%");
                });
            }
        }
        $projects = $projects->orderBy('projects.created_at', "desc");
        if ($limit != -1) {
            $projects = $projects->paginate($limit);
            $data = [
                "projects" => $projects->map(function ($project) {
                    return $project->transform();
                }),

            ];
            return $this->respondWithPagination($projects, $data);
        } else {
            $projects = $projects->get();
            return [
                "status" => 1,
                "projects" => $projects->map(function ($project) {
                    return $project->transform();
                })
            ];
        }


    }

    public function archiveProjects(Request $request)
    {
        return $this->loadProjects($request, "close");
    }

    public function projects(Request $request)
    {
        return $this->loadProjects($request, "open");
    }

    public function changeProjectStatus($projectId, Request $request)
    {
        $project = Project::find($projectId);
        $project->status = $request->status;
        $project->save();

        return $this->respondSuccessWithStatus(["message" => "Thay đổi trạng thái dự án thành công"]);
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
//        $card->order = 0;
        $card->board_id = $request->board_id;
        $card->editor_id = $this->user->id;
        $card->creator_id = $this->user->id;

        if ($request->good_id) {
            $card->good_id = $request->good_id;
        }
        $card->save();

        $board = Board::find($request->board_id);

        $good = null;

        if ($board) {
            $project = $board->project;
//            $order = 0;
//            if ($project->status == "book" || $project->status == "fashion") {
//                $order = DB::table('goods')->max('order');
//                $order += 1;
//            }

            switch ($project->status) {
                case "book":
                    if ($request->good_id) {
                        $card->good_id = $request->good_id;
                    } else {
                        $good = new Good();
                        $good->type = "book";
                        $good->name = $card->title;
//                        $good->order = $order;

                        $good->label = $request->label;
                        $good->save();
                        $card->good_id = $good->id;
                    }

                    $card->save();
                    break;
                case "fashion":
                    if ($request->good_id) {
                        $card->good_id = $request->good_id;
                    } else {
                        $good = new Good();
                        $good->type = "fashion";
                        $good->name = $card->title;
//                        $good->order = $order;
                        $good->label = $request->label;
                        $good->save();
                        $card->good_id = $good->id;
                    }


                    $card->save();
                    break;
            }
        }

        if ($request->good_properties) {
            $goodProperties = collect(json_decode($request->good_properties));
            $this->goodRepository->saveGoodProperties($goodProperties, $good->id);
        }

        if ($request->task_list_id) {
            $this->taskRepository->createTaskListFromTemplate($request->task_list_id, $card->id, $this->user);
        }

        if ($good != null) {
            $title = "";
            $taskList = $card->taskLists()->first();
            if ($taskList) {
                $title = $taskList->title;
            }
            $code = $good->id . '-' . strtoupper($good->label) . '-' . abbrev($title);
            $good->code = $code;

            $barcode = Barcode::where("good_id", 0)->orderBy("created_at")->first();
            $good->barcode = $barcode->value;
            $good->save();

            $barcode->good_id = $good->id;
            $barcode->save();
        }


        return $this->respond(["card" => $card->transform()]);
    }

    public function deleteCard($cardId)
    {
        $card = Card::find($cardId);
        if ($card == null) {
            return $this->respondErrorWithStatus("Card ko tồn tại");
        }
        $card->delete();
        return $this->respondSuccessWithStatus(["message" => "success"]);
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
                $notification->url = '/project/' . $project->id . '/boards' . "?card_id=" . $cardId;

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

    public function createTaskListFromTemplate(Request $request)
    {
        if (is_null($request->task_list_id) || is_null($request->card_id)) {
            return $this->responseBadRequest("Thiếu params");
        }
        $taskListId = $request->task_list_id;
        $cardId = $request->card_id;
        $data = $this->taskRepository->createTaskListFromTemplate($taskListId, $cardId, $this->user);
        return $this->respondSuccessWithStatus($data);
    }

    public function getTaskList($id)
    {
        $taskList = TaskList::find($id);
        if (is_null($taskList)) {
            return $this->responseBadRequest("Quy trình không tồn tại");
        }
        $data = $taskList->transformWithOrderedTasks();

        return $this->respondSuccessWithStatus($data);
    }

    public function autoAssignBoardToTask($id)
    {
        $taskList = TaskList::find($id);
        if (is_null($taskList)) {
            return $this->responseBadRequest("Quy trình không tồn tại");
        }
        $project = Project::where("status", $taskList->type)->first();
        if ($project == null) {
            return $this->respondErrorWithStatus("Dự án sách không tồn tại");
        }
        $tasks = $taskList->tasks()->orderBy("order")->get();
        $numTasks = $tasks->count();

        $boards = Board::where('project_id', '=', $project->id)->where("status", "open")->orderBy('order')->get();

        $numBoards = $boards->count();

        $num = min($numTasks, $numBoards);


        for ($i = 0; $i < $num - 1; ++$i) {
            $task = $tasks->get($i);
            $board = $boards->get($i);
            $nextBoard = $boards->get($i + 1);
            $task->current_board_id = $board->id;
            $task->target_board_id = $nextBoard->id;
            $task->save();
        }
        $task = $tasks->get($num - 1);
        $board = $boards->get($num - 1);
        $nextBoard = $boards->get($num);
        if ($numTasks < $numBoards) {
            $task->current_board_id = $board->id;
            $task->target_board_id = $nextBoard->id;
        } else {
            $task->current_board_id = $board->id;
        }
        $task->save();

        return $this->respondSuccessWithStatus([
            "tasklist" => $taskList->transformWithOrderedTasks()
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
                'tasks' => $taskList->tasks->map(function ($task) {
                    return $task->transform();
                })
            ];
        });
        return $this->respond($taskLists);
    }

    public function createTask(Request $request)
    {
        if (is_null($request->title) || $request->task_list_id == null) {
            return $this->responseBadRequest("Thiếu params");
        }
        $task = Task::where("task_list_id", $request->task_list_id)->orderBy("order", "desc")->first();


        if ($task === null || $task->order === null) {
            $order = 0;
        } else {
            $order = $task->order + 1;
        }


        $task = new Task();
        $task->title = $request->title;
        $task->task_list_id = $request->task_list_id;
        $task->creator_id = $this->user->id;
        $task->order = $order;
        $task->editor_id = $this->user->id;
        $task->save();


        return $this->respond([
            "task" => $task->transform()
        ]);
    }

    public function putUpdateTaskOrder(Request $request)
    {
        $tasks = json_decode($request->tasks);
        foreach ($tasks as $t) {
            $task = Task::find($t->id);
            if ($task->order != $t->order) {
                $task->order = $t->order;
                $task->save();
            }
        }
        return $this->respondSuccessWithStatus(["message" => "success"]);
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

    public function deleteCardComment($id)
    {
        $cardComment = CardComment::find($id);
        $cardComment->delete();
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

    public function loadProjectMembers($filter = "", Request $request)
    {
        $project = Project::find($request->project_id);
        if (is_null($project)) {
            return $this->responseBadRequest("Dự án không tồn tại");
        }
        $this->memberTransformer->setProject($project);

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

    public function archiveCard($cardId)
    {
        $card = Card::find($cardId);
        $card->status = $card->status == "open" ? "close" : "open";
        $card->save();
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function changeProjectSetting($projectId, Request $request)
    {
        if (is_null($request->canDragBoard)
            || is_null($request->canEditTask)
            || is_null($request->canDragCard)) {
            return $this->respondErrorWithStatus("canDragBoard and canDragCard are required");
        }
        $project = Project::find($projectId);
        $project->can_drag_board = $request->canDragBoard;
        $project->can_drag_card = $request->canDragCard;
        $project->can_edit_task = $request->canEditTask;
        $project->save();
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function changeProjectPersonalSetting($projectId, Request $request)
    {
        $projectUser = ProjectUser::where("project_id", $projectId)->where("user_id", $this->user->id)->first();
        if ($projectUser == null) {
            $projectUser = new ProjectUser();
            $projectUser->project_id = $projectId;
            $projectUser->user_id = $this->user->id;
            if ($this->user->role == 2) {
                $projectUser->role = 1;
            }
            $projectUser->save();
        }
        if ($request->setting == null) {
            return $this->respondErrorWithStatus("setting param is required");
        }
        $projectUser->setting = $request->setting;
        $projectUser->save();
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function loadProjectPersonalSetting($projectId)
    {
        $projectUser = ProjectUser::where("project_id", $projectId)->where("user_id", $this->user->id)->first();
        if ($projectUser == null) {
            if ($this->user->role == 2) {
                $projectUser = new ProjectUser();
                $projectUser->user_id = $this->user->id;
                $projectUser->project_id = $projectId;
                $projectUser->role = 1;
                $projectUser->save();
            } else {
                return $this->respondErrorWithStatus("You are not belonging to this project ");
            }

        }

        return $this->respondSuccessWithStatus([
            "setting" => $projectUser->setting
        ]);
    }

    public function taskAvailableMembers($taskId)
    {
        $task = Task::find($taskId);
        if (is_null($task)) {
            return $this->respondErrorWithStatus("Công việc với id này không tồn tại");
        }
        $card = $task->taskList->card;
        if ($card) {
//            $project = $card->board->project;
            $this->memberTransformer->setCard($card);
            $this->memberTransformer->setProject(null);
            $members = $this->memberTransformer->transformCollection($card->assignees);
        } else {
            $this->memberTransformer->setCard(null);
            $this->memberTransformer->setProject(null);
            $members = User::where("role", ">", 0)->get();
            $members = $this->memberTransformer->transformCollection($members);
        }


        return $this->respondSuccessWithStatus(["members" => $members]);

    }

    public function addMemberToTask($taskId, Request $request)
    {
        $task = Task::find($taskId);
        if (is_null($task)) {
            return $this->respondErrorWithStatus("Công việc với id này không tồn tại");
        }
        $members = json_decode($request->members);
        $this->taskRepository->addMemberToTask($task, $members, $this->user);
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function saveTaskDeadline($taskId, Request $request)
    {
        $task = Task::find($taskId);
        if (is_null($task)) {
            return $this->respondErrorWithStatus("Công việc với id này không tồn tại");
        }
        $task = $this->taskRepository->saveTaskDeadline($task, $request->deadline, $this->user);
        return $this->respondSuccessWithStatus(["task" => $task->transform()]);
    }

    public function saveTaskSpan($taskId, Request $request)
    {
        $task = Task::find($taskId);
        $span = $request->span;
        if (is_null($task)) {
            return $this->respondErrorWithStatus("Công việc với id này không tồn tại");
        }

        $task->span = $span;
        $task->save();

        return $this->respondSuccessWithStatus(["task" => $task->transform()]);
    }

    public function putStartBoard($projectId, $boardId)
    {
        $project = Project::find($projectId);
        if (is_null($project)) {
            return $this->respondErrorWithStatus("Dự án với id này không tồn tại");
        }
        $boards = $project->boards;
        foreach ($boards as $board) {
            if ($board->id == $boardId) {
                $board->is_start = true;
                $board->save();
            } else {
                $board->is_start = false;
                $board->save();
            }
        }

        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function editTaskName($taskId, Request $request)
    {
        $task = Task::find($taskId);
        if ($task == null) {
            return $this->respondErrorWithStatus("Công việc không tồn tại");
        }

        $task->title = $request->title;
        $task->save();

        return $this->respondSuccessWithStatus(["task" => $task->transform()]);
    }

    public function loadAllTaskListTemplates($projectId)
    {
        $project = Project::find($projectId);
        if ($project == null) {
            return $this->respondErrorWithStatus("Dự án không tồn tại");
        }

        $taskListTemplates = TaskList::where("card_id", 0)->where("type", $project->status)->get()->map(function ($taskList) {
            return $taskList->transformWithOrderedTasks();
        });
        return $this->respondSuccessWithStatus([
            "task_template_templates" => $taskListTemplates
        ]);
    }

    public function getTasklistPropertyItems($taskListId)
    {
        $taskList = TaskList::find($taskListId);
        $task = $taskList->tasks()->orderBy("order")->first();
        return $this->respondSuccessWithStatus([
            "good_property_items" => $task->goodPropertyItems->map(function ($item) {
                return $item->transform();
            })
        ]);
    }

}
