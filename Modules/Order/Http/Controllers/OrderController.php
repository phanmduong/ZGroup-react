<?php

namespace Modules\Order\Http\Controllers;

use App\Good;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\OrderPaidMoney;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Order;
use Modules\Order\Repositories\OrderService;

class OrderController extends ManageApiController
{
    public function __construct(OrderService $orderService)
    {
        parent::__construct();
        $this->orderService = $orderService;
    }

    public function statusToNum($status)
    {
        switch ($status) {
            case 'place_order':
                return 0;
                break;
            case 'not_reach':
                return 1;
                break;
            case 'confirm_order':
                return 2;
                break;
            case 'ship_order':
                return 3;
                break;
            case 'completed_order':
                return 4;
                break;
            case 'cancel':
                return 5;
                break;
            default:
                return 0;
                break;
        }
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

        $orders = Order::where('type', 'order');
        if ($keyWord) {
            $userIds = User::where(function ($query) use ($keyWord) {
                $query->where("name", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%");
            })->pluck('id')->toArray();
            $orders = $orders->where('type', 'order')->where(function ($query) use ($keyWord, $userIds) {
                $query->whereIn('user_id', $userIds)->orWhere("code", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
            });
        }
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
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }

    public function statisticalOrder(Request $request)
    {
        $user_id = $request->user_id;
        $staff_id = $request->staff_id;
        $warehouse_id = $request->warehouse_id;
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        $status = $request->status;
        $keyWord = $request->search;

        $orders = Order::where('type', 'order');
        if ($keyWord) {
            $userIds = User::where(function ($query) use ($keyWord) {
                $query->where("name", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%");
            })->pluck('id')->toArray();
            $orders = $orders->where('type', 'order')->where(function ($query) use ($keyWord, $userIds) {
                $query->whereIn('user_id', $userIds)->orWhere("code", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
            });
        }
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
        $orders = $orders->get();


        $totalMoney = 0;
        $totalPaidMoney = 0;
        $count = $orders->count();

        foreach ($orders as $order) {
            $goodOrders = $order->goodOrders()->get();
            foreach ($goodOrders as $goodOrder) {
                $totalMoney += $goodOrder->quantity * $goodOrder->price;
            }
        }
        foreach ($orders as $order) {
            $orderPaidMoneys = $order->orderPaidMoneys()->get();
            foreach ($orderPaidMoneys as $orderPaidMoney) {
                $totalPaidMoney += $orderPaidMoney->money;
            }
        }
        return $this->respondSuccessWithStatus([
            'total_orders' => $count,
            'total_money' => $totalMoney,
            'total_paid_money' => $totalPaidMoney,
            'total_debt' => $totalMoney - $totalPaidMoney,
        ]);
    }

    public function detailedOrder($order_id)
    {
        $order = Order::find($order_id);
        if ($order == null)
            return $this->respondSuccessWithStatus([
            'message' => 'Khong ton tai order'
        ]);
        $data = $order->detailedTransform();
        $returnOrders = Order::where('type', 'return')->where('code', $order->code)->get();
        $data['return_orders'] = $returnOrders->map(function ($returnOrder) {
            return $returnOrder->returnOrderData();
        });
        return $this->respondSuccessWithStatus([
            'order' => $data,
        ]);
    }

    public function editOrder($order_id, Request $request)
    {
        $order = Order::find($order_id);
        if ($order_id == null)
            return $this->respondErrorWithStatus([
            'message' => 'Không tồn tại order'
        ]);
        if ($this->user->role != 2) {
            if ($this->statusToNum($order->status) > $this->statusToNum($request->status))
                return $this->respondErrorWithStatus([
                'message' => 'Bạn không có quyền đổi trạng thái này'
            ]);
            if ($order->status == 'completed')
                return $this->respondErrorWithStatus([
                'message' => 'Cant change completed order'
            ]);
        }
        if ($request->code == null && trim($request->code) == '')
            return $this->respondErrorWithStatus([
            'message' => 'Thiếu code'
        ]);
        if ($order->type == 'import' && $order->status == 'completed')
            return $this->respondErrorWithStatus([
            'message' => 'Cant change completed import order'
        ]);

        $order->note = $request->note;
        $order->staff_id = $this->user->id;
        $order->user_id = $request->user_id;
        $order->save();
        if ($this->statusToNum($order->status) <= 1 && $order->type == 'order') {
            $good_orders = json_decode($request->good_orders);
            $order->goodOrders()->delete();
            foreach ($good_orders as $good_order) {
                $good = Good::find($good_order->good_id);
                if ($good_order->quantity >= 0)
                    $order->goods()->attach($good_order->good_id, [
                    'quantity' => $good_order->quantity,
                    'price' => $good->price
                ]);
            }
        }

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
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
            return $this->respondErrorWithStatus("Thanh toán thừa số tiền :" . $debt);
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
        $good_arr_code = array_pluck($good_arr, 'code');
        $good_arr_barcode = array_pluck($good_arr, 'barcode');

        $goods = Good::whereIn('code', $good_arr_code)->whereIn('barcode', $good_arr_barcode)->get();

        $goods = $goods->map(function ($good) {
            return [
                'id' => $good->id,
                'code' => $good->code,
                'barcode' => $good->barcode,
                'name' => $good->name,
                'price' => $good->price,
            ];
        });
        $not_goods = array();

        foreach ($good_arr as $good) {
            if (!in_array(trim($good['code']), array_pluck($goods, 'code'))
                || !in_array(trim($good['barcode']), array_pluck($goods, 'barcode'))) {
                array_push($not_goods, $good);
            }
        }
        return $this->respondSuccessWithStatus([
            'exists' => $goods,
            'not_exists' => $not_goods
        ]);
    }

    public function editNote($orderId, Request $request)
    {
        $order = Order::find($orderId);
        if (!$order) {
            return $this->respondErrorWithData([
                'message' => 'Không tồn tại đơn hàng'
            ]);
        }
        $order->note = $request->note;
        $order->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function changeOrderStatus($orderId, Request $request)
    {
        $response = $this->orderService->changeOrderStatus($orderId, $request, $this->user->id);
        if ($response['status'] == 0)
            return $this->respondErrorWithStatus([
            'message' => $response['message']
        ]);
        return $this->respondSuccessWithStatus([
            'message' => $response['message']
        ]);
    }

    public function returnOrder($orderId, $warehouseId, Request $request)
    {
        $order = Order::find($orderId);
        $returnOrder = new Order;
        $returnOrder->note = $request->note;
        $returnOrder->code = $order->code;
        $returnOrder->staff_id = $this->user->id;
        $returnOrder->status = $request->status;
        $returnOrder->type = 'return';
        $returnOrder->save();

        $good_orders = json_decode($request->good_orders);
        foreach ($good_orders as $good_order) {
            if ($good_order->quantity >= 0)
                $returnOrder->goods()->attach($good_order->good_id, [
                'quantity' => $good_order->quantity,
                'price' => $good_order->price
            ]);
        }
        $this->orderService->returnProcess($returnOrder->id, $request->warehouse_id, $this->user->id);
        return $this->respondSuccessWithStatus([
            'message' => 'Thành công'
        ]);
    }

    public function storeOrder(Request $request)
    {
        $request->code = $request->code ? $request->code :
            'ORDER' . rebuild_date('Ymd', strtotime(Carbon::now()->toDateTimeString())) . str_pad($this->orderService->getTodayOrderId('order') + 1, 4, '0', STR_PAD_LEFT);
        if ($request->warehouse_id == null)
            return $this->respondErrorWithStatus([
            'message' => 'Thiếu mã kho'
        ]);
        $order = new Order;
        $order->note = $request->note;
        $order->code = $request->code;
        $order->type = "order";
        $order->staff_id = $this->user->id;
        $order->status = 'completed_order';

        if ($request->user_id)
            $order->user_id = $request->user_id;
        else {
            if ($request->phone != null || $request->email != null) {
                $user = User::where('phone', $request->phone)->first();
                if ($user == null) {
                    $user = new User;
                }
                $user->name = $request->name;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->username = $request->email;
                $user->save();

                $order->user_id = $user->id;
            } else $order->user_id = 0;
        }
        $order->save();


        $good_orders = json_decode($request->good_orders);
        $total_price = 0;
        foreach ($good_orders as $good_order) {
            $good = Good::find($good_order->good_id);
            $total_price += $good_order->quantity * $good->price;
            if ($good_order->quantity >= 0)
                $order->goods()->attach($good_order->good_id, [
                'quantity' => $good_order->quantity,
                'price' => $good->price
            ]);
        }

        $orderPaidMoney = new OrderPaidMoney;
        $orderPaidMoney->order_id = $order->id;
        $orderPaidMoney->money = $total_price;
        $orderPaidMoney->note = $request->note;
        $orderPaidMoney->payment = $request->payment;
        $orderPaidMoney->staff_id = $this->user->id;
        $orderPaidMoney->save();

        $response = $this->orderService->exportOrder($order->id, $request->warehouse_id);
        if ($response['status'] == 0)
            return $this->respondErrorWithStatus([
            'message' => $response['message']
        ]);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function test(Request $request)
    {
        $data = [
            [
                'id' => 1,
                'quantity' => 10,
            ],
            [
                'id' => 1,
                'quantity' => 10,
            ],
        ];
        dd(json_encode($data));
    }
}