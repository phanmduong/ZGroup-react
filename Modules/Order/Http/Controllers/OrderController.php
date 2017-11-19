<?php

namespace Modules\Order\Http\Controllers;

use App\Good;
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
        $limit = 3;
        $user_id = $request->user_id;
        $staff_id = $request->staff_id;
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
        if ($startTime)
            $orders = $orders->whereBetween('created_at', array($startTime, $endTime));
        //if ($status)
        //    $orders = $orders->where('status', $status);
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
        $order->status = $request->status;
        $order->save();
        if ($order->type == 'import' && $order->status == 'completed') {
            $importedGoods = $order->importedGoods;
            foreach ($importedGoods as $importedGood) {
                $importedGood->status = 'completed';
                $importedGood->save();
            }
        }
        return $this->respondSuccessWithStatus([
            'message' => 'ok'
        ]);
    }


    public function payOrder($orderId, Request $request)
    {
        if (Order::find($orderId)->get() == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-exist order'
            ]);
        if ($request->money == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tiền thanh toán'
            ]);
        $debt = Order::find($orderId)->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0) - Order::find($orderId)->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);
        if ($request->money > $debt)
            return $this->respondErrorWithStatus([
                'message' => 'over',
                'money' => $debt,
            ]);
        if ($debt == 0) {
            $order = Order::find($orderId)->get();
            $order->status_paid = 1;
        }
        $orderPaidMoney = new OrderPaidMoney;
        $orderPaidMoney->order_id = $orderId;
        $orderPaidMoney->money = $request->money;
        $orderPaidMoney->staff_id = $this->user->id;
        $orderPaidMoney->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function addImportOrderGoods(Request $request)
    {
        $importOrder = new Order;
        if ($request->code == null)
            $importOrder->code = rebuild_date('YmdHis', strtotime(Carbon::now()->toDateTimeString()));
        else
            $importOrder->code = $request->code;
        $importOrder->note = $request->note;
        $importOrder->warehouse_id = $request->warehouse_id;
        $importOrder->staff_id = $this->user->id;
        $importOrder->user_id = $request->user_id;
        $importOrder->type = 'import';

        $importOrder->status = $request->status ? $request->status : 'uncompleted';
        $importOrder->save();
        if ($request->paid_money) {
            $orderPaidMoney = new OrderPaidMoney;
            $orderPaidMoney->order_id = $importOrder->id;
            $orderPaidMoney->money = $request->paid_money;
            $orderPaidMoney->staff_id = $this->user->id;
            $orderPaidMoney->note = $request->note_paid_money ? $request->note_paid_money : '';
            $orderPaidMoney->save();
        }

        $orderImportId = $importOrder->id;
        foreach ($request->imported_goods as $imported_good) {
            $importedGood = new ImportedGoods;
            if ($imported_good['price']) {
                $good = Good::find($imported_good['good_id']);
                if ($good == null)
                    return $this->respondErrorWithStatus([
                        'message' => 'Không tồn tại sản phẩm'
                    ]);
                $good->price = $imported_good['price'];
                $good->save();
            }
            $importedGood->order_import_id = $orderImportId;
            $importedGood->good_id = $imported_good['good_id'];
            $importedGood->quantity = $imported_good['quantity'];
            $importedGood->import_quantity = $imported_good['quantity'];
            $importedGood->import_price = $imported_good['import_price'];
            $importedGood->status = 'uncompleted';
            $importedGood->staff_id = $this->user->id;
            $importedGood->warehouse_id = $request->warehouse_id;
            $importedGood->save();
        }
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }


    public function getOrderPaidMoney()
    {
        $orderPMs = OrderPaidMoney::orderBy('created_at', 'desc')->get();
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
