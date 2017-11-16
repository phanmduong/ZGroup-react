<?php

namespace Modules\Book\Http\Controllers;

use App\Board;
use App\Http\Controllers\ManageApiController;
use App\Project;
use App\Task;
use Illuminate\Http\Request;
use Modules\Task\Entities\TaskList;
use Modules\Task\Repositories\ProjectRepository;

class BookController extends ManageApiController
{
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        parent::__construct();
        $this->projectRepository = $projectRepository;
    }

    public function taskListTemplates(Request $request)
    {
        $type = $request->type;
        $taskListTemplates = TaskList::where("card_id", 0);
        if ($type) {
            $taskListTemplates = $taskListTemplates->where("type", $type);
        }
        $taskListTemplates = $taskListTemplates->where("title", "like", "%$request->q%")->orderBy("title")->paginate(20);
        return $this->respondWithPagination($taskListTemplates, [
            "templates" => $taskListTemplates->map(function ($item) {
                return $item->transform();
            })]);
    }

    public function getTaskListTemplateSetting($taskListTemplateId)
    {
        $taskListTemplate = TaskList::find($taskListTemplateId);
        $type = $taskListTemplate->type;
        $project = Project::where("status", $type)->first();
        if ($project == null) {
            return $this->respondErrorWithStatus("Không tìm thấy dự án sản xuất");
        }
        $boards = $project->boards()
            ->where("status", "open")
            ->orderBy("order")->get()->map(function ($board) use ($taskListTemplate) {
                return $board->transformWithTaskList($taskListTemplate);
            });
        return $this->respondSuccessWithStatus([
            "boards" => $boards
        ]);
    }

    public function getAllTaskListTemplates()
    {
        $taskListTemplates = TaskList::where("card_id", 0)->orderBy("title")->get();
        return $this->respondSuccessWithStatus(
            [
                "templates" => $taskListTemplates->map(function ($item) {
                    return [
                        "id" => $item->id,
                        "title" => $item->title,
                        "tasks" => $item->tasks->map(function ($task) {
                            return $task->transform();
                        })
                    ];
                })
            ]
        );
    }

    public function storeTaskListTasks($taskListTemplateId, Request $request)
    {
        $boards = collect(json_decode($request->boards))->filter(function ($board) {
            return $board->checked;
        });
        $boardIds = $boards->map(function ($board) {
            return $board->id;
        })->toArray();

        $taskListTemplate = TaskList::find($taskListTemplateId);

        $taskListTemplate->tasks()->whereNotIn('current_board_id', $boardIds)->delete();

        $tasks = $taskListTemplate->tasks()->orderBy("order")->get();

        $currentBoardIds = $tasks->pluck("current_board_id")->toArray();

        foreach ($boards as $board) {
            if (!in_array($board->id, $currentBoardIds) && in_array($board->id, $boardIds)) {
                $task = new Task();
                $task->title = $board->title;
                $task->task_list_id = $taskListTemplateId;
                $task->status = 0;
                $task->current_board_id = $board->id;
                $task->order = $board->order;
                $task->creator_id = $this->user->id;
                $task->editor_id = $this->user->id;
                $task->task_template_id = 0;
                $task->save();
            }
        }

        $tasks = $taskListTemplate->tasks()->orderBy("order")->get();
        $count = count($tasks);
        for ($i = 0; $i < $count - 1; $i += 1) {
            $task = $tasks->get($i);
            $nextTask = $tasks->get($i + 1);
            $task->target_board_id = $nextTask->current_board_id;
            $task->save();
        }

//        $boards =
//            transformWithOrderedTasks
        return $this->respondSuccessWithStatus([
            "task_list_template" => $taskListTemplate->transformWithOrderedTasks()
        ]);
    }

    public function storeTaskList(Request $request)
    {
        if (is_null($request->title)) {
            return $this->respondErrorWithStatus("cần truyền lên title");
        }
        if ($request->id) {
            $taskList = TaskList::find($request->id);
        } else {
            $taskList = new TaskList();
        }
        $taskList->title = $request->title;
        $taskList->type = $request->type;
        $taskList->save();
        return $this->respondSuccessWithStatus(["taskList" => $taskList->transform()]);
    }

    public function bookProject($type)
    {
        $project = Project::where("status", $type)->first();
        if (is_null($project)) {
            return $this->respondErrorWithStatus("Dự án sản xuất chưa được tạo");
        }
        $data = $this->projectRepository->loadProjectBoards($project, $this->user);
        return $this->respond($data);
    }
}
