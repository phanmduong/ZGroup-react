<?php

namespace Modules\Good\Http\Controllers;

use App\Good;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\Manufacture;
use App\Warehouse;
use Illuminate\Http\Request;

class InventoryApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
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

    public function statusCount()
    {
        $total = Good::all()->count();

        $for_sale = Good::where('sale_status', 1)->count();
        $not_for_sale = Good::where('sale_status', 0)->count();

        $display_on = Good::where('display_status', 1)->count();
        $display_off = Good::where('display_status', 0)->count();

        $highlight_on = Good::where('highlight_status', 1)->count();
        $highlight_off = Good::where('highlight_status', 0)->count();

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
            'display_on' => $display_on,
            'display_off' => $display_off,
            'highlight_on' => $highlight_on,
            'highlight_off' => $highlight_off

        ]);
    }

    public function allInventories(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $good_category_id = $request->good_category_id;
        $manufacture_id = $request->manufacture_id;
        $keyword = $request->search;
        $warehouse_id = $request->warehouse_id;

//        if ($warehouse_id == null) {
//            $goods = Good::where(function ($query) use ($keyword) {
//                $query->where("name", "like", "%$keyword%")->orWhere("code", "like", "%$keyword%");
//            });
//            if ($good_category_id)
//                $goods = $goods->where('good_category_id', $good_category_id);
//            if ($manufacture_id)
//                $goods = $goods->where('manufacture_id', $manufacture_id);
//            $goods = $goods->paginate($limit);
//            return $this->respondWithPagination(
//                $goods,
//                [
//                    'inventories' => $goods->map(function ($goods){
//                        $quantity = $goods->importedGoods->reduce(function ($total, $importedGood){
//                            return $total + $importedGood->quantity;
//                        }, 0);
//                        $data = [
//                            'code' => $goods->code,
//                            'name' => $goods->name,
//                            'quantity' => $quantity,
//                            'import_price' => $inventory->import_price,
//                            'import_money' => $inventory->import_price * $inventory->quantity,
//                            'price' => $goods->price,
//                            'money' => $goods->price * $inventory->quantity
//                        ];
//                        return $data;
//                    })
//                ]
//            );
//        }

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

    public function historyGoods($goodId, Request $request)
    {
        $warehouses = Warehouse::orderBy('created_at', 'desc')->get();
        $inventories = ImportedGoods::where('good_id', $goodId)->get();
        $total_quantity = $inventories->reduce(function ($total, $inventory) {
            return $total + $inventory->quantity;
        }, 0);
        $total_import_money = $inventories->reduce(function ($total, $inventory) {
            return $total + $inventory->quantity * $inventory->import_price;
        }, 0);
        $total_money = $total_quantity * Good::find($goodId)->price;
        $warehouses = $warehouses->filter(function ($warehouse) use($goodId){
            $importedGoods = ImportedGoods::where('good_id', $goodId)
                ->where('warehouse_id', $warehouse->id)->get();
            $warehouse_quantity = $importedGoods->reduce(function ($total, $inventory) {
                return $total + $inventory->quantity;
            }, 0);
            dd($goodId);
            return $warehouse_quantity > 0;
        });
        return $this->respondSuccessWithStatus([
            'total_quantity' => $total_quantity,
            'total_import_money' => $total_import_money,
            'total_money' => $total_money,
            'warehouses' => $warehouses->map(function ($warehouse) use ($goodId) {

                $importedGoods = ImportedGoods::where('good_id', $goodId)
                    ->where('warehouse_id', $warehouse->id)->get();
                $warehouse_quantity = $importedGoods->reduce(function ($total, $inventory) {
                    return $total + $inventory->quantity;
                }, 0);
                $warehouse_import_money = $importedGoods->reduce(function ($total, $inventory) {
                    return $total + $inventory->quantity * $inventory->import_price;
                }, 0);
                $warehouse_money = $warehouse_quantity * Good::find($goodId)->price;
                $data = [
                    'id' => $warehouse->id,
                    'name' => $warehouse->name,
                    'warehouse_quantity' => $warehouse_quantity,
                    'warehouse_import_money' => $warehouse_import_money,
                    'warehouse_money' => $warehouse_money,
                ];
                $history = HistoryGood::where('good_id', $goodId)->where('warehouse_id', $warehouse->id)->get();
                $data['history'] = $history->map(function ($singular_history) {
                    return [
                        'code' => $singular_history->good->code,
                        'note' => $singular_history->note,
                        'type' => $singular_history->type,
                        'created_at' => format_vn_short_datetime(strtotime($singular_history->created_at)),
                        'import_quantity' => $singular_history->quantity * ($singular_history->type == 'import'),
                        'export_quantity' => $singular_history->quantity * ($singular_history->type == 'order'),
                        'remain' => $singular_history->remain,
                    ];
                });
                return $data;
            })
        ]);

//        $history = HistoryGood::where('imported_good_id', $importedGoodId)->orderBy('created_at', 'desc')->get();
//        return $this->respondSuccessWithStatus([
//            'history' => $history->map(function ($singular_history) {
//                return [
//                    'code' => $singular_history->good->code,
//                    'note' => $singular_history->note,
//                    'type' => $singular_history->type,
//                    'created_at' => format_vn_short_datetime(strtotime($singular_history->created_at)),
//                    'import_quantity' => $singular_history->quantity * ($singular_history->type == 'import'),
//                    'export_quantity' => $singular_history->quantity * ($singular_history->type == 'order'),
//                    'remain' => $singular_history->remain,
//                ];
//            })
//        ]);
    }
}