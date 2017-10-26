<?php

namespace Modules\Order\Http\Controllers;

use App\GoodCategory;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use Illuminate\Http\Request;
use App\Order;


class OrderController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allOrders(Request $request)
    {
        $limit = 3;
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        $status = $request->status;
        $keyWord = $request->search;
        $totalOrders = Order::get()->count();
        $totalMoney = 0;
        $totalPaidMoney = 0;
        $allOrders = Order::get();
        foreach ($allOrders as $order) {
            $goodOrders = $order->goodOrders()->get();
            foreach ($goodOrders as $goodOrder) {
                $totalMoney += $goodOrder->quantity * $goodOrder->price;
            }
        }
        foreach ($allOrders as $order) {
            $orderPaidMoneys = $order->orderPaidMoneys();
            foreach ($orderPaidMoneys as $orderPaidMoney) {
                $totalPaidMoney += $orderPaidMoney->money;
            }
        }
        if ($startTime) {
            if ($status)
                $orders = Order::where('status', $status)->whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
            else
                $orders = Order::whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->where("name", "like", "%$keyWord%")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
        } else {
            if ($status)
                $orders = Order::where('status', $status)->orderBy("created_at", "desc")->where("name", "like", "%$keyWord%")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
            else
                $orders = Order::orderBy("created_at", "desc")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
        }
        return $this->respondWithPagination(
            $orders,
            [
                'total_order' => $totalOrders,
                'total_money' => $totalMoney,
                'total_paid_money' => $totalPaidMoney,
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }

    public function detailedOrder($order_id)
    {
        $order = Order::find($order_id);
        return $this->respondSuccessWithStatus(
            $order->detailedTransform()
        );
    }

    public function editOrder($order_id, Request $request)
    {
        $order = Order::find($order_id);
        if ($request->code == null || $request->staff_id)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu code || staff_id'
            ]);
        $order->note = $request->note;
        $order->code = $request->code;
        $order->staff_id = $request->staff_id;
        $order->user_id = $request->user_id;
        $order->save();
        return $this->respondSuccessWithStatus([
            'message' => 'ok'
        ]);
    }

    public function allCategory()
    {
        $goodCategories = GoodCategory::orderBy("created_at", "desc")->get();
        return $this->respondSuccessWithStatus([
            [
                'good_categories' => $goodCategories->map(function ($goodCategory) {
                    return $goodCategory->CategoryTransform();
                })
            ]

        ]);
    }

    public function addCategory(Request $request)
    {
        if ($request->name == null) return $this->respondErrorWithStatus("Chưa có tên");
        $goodCategory = new GoodCategory;
        $goodCategory->name = $request->name;
        if ($request->parent_id != null) $goodCategory->parent_id = $request->parent_id; else $goodCategory->parent_id = 0;
        $goodCategory->save();
        return $this->respondSuccessWithStatus([
            "goodCategory" => $goodCategory->CategoryTransform()
        ]);
    }

    public function editCategory(Request $request)
    {
        if ($request->id == null || $request->name == null)
            return $this->respondErrorWithStatus("Chưa có id hoặc tên");
        $goodCategory = GoodCategory::find($request->id);
        if ($goodCategory == null) return $this->respondErrorWithStatus("Không tồn tại thể loại này");
        $goodCategory->name = $request->name;
        if ($request->parent_id != null) $goodCategory->parent_id = $request->parent_id;
        $goodCategory->save();
        return $this->respondSuccessWithStatus([
            "goodCategory" => $goodCategory->CategoryTransform()
        ]);
    }

    public function deleteCategory($category_id, Request $request)
    {
        $goodCategory = GoodCategory::find($category_id);
        if ($goodCategory == null) return $this->respondErrorWithData([
            "message" => "Danh mục không tồn tại"
        ]);
        $goodCategory->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xóa thành công"
        ]);
    }

    public function importOrders(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        if ($startTime)
            $importOrders = Order::where('type', 'import')->whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->get();
        else
            $importOrders = Order::where('type', 'import')->orderBy("created_at", "desc")->get();
        $data = $importOrders->map(function ($importOrder) {
            $total_money = $importOrder->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity * $importedGood->import_price;
            }, 0);
            $total_quantity = $importOrder->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity;
            }, 0);
            $debt = $total_money - $importOrder->orderPaidMoneys->reduce(function ($total, $orderPaidMoney) {
                    return $total + $orderPaidMoney->money;
                }, 0);
            $importOrderData = [
                'id' => $importOrder->id,
                'code' => $importOrder->code,
                'status' => $importOrder->status,
                'created_at' => $importOrder->format_vn_short_datetime(created_at),
                'import_price' => $importOrder->import_price,
                'warehouse_id' => $importOrder->warehouse_id,
                'total_money' => $total_money,
                'total_quantity' => $total_quantity,
                'debt' => $debt,
            ];
            if ($importOrder->staff()) {
                $staff = [
                    'id' => $importOrder->staff->id,
                    'name' => $importOrder->staff->name,
                ];
                $importOrderData['staff'] = $staff;
            }
            if ($importOrder->user()) {
                $user = [
                    'id' => $importOrder->user->id,
                    'name' => $importOrder->user->name,
                ];
                $importOrderData['user'] = $user;
            }
            return $importOrderData;
        });

        return $this->respondSuccessWithStatus([
            'import_orders' => $data
        ]);
    }

    public function importedGoodsOrder($importOrderId)
    {
        $importOrder = Order::find($importOrderId);
        $importedGoods = $importOrder->importedGoods;
        return $this->respondSuccessWithStatus([
            'imported_goods' => $importedGoods->map(function ($importedGood) {
                return [
                    'name' => $importedGood->good->name,
                    'code' => $importedGood->good->code,
                    'quantity' => $importedGood->quantity,
                    'import_price' => $importedGood->import_price
                ];

            })
        ]);
    }
}
