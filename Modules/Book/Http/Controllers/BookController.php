<?php

namespace Modules\Book\Http\Controllers;

use App\Board;
use App\Http\Controllers\ManageApiController;
use App\Project;
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
