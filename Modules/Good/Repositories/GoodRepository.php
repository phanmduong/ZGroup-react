<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 10/11/17
 * Time: 2:43 PM
 */

namespace Modules\Good\Repositories;


use App\Project;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;
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

    public function getPropertyItems($type)
    {
        $order = 0;
        $goodPropertyItems = GoodPropertyItem::where("type", $type)
            ->orderBy("name")->get()->map(function ($item) use ($order) {
                return [
                    "label" => $item->name,
                    "value" => $item->name,
                    "id" => $item->id,
                    "order" => 0
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
        $boardIds = $taskList->tasks()->where("id", "!=", $task->id)->pluck('current_board_id');
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