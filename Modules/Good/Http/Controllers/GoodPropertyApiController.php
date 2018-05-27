<?php

namespace Modules\Good\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Task;
use Illuminate\Http\Request;
use Modules\Good\Entities\BoardTaskTaskList;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;
use Modules\Good\Repositories\GoodRepository;

class GoodPropertyApiController extends ManageApiController
{
    protected $goodRepository;

    public function __construct(GoodRepository $goodRepository)
    {
        parent::__construct();
        $this->goodRepository = $goodRepository;
    }

    public function allPropertyItems(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $goodPropertyItems = GoodPropertyItem::query();

        if ($request->type) {
            $goodPropertyItems = $goodPropertyItems->where('type', $request->type);
        }
        $goodPropertyItems = $goodPropertyItems->where('name', 'like', '%' . $keyword . '%');

        if ($limit == -1) {
            $goodPropertyItems = $goodPropertyItems->orderBy('created_at', 'desc')->get();
            return $this->respond([
                'good_property_items' => $goodPropertyItems->map(function ($goodPropertyItem) {
                    return $goodPropertyItem->transform();
                })
            ]);
        }
        $goodPropertyItems = $goodPropertyItems->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination(
            $goodPropertyItems,
            [
                'good_property_items' => $goodPropertyItems->map(function ($goodPropertyItem) {
                    return $goodPropertyItem->transform();
                })
            ]
        );
    }

    public function getGoodPropertyItem($id)
    {
        $goodPropertyItem = GoodPropertyItem::find($id);
        if ($goodPropertyItem == null) {
            return $this->respondErrorWithStatus('Thuộc tính không tồn tại');
        }
        return $this->respondSuccessWithStatus(['good_property_item' => $goodPropertyItem->transform()]);
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
        $goodProperty = GoodProperty::where('property_item_id', $property_item_id)->first();
        if ($goodProperty) {
            return $this->respondErrorWithStatus(
                'Thuộc tính có sản phẩm xử dụng không xóa'
            );
        }

        $goodPropertyItem = GoodPropertyItem::find($property_item_id);

        $propertyItemTasks = $goodPropertyItem->propertyItemTasks;

        foreach ($propertyItemTasks as $propertyItemTask) {
            $propertyItemTask->delete();
        }

        $goodPropertyItem->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'success'
        ]);
    }

    public function duplicateProperty($propertyId)
    {
        $property = GoodPropertyItem::find($propertyId);
        if ($property == null) {
            return $this->respondErrorWithStatus();
        }
        $newProperty = $property->replicate();
        $newProperty->save();

        return $this->respondSuccessV2([
            'property' => $newProperty
        ]);
    }

    public function createGoodPropertyItem(Request $request)
    {
        if ($request->name == null) {
            return $this->respondErrorWithStatus('Thiếu trường name');
        }

        $goodPropertyItem = GoodPropertyItem::where('name', $request->name)->where('type', $request->type)->first();
        $user = $this->user;
        if ($request->id) {
            if ($goodPropertyItem != null && $goodPropertyItem->id != $request->id) {
                return $this->respondErrorWithStatus('Đã tồn tại thuộc tính với tên là ' . $request->name);
            }
            $good_property_item = GoodPropertyItem::find($request->id);
            $good_property_item->editor_id = $user->id;
        } else {
            if ($goodPropertyItem != null) {
                return $this->respondErrorWithStatus('Đã tồn tại thuộc tính với tên là ' . $request->name);
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
        return $this->respondSuccessWithStatus([
            'id' => $good_property_item->id,
            'name' => $good_property_item->name
        ]);
    }

    public function addPropertyItemsTask($task_id, Request $request)
    {
        $goodPropertyItems = json_decode($request->good_property_items);
        $selectedBoards = json_decode($request->selected_boards);

        $task = Task::find($task_id);
        $task->current_board_id = $request->current_board_id;
        $task->goodPropertyItems()->detach();

        foreach ($goodPropertyItems as $item) {
            $task->goodPropertyItems()->attach($item->id, ['order' => $item->order]);
        }

        $task->save();

        if ($task == null) {
            return $this->respondErrorWithStatus('Công việc không tồn tại');
        }

        BoardTaskTaskList::where('task_id', $task_id)->delete();

        foreach ($selectedBoards as $selectedBoard) {
            $boardTaskTaskList = new BoardTaskTaskList();
            $boardTaskTaskList->board_id = $selectedBoard->id;
            $boardTaskTaskList->task_id = $task_id;
            $boardTaskTaskList->save();
        }

        return $this->respondSuccessWithStatus([
            'task' => $task->transform()
        ]);
    }

    public function saveGoodProperties($id, Request $request)
    {
        $goodProperties = collect(json_decode($request->good_properties));

        $this->goodRepository->saveGoodProperties($goodProperties, $id);

        return $this->respondSuccessWithStatus(['message' => 'success']);
    }

    public function loadGoodTaskProperties($goodId, $taskId)
    {
        $task = Task::find($taskId);
        $goodPropertyNames = $task->goodPropertyItems->pluck('name');
        $goodProperties = GoodProperty::where('good_id', $goodId)->whereIn('name', $goodPropertyNames)->get();
        return $this->respondSuccessWithStatus([
            'good_properties' => $goodProperties->map(function ($goodProperty) {
                return [
                    'name' => $goodProperty->name,
                    'value' => $goodProperty->value
                ];
            })
        ]);
    }
}
