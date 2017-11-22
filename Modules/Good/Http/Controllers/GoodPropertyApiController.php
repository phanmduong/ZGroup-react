<?php

namespace Modules\Good\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Task;
use Illuminate\Http\Request;
use Modules\Good\Entities\BoardTaskTaskList;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;
use Modules\Task\Entities\TaskList;

class GoodPropertyApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allPropertyItems(Request $request)
    {
        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 20;
        }
        $keyword = $request->search;
        if ($request->type)
            $goodPropertyItems = GoodPropertyItem::where("type", $request->type)
                ->where(function ($query) use ($keyword) {

                    $query->where("name", "like", "%$keyword%")
                        ->orWhere("prevalue", "like", "%$keyword%")
                        ->orWhere("preunit", "like", "%$keyword%");
                })->orderBy("created_at", "desc");
        else
            $goodPropertyItems = GoodPropertyItem::where(function ($query) use ($keyword) {
                $query->where("prevalue", "like", "%$keyword%")->orWhere("preunit", "like", "%$keyword%");
            })->orderBy("created_at", "desc");


        if ($limit > 0 && $request->page > 0) {
            $goodPropertyItems = $goodPropertyItems->paginate($limit);
            return $this->respondWithPagination(
                $goodPropertyItems,
                [
                    "good_property_items" => $goodPropertyItems->map(function ($goodPropertyItem) {
                        return $goodPropertyItem->transform();
                    })
                ]
            );
        } else {
            return $this->respond([
                "good_property_items" => $goodPropertyItems->get()->map(function ($goodPropertyItem) {
                    return $goodPropertyItem->transform();
                })
            ]);
        }
    }

    public function getGoodPropertyItem($id)
    {
        $goodPropertyItem = GoodPropertyItem::find($id);
        if ($goodPropertyItem == null) {
            return $this->respondErrorWithStatus("Thuộc tính không tồn tại");
        }
        return $this->respondSuccessWithStatus(["good_property_item" => $goodPropertyItem->transform()]);
    }

    public function propertiesOfGood($good_id)
    {
        $goodProperties = GoodProperty::where('good_id', $good_id);
        return $this->respondSuccessWithStatus([
            'properties' => $goodProperties,
        ]);
    }

    public function deletePropertyItem($property_item_id, Request $request)
    {
        $goodPropertyItem = GoodPropertyItem::find($property_item_id);
        $goodPropertyItem->delete();
        return $this->respondSuccessWithStatus([
            'message' => "success"
        ]);
    }

    public function createGoodPropertyItem(Request $request)
    {
        if ($request->name == null)
            return $this->respondErrorWithStatus("Thiếu trường name");

        $goodPropertyItem = GoodPropertyItem::where("name", $request->name)->where("type", $request->type)->first();
        $user = $this->user;
        if ($request->id) {
            if ($goodPropertyItem != null && $goodPropertyItem->id != $request->id) {
                return $this->respondErrorWithStatus("Đã tồn tại thuộc tính với tên là " . $request->name);
            }
            $good_property_item = GoodPropertyItem::find($request->id);
            $good_property_item->editor_id = $user->id;
        } else {
            if ($goodPropertyItem != null) {
                return $this->respondErrorWithStatus("Đã tồn tại thuộc tính với tên là " . $request->name);
            }
            $good_property_item = new GoodPropertyItem();
            $good_property_item->creator_id = $user->id;
            $good_property_item->editor_id = $user->id;
        }
        $good_property_item->name = $request->name;
        $good_property_item->prevalue = $request->prevalue;
        $good_property_item->preunit = $request->preunit;
        $good_property_item->type = $request->type;
        $good_property_item->save();
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function addPropertyItemsTask($task_id, Request $request)
    {
        $goodPropertyItems = json_decode($request->good_property_items);
        $selectedProcesses = json_decode($request->selected_processes);

        $task = Task::find($task_id);
        $task->current_board_id = $request->current_board_id;
        $task->target_board_id = $request->target_board_id;
        $task->goodPropertyItems()->detach();
        foreach ($goodPropertyItems as $item) {
            $task->goodPropertyItems()->attach($item->id, ['order' => $item->order]);
        }

        $task->save();

        if ($task == null) {
            return $this->respondErrorWithStatus("Công việc không tồn tại");
        }

        BoardTaskTaskList::where("task_id", $task_id)->delete();

        foreach ($selectedProcesses as $selectedProcess) {
            $boardTaskTaskList = new BoardTaskTaskList();
            $taskList = TaskList::find($selectedProcess->id);
            $task = $taskList->tasks()->first();
            if ($task) {
                $boardTaskTaskList->board_id = $task->current_board_id;
                $boardTaskTaskList->task_list_id = $selectedProcess->id;
                $boardTaskTaskList->task_id = $task_id;
                $boardTaskTaskList->save();
            }

        }

        return $this->respondSuccessWithStatus([
            'task' => $task->transform()
        ]);
    }

    public function saveGoodProperties($id, Request $request)
    {
        $goodProperties = collect(json_decode($request->good_properties));

        $this->goodRepository->saveGoodProperties($goodProperties, $id);

        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function loadGoodTaskProperties($goodId, $taskId)
    {
        $task = Task::find($taskId);
        $goodPropertyNames = $task->goodPropertyItems->pluck("name");
        $goodProperties = GoodProperty::where("good_id", $goodId)->whereIn("name", $goodPropertyNames)->get();
        return $this->respondSuccessWithStatus([
            "good_properties" => $goodProperties->map(function ($goodProperty) {
                return [
                    "name" => $goodProperty->name,
                    "value" => $goodProperty->value
                ];
            })
        ]);
    }
}