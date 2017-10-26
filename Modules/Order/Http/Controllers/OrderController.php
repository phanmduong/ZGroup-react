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

    public function importedGoods(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        if($startTime)
            $importedGoods = ImportedGoods::whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->get();
        else
            $importedGoods = ImportedGoods::orderBy("created_at", "desc")->get();
        return $this->respondSuccessWithStatus([
            'imported_goods' => $importedGoods->map(function ($importedGood) {
                return [
                    'id' => $importedGood->id,
                    'good_id' => $importedGood->good_id,
                    'quantity' => $importedGood->quantity,
                    'import_price' => $importedGood->import_price,
                    'warehouse_id' => $importedGood->warehouse_id,
                ];
            })
        ]);
    }

    public function importedGood($importedGoodId, Request $request)
    {
        $importedGood = ImportedGoods::find($importedGoodId)->get();
        $data = [
            'id' => $importedGood->id,
            'good_id' => $importedGood->good_id,
            'quantity' => $importedGood->quantity,
            'import_price' => $importedGood->import_price,
            'expired_date' => $importedGood->expired_date,
        ];
        $staff = $importedGood->staff();
        $base = $importedGood->warehouse() ? $importedGood->warehouse()->base() : null;
        $good = $importedGood->good();
        if ($staff)
            $data['staff'] = [
                'id' => $staff->id,
                'name' => $staff->name,
            ];
        if ($base)
            $data['base'] = [
                'name' => $base->name,
                'address' => $base->address,
            ];
        if ($good)
            $data['good'] = [
                'name' => $good->name,
                'descriptuon' => $good->description,
            ];
        return $this->respondSuccessWithStatus([
            'imported_good' => $data
        ]);
    }

    public function addImportedGood(Request $request)
    {
        if ($request->good_id == null || $request->warehouse_id == null || $request->quantity == null || $request->import_price == null)
            return $this->respondErrorWithStatus([
                'message' => 'ERROR'
            ]);
        $importedGood = new ImportedGoods;
        $importedGood->good_id = $request->good_id;
        $importedGood->warehouse_id = $request->warehouse_id;
        $importedGood->quantity = $request->quantity;
        $importedGood->expired_date = $request->expired_date;
        $importedGood->import_price = $request->import_price;
        $importedGood->staff_id = $this->user->id;
        $importedGood->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}
