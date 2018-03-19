<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 10/11/17
 * Time: 2:43 PM
 */

namespace Modules\Good\Repositories;


use App\Project;
use App\Task;
use Modules\Good\Entities\BoardTaskTaskList;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;
use Modules\Good\Entities\GoodPropertyItemTask;
use Modules\Task\Entities\TaskList;

class GoodRepository
{
    public function getProcesses($type)
    {
        $taskListTemplates = TaskList::where("card_id", 0)->where("type", $type)->orderBy("title")->get();
        return $taskListTemplates->map(function ($item) {
            return $item->transform();
        });
    }

    public function getPropertyItems($type, $task)
    {
        $goodPropertyItemIds = GoodPropertyItemTask::select("good_property_item_task.*")->join('tasks', 'tasks.id', '=', 'good_property_item_task.task_id')
            ->where("tasks.task_list_id", $task->task_list_id)->pluck("good_property_item_id");

        $goodPropertyItems = GoodPropertyItem::where("type", $type)
            ->whereNotIn("id", $goodPropertyItemIds)
            ->orderBy("name")->get()->map(function ($item) use ($task) {
                $goodPropertyItemTask = GoodPropertyItemTask::where("good_property_item_id", $item->id)
                    ->where("task_id", $task->id)->first();
                return [
                    "name" => $item->name,
                    "label" => $item->name,
                    "value" => $item->id,
                    "id" => $item->id,
                    "order" => $goodPropertyItemTask ? $goodPropertyItemTask->order : 0
                ];
            });
        return $goodPropertyItems;
    }

    public function getProjectBoards($type, $task)
    {
        $project = Project::where("status", $type)->first();
        $taskList = $task->taskList;
        if ($taskList == null) {
            return [];
        }
        $taskIds = $taskList->tasks()->pluck("id");

        $notIncludedBoardIds = BoardTaskTaskList::whereIn("task_id", $taskIds)->pluck("board_id");

        $boardIds = $taskList->tasks()->where("id", "!=", $task->id)
            ->whereNotIn("current_board_id", $notIncludedBoardIds)
            ->pluck('current_board_id');


        return $project->boards()
            ->where("status", "open")
            ->whereIn("id", $boardIds)
            ->get()->map(function ($board) {
                return [
                    "id" => $board->id,
                    "title" => $board->title,
                    "label" => $board->title,
                    "value" => $board->id
                ];
            });
    }

    public function saveGoodProperties($goodProperties, $goodId)
    {


        foreach ($goodProperties as $property) {
            GoodProperty::where("good_id", $goodId)->where("name", $property->name)->delete();
            $goodProperty = new GoodProperty();
            $goodProperty->name = $property->name;
            $goodProperty->value = $property->value;
            $goodProperty->good_id = $goodId;
            $goodProperty->save();
        }
    }
}