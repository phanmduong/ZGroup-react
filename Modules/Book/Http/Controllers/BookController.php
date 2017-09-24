<?php

namespace Modules\Book\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Modules\Task\Entities\TaskList;

class BookController extends ManageApiController
{
    public function taskListTemplates()
    {
        $taskListTemplates = TaskList::where("card_id", 0)->paginate(20);
        return $this->respondWithPagination($taskListTemplates, [
            "templates" => $taskListTemplates->map(function ($item) {
                return [
                    "id" => $item->id,
                    "title" => $item->title,
                    "tasks" => $item->tasks->map(function ($task) {
                        return $task->transform();
                    })
                ];
            })]);
    }

    public function storeTaskList(Request $request)
    {
        if (is_null($request->title)) {
            return $this->respondErrorWithStatus("cần truyền lên title");
        }
        $taskList = new TaskList();
        $taskList->title = $request->title;
        $taskList->save();
        return $this->respondSuccessWithStatus(["taskList" => $taskList->transform()]);
    }
}
