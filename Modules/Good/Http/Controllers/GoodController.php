<?php

namespace Modules\Good\Http\Controllers;

use App\Good;
use App\DeletedGood;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\Manufacture;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;
use Modules\Good\Repositories\GoodRepository;


class GoodController extends ManageApiController
{
    private $goodRepository;

    public function __construct(GoodRepository $goodRepository)
    {
        $this->goodRepository = $goodRepository;
        parent::__construct();
    }


    public function getGoodsWithoutPagination(Request $request)
    {
        if ($request->type) {
            $goods = Good::where("type", $request->type)->get()->map(function ($good) {
                return $good->transform();
            });
        } else {
            $goods = Good::all()->map(function ($good) {
                return $good->transform();
            });
        }

        return $this->respondSuccessWithStatus([
            "goods" => $goods
        ]);
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

    public function saveGoodProperties($id, Request $request)
    {
        $goodProperties = collect(json_decode($request->good_properties));

        $this->goodRepository->saveGoodProperties($goodProperties, $id);

        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function createGood(Request $request)
    {
        $name = $request->name;
        $code = $request->code;
        $description = $request->description;
        $price = $request->price;
        $avatarUrl = $request->avatar_url;
        $coverUrl = $request->cover_url;

        if (is_null("name") && is_null("code")) {
            return $this->respondErrorWithStatus("Sản phẩm cần có: name, code");
        }

        $id = $request->id;
        if ($id) {
            $good = Good::find($id);
        } else {
            $good = new Good();
        }
        $good->name = $name;
        $good->code = $code;
        $good->description = $description;
        $good->price = $price;
        $good->avatar_url = $avatarUrl;
        $good->cover_url = $coverUrl;
        if ($request->type) {
            $good->type = $request->type;
        }
        $good->save();

//        $properties = json_decode($request->properties);

        $properties = json_decode($request->properties);

        DB::table('good_properties')->where('good_id', '=', $good->id)->delete();

        foreach ($properties as $p) {
            $property = new GoodProperty();
            $property->name = $p->name;
            $property->value = $p->value;
            $property->creator_id = $this->user->id;
            $property->editor_id = $this->user->id;
            $property->good_id = $good->id;
            $property->save();
        }

        $files = json_decode($request->files_str);

        foreach ($files as $file) {
            if (!$good->files->contains($file->id)) {
                $good->files()->attach($file->id);
            }
        }

        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function good($goodId)
    {
        $good = Good::find($goodId);

        return $this->respondSuccessWithStatus([
            "good" => $good->goodProcessTransform()
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

        if ($limit > 0) {
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
            return $this->respondSuccessWithStatus([
                "good_property_items" => $goodPropertyItems->get()->map(function ($goodPropertyItem) {
                    return $goodPropertyItem->transform();
                })
            ]);
        }


    }

    public function deletePropertyItem($property_item_id, Request $request)
    {
        $goodPropertyItem = GoodPropertyItem::find($property_item_id);
        $goodPropertyItem->delete();
        return $this->respondSuccessWithStatus([
            'message' => "success"
        ]);
    }

    public function addPropertyItemsTask($task_id, Request $request)
    {
        $goodPropertyItems = json_decode($request->good_property_items);
        $task = Task::find($task_id);
        $task->current_board_id = $request->current_board_id;
        $task->target_board_id = $request->target_board_id;
        $task->goodPropertyItems()->detach();
        $task->goodPropertyItems()->attach(collect($goodPropertyItems)->pluck("id")->toArray());
        $task->save();

        return $this->respondSuccessWithStatus([
            'task' => $task->transform()
        ]);
    }

    public function getPropertyItems(Request $request)
    {
        $type = $request->type;
        $propertyItems = $this->goodRepository->getPropertyItems($type);
        $boards = $this->goodRepository->getProjectBoards($type);

        return $this->respondSuccessWithStatus([
            "good_property_items" => $propertyItems,
            "boards" => $boards
        ]);
    }

    public function getAllGoods(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $type = $request->type;
        $manufacture_id = $request->manufacture_id;
        $good_category_id = $request->good_category_id;
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        $status = $request->status;

        if ($limit == -1) {
            if ($type) {
                $goods = Good::where('type', $type)->where(function ($query) use ($keyword) {
                    $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
                });
            } else {
                $goods = Good::where(function ($query) use ($keyword) {
                    $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
                });
            }
            $goods = $goods->orderBy("created_at", "desc")->limit(20)->get();
            return $this->respondSuccessWithStatus([
                'goods' => $goods->map(function ($good) {
                    return $good->transform();
                })
            ]);
        }
        if ($status) {
            if ($status == 'deleted') {
                $goods = DeletedGood::where('status', 'deleted');
                $goods->where(function ($query) use ($keyword) {
                    $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
                });
                if ($type)
                    $goods = $goods->where("type", $type);
                if ($manufacture_id)
                    $goods = $goods->where('manufacture_id', $manufacture_id);
                if ($good_category_id)
                    $goods = $goods->where('good_category_id', $good_category_id);
                if ($startTime)
                    $goods = $goods->whereBetween('created_at', array($startTime, $endTime));
                $goods = $goods->orderBy("created_at", "desc")->paginate($limit);
                return $this->respondWithPagination(
                    $goods,
                    [
                        "goods" => $goods->map(function ($good) {
                            return $good->transform();
                        })
                    ]
                );
            } else
                $goods = Good::where('status', $status);

            $goods = $goods->where(function ($query) use ($keyword) {
                $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
            });
        } else
            $goods = Good::where(function ($query) use ($keyword) {
                $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
            });

        if ($type)
            $goods = $goods->where("type", $type);
        if ($manufacture_id)
            $goods = $goods->where('manufacture_id', $manufacture_id);
        if ($good_category_id)
            $goods = $goods->where('good_category_id', $good_category_id);
        if ($startTime)
            $goods = $goods->whereBetween('created_at', array($startTime, $endTime));
        $goods = $goods->orderBy("created_at", "desc")->paginate($limit);
        return $this->respondWithPagination(
            $goods,
            [
                "goods" => $goods->map(function ($good) {
                    return $good->transform();
                })
            ]
        );
    }

    public function goodsByStatus(Request $request)
    {
        $status = $request->status;
        $limit = $request->limit ? $request->limit : 20;
        if ($status == null)
            return $this->respondErrorWithStatus([
                'message' => 'status null'
            ]);
        if ($status == 'deleted')
            $goods = DB::table('goods')->where('status', 'deleted')->paginate($limit);
        else
            $goods = Good::where('status', $status)->orderBy("created_at", "desc")->paginate($limit);
        return $this->respondWithPagination(
            $goods,
            [
                "goods" => $goods->map(function ($good) {
                    return $good->transform();
                })
            ]
        );
    }

    public function statusCount()
    {
        $total = Good::all()->count();
        $for_sale = Good::where('status', 'for_sale')->count();
        $not_for_sale = Good::where('status', 'not_for_sale')->count();
        $deleted = DB::table('goods')->where('status', 'deleted')->count();
        $show = Good::where('status', 'show')->count();
        $not_show = Good::where('status', 'not_show')->count();

        $goods = Good::orderBy('created_at', 'desc')->get();

        $total_quantity = $goods->reduce(function ($total_q, $good) {
            return $total_q + $good->importedGoods->reduce(function ($tota_good_q, $importedGood) {
                    return $tota_good_q + $importedGood->quantity;
                }, 0);
        }, 0);

        return $this->respondSuccessWithStatus([
            'total' => $total,
            'total_quantity' => $total_quantity,
            'for_sale' => $for_sale,
            'not_for_sale' => $not_for_sale,
            'deleted' => $deleted,
            'show' => $show,
            'not_show' => $not_show,

        ]);
    }

    function editGood($goodId, Request $request)
    {
        $good = Good::find($goodId);
        if ($good == null)
            return $this->respondErrorWithData([
                "message" => "Không tìm thấy sản phẩm"
            ]);
        if (!$request->price || !$request->name || !$request->manufacture_id || !$request->good_category_id)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu trường'
            ]);
        $good->name = $request->name;
        $good->avatar_url = $request->avatar_url;
        $good->price = $request->price;
        $good->manufacture_id = $request->manufacture_id;
        $good->good_category_id = $request->good_category_id;
        $good->status = $request->status;
        $good->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deleteGood($good_id, Request $request)
    {
        $good = Good::find($good_id);
        if ($good == null)
            return $this->respondSuccessWithStatus([
                "message" => "Không tìm thấy sản phẩm"
            ]);
        $good->status = 'deleted';
        $good->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xóa sản phẩm thành công"
        ]);
    }

    public function updatePrice($goodId, Request $request)
    {
        $good = Good::find($goodId);
        if (!$good)
            return $this->respondErrorWithStatus([
                'message' => 'khong co san pham'
            ]);
        if (!$request->price)
            return $this->respondErrorWithStatus([
                'message' => 'thieu gia'
            ]);
        $good->price = $request->price;
        $good->save();
        return $this->respondSuccessWithStatus([
            'message' => 'ok',
        ]);
    }

    public function allManufactures()
    {
        $manufactures = Manufacture::orderBy("created_at", "desc")->get();
        return $this->respondSuccessWithStatus([
            'manufactures' => $manufactures->map(function ($manufacture) {
                return [
                    'id' => $manufacture->id,
                    'name' => $manufacture->name,
                ];
            })
        ]);
    }

    public function createChildGood($goodId, Request $request)
    {
        if ($request->code == null || $request->taskId == null) {
            return $this->respondErrorWithStatus("Thiếu code hoặc taskId");
        }
        $currentGood = Good::where("code", $request->code)->first();
        if ($currentGood != null) {
            return $this->respondErrorWithStatus("Sản phẩm với mã này đã tồn tại");
        }

        $parentGood = Good::find($goodId);

        $good = $parentGood->replicate();
        $good->parent_id = $goodId;
        $good->code = $request->code;
        $good->name = $request->name;
        $good->good_category_id = $parentGood->good_category_id;
        $good->save();


        foreach ($parentGood->properties as $property) {
            $childProperty = $property->replicate();
            $childProperty->good_id = $good->id;
            $childProperty->save();
        }

        $parentTask = Task::find($request->taskId);

        $taskList = $parentTask->taskList;

        $newTaskList = $taskList->replicate();
        $newTaskList->save();

        foreach ($taskList->tasks as $task) {
            $newTask = $task->replicate();
            $newTask->task_list_id = $newTaskList->id;
            if ($task->order < $parentTask->order) {
                $newTask->status = true;
            } else {
                $newTask->status = false;
            }
            $newTask->save();
        }

        $card = $parentGood->cards()->first();
        if ($card == null) {
            return $this->respondErrorWithStatus("Không tìm thấy thẻ của sản phẩm cha");
        } else {
            $card = $card->replicate();
            $card->good_id = $good->id;
            $card->board_id = $parentTask->current_board_id;
            $card->title = $good->name;
            $card->save();
        }

        $newTaskList->card_id = $card->id;
        $newTaskList->save();


        return $this->respondSuccessWithStatus([
            "card" => $card->transform()
        ]);
    }

    public function allInventories(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $good_category_id = $request->category_id;
        $manufacture_id = $request->manufacture_id;
        $keyword = $request->search;

        $inventories = ImportedGoods::where('quantity', '<>', 0);
        if ($keyword) {
            $goodIds = Good::where(function ($query) use ($keyword) {
                $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
            })->select('id')->get();
            $inventories = $inventories->whereIn('good_id', $goodIds);
        }

        if ($manufacture_id) {
            $goodIds = Good::where('manufacture_id', $manufacture_id)->select('id')->get();
            $inventories = $inventories->whereIn('good_id', $goodIds);
        }
        dd($good_category_id);
        if ($good_category_id) {
            $goodIds = Good::where('good_category_id', $good_category_id)->select('id')->get();
            $inventories = $inventories->whereIn('good_id', $goodIds);
        }

        $inventories = $inventories->paginate($limit);
        return $this->respondWithPagination(
            $inventories,
            [
                'inventories' => $inventories->map(function ($inventory) {
                    $data = [
                        'id' => $inventory->id,
                        'code' => $inventory->good->code,
                        'name' => $inventory->good->name,
                        'quantity' => $inventory->quantity,
                        'import_price' => $inventory->import_price,
                        'import_money' => $inventory->import_price * $inventory->quantity,
                        'price' => $inventory->good->price,
                        'money' => $inventory->good->price * $inventory->quantity
                    ];
                    return $data;
                })
            ]
        );
    }

    public function inventoriesInfo(Request $request)
    {
        $inventories = ImportedGoods::where('quantity', '<>', 0)->get();
        $count = $inventories->reduce(function ($total, $inventory) {
            return $total + $inventory->quantity;
        }, 0);
        $total_import_money = $inventories->reduce(function ($total, $inventory) {
            return $total + $inventory->quantity * $inventory->import_price;
        }, 0);
        $total_money = $inventories->reduce(function ($total, $inventory) {
            return $total + $inventory->quantity * $inventory->good->price;
        }, 0);
        return $this->respondSuccessWithStatus([
            'count' => $count,
            'total_import_money' => $total_import_money,
            'total_money' => $total_money,
        ]);
    }

    public function historyGoods($importedGoodId, Request $request)
    {
        if (ImportedGoods::find($importedGoodId) == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-existing good'
            ]);
        $history = HistoryGood::where('imported_good_id', $importedGoodId)->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            'history' => $history->map(function ($singular_history) {
                return [
                    'code' => $singular_history->good->code,
                    'note' => $singular_history->note,
                    'type' => $singular_history->type,
                    'created_at' => format_vn_short_datetime(strtotime($singular_history->created_at)),
                    'import_quantity' => $singular_history->quantity * ($singular_history->type == 'import'),
                    'export_quantity' => $singular_history->quantity * ($singular_history->type == 'order'),
                    'remain' => $singular_history->remain,
                ];
            })
        ]);
    }
}




