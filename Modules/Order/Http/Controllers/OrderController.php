<?php

namespace Modules\Order\Http\Controllers;

use App\Good;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\OrderPaidMoney;
use Carbon\Carbon;
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
        $limit = 20;
        $user_id = $request->user_id;
        $staff_id = $request->staff_id;
        $warehouse_id = $request->warehouse_id;
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        $status = $request->status;
        $keyWord = $request->search;

        $totalOrders = Order::where('type', 'order')->get()->count();
        $totalMoney = 0;
        $totalPaidMoney = 0;
        $allOrders = Order::where('type', 'order')->get();
        foreach ($allOrders as $order) {
            $goodOrders = $order->goodOrders()->get();
            foreach ($goodOrders as $goodOrder) {
                $totalMoney += $goodOrder->quantity * $goodOrder->price;
            }
        }
        foreach ($allOrders as $order) {
            $orderPaidMoneys = $order->orderPaidMoneys()->get();
            foreach ($orderPaidMoneys as $orderPaidMoney) {
                $totalPaidMoney += $orderPaidMoney->money;
            }
        }
        $orders = Order::where('type', 'order')->where(function ($query) use ($keyWord) {
            $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
        });
        if ($status)
            $orders = $orders->where('status', $status);
        if ($startTime)
            $orders = $orders->whereBetween('created_at', array($startTime, $endTime));
        if ($warehouse_id)
            $orders = $orders->where('warehouse_id', $warehouse_id);
        if ($user_id)
            $orders = $orders->where('user_id', $user_id);
        if ($staff_id)
            $orders = $orders->where('staff_id', $staff_id);
        $orders = $orders->orderBy('created_at', 'desc')->paginate($limit);
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

    public function changeStatus(Request $request)
    {
        $order = Order::find($request->order_id);

        if ($order == null) {
            return $this->respondErrorWithStatus("Đơn hàng không tồn tại");
        }

        $order->status = $request->status;
        if ($request->label_id) {
            $order->label_id = $request->label_id;
        }

        $order->save();

        return $this->respondSuccessWithStatus([
            'order' => $order->transform()
        ]);
    }

    public function editOrder($order_id, Request $request)
    {
        $order = Order::find($order_id);
        if ($request->code == null && trim($request->code) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu code'
            ]);
        if ($order->type == 'import' && $order->status == 'completed')
            return $this->respondErrorWithStatus([
                'message' => 'Cant change completed import order'
            ]);
        $order->note = $request->note;
        $order->code = $request->code;
        $order->staff_id = $this->user->id;
        $order->user_id = $request->user_id;
        $order->status = $request->status;
        $order->save();
        if ($order->type == 'import' && $request->status == 'completed') {
            $importedGoods = $order->importedGoods;
            foreach ($importedGoods as $importedGood) {
                $importedGood->status = 'completed';
                $importedGood->save();
                $history = new HistoryGood;
                $lastest_good_history = HistoryGood::where('good_id', $importedGood->good_id)->orderBy('created_at', 'desc')->first();
                $remain = $lastest_good_history ? $lastest_good_history->remain : 0;
                $history->good_id = $importedGood->good_id;
                $history->quantity = $importedGood->quantity;
                $history->remain = $remain + $importedGood->quantity;
                $history->warehouse_id = $importedGood->warehouse_id;
                $history->type = 'import';
                $history->order_id = $importedGood->order_import_id;
                $history->imported_good_id = $importedGood->id;
                $history->save();
            }
        }
        //thieu confirm order thi them history_goods && tru quantity imported_goods
        //trang
        return $this->respondSuccessWithStatus([
            'message' => 'ok'
        ]);
    }


    public function payOrder($orderId, Request $request)
    {
        if (Order::find($orderId)->get() == null)
            return $this->respondErrorWithStatus("Order không tồn tại");
        if ($request->money == null)
            return $this->respondErrorWithStatus("Thiếu tiền thanh toán");
        $debt = Order::find($orderId)->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0) - Order::find($orderId)->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);

        if ($request->money > $debt)
            return $this->respondErrorWithStatus("Thanh toán thừa số tiền" . $debt);
        if ($debt == 0) {
            $order = Order::find($orderId)->get();
            $order->status_paid = 1;
        }
        $orderPaidMoney = new OrderPaidMoney;
        $orderPaidMoney->order_id = $orderId;
        $orderPaidMoney->money = $request->money;
        $orderPaidMoney->note = $request->note;
        $orderPaidMoney->payment = $request->payment;
        $orderPaidMoney->staff_id = $this->user->id;
        $orderPaidMoney->save();
        return $this->respondSuccessWithStatus([
            'order_paid_money' => $orderPaidMoney
        ]);
    }

    public function payImportOrder($orderId, Request $request)
    {
        if (Order::find($orderId)->get() == null)
            return $this->respondErrorWithStatus("Order không tồn tại");
        if ($request->money == null)
            return $this->respondErrorWithStatus("Thiếu tiền thanh toán");
        $debt = Order::find($orderId)->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity * $importedGood->import_price;
            }, 0) - Order::find($orderId)->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);

        if ($request->money > $debt)
            return $this->respondErrorWithStatus("Thanh toán quá số tiền còn nợ " . $debt);
        if ($debt == 0) {
            $order = Order::find($orderId)->get();
            $order->status_paid = 1;
        }
        $orderPaidMoney = new OrderPaidMoney;
        $orderPaidMoney->order_id = $orderId;
        $orderPaidMoney->money = $request->money;
        $orderPaidMoney->note = $request->note;
        $orderPaidMoney->payment = $request->payment;
        $orderPaidMoney->staff_id = $this->user->id;
        $orderPaidMoney->save();
        return $this->respondSuccessWithStatus([
            'order_paid_money' => $orderPaidMoney
        ]);
    }


    public function getOrderPaidMoney(Request $request)
    {
        $orderPMs = OrderPaidMoney::query();
        if ($request->order_id)
            $orderPMs = $orderPMs->where('order_id', $request->order_id);
        $orderPMs = $orderPMs->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            "order_paid_money" => $orderPMs->map(function ($orderPM) {
                return $orderPM->transform();
            })
        ]);
    }


    public function checkGoods(Request $request)
    {
        $good_arr = $request->goods;

        $goods = Good::whereIn('code', $good_arr)->get();

        $goods = $goods->map(function ($good) {
            return [
                'id' => $good->id,
                'code' => $good->code,
                'name' => $good->name,
                'price' => $good->price,
            ];
        });

        $not_goods = array();

        foreach ($good_arr as $good) {
            if (!in_array(trim($good), array_pluck($goods, 'code'))) {
                array_push($not_goods, $good);
            }
        }
        return $this->respondSuccessWithStatus([
            'exists' => $goods,
            'not_exists' => $not_goods
        ]);
    }
}