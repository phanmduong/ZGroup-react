<?php

namespace Modules\Order\Http\Controllers;

use App\Colorme\Transformers\DeliveryOrderTransformer;
use App\Order;
use App\Register;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ManageApiController;

class DeliveryOrderApiController extends ManageApiController
{
    private $deliveryOrderTransformer;

    public function __construct(DeliveryOrderTransformer $deliveryOrderTransformer)
    {
        parent::__construct();

        $this->deliveryOrderTransformer = $deliveryOrderTransformer;
    }

    public function getDeliveryOrders(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyWord = $request->search;

        $deliveryOrders = Order::where('type', 'delivery');
        //queries
        if ($keyWord) {
            $userIds = User::where(function ($query) use ($keyWord) {
                $query->where("name", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%");
            })->pluck('id')->toArray();
            $deliveryOrders = $deliveryOrders->where(function ($query) use ($keyWord, $userIds) {
                $query->whereIn('user_id', $userIds)->orWhere("code", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
            });
        }

        if ($request->staff_id)
            $deliveryOrders = $deliveryOrders->where('staff_id', $request->staff_id);
        if ($request->start_time)
            $deliveryOrders = $deliveryOrders->whereBetween('created_at', array($request->start_time, $request->end_time));
        if ($request->status)
            $deliveryOrders = $deliveryOrders->where('status', $request->status);
        if ($request->user_id)
            $deliveryOrders = $deliveryOrders->where('user_id', $request->user_id);

        if ($limit == -1) {
            $deliveryOrders = $deliveryOrders->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'delivery_orders' => $this->deliveryOrderTransformer->transformCollection($deliveryOrders)
            ]);
        }
        $deliveryOrders = $deliveryOrders->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination(
            $deliveryOrders
            ,
            [
                'delivery_orders' => $this->deliveryOrderTransformer->transformCollection($deliveryOrders)
            ]);
    }

    public function infoDeliveryOrders(Request $request)
    {
        $keyWord = $request->search;

        $deliveryOrders = Order::where('type', 'delivery');
        //queries
        if ($keyWord) {
            $userIds = User::where(function ($query) use ($keyWord) {
                $query->where("name", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%");
            })->pluck('id')->toArray();
            $deliveryOrders = $deliveryOrders->where('type', 'order')->where(function ($query) use ($keyWord, $userIds) {
                $query->whereIn('user_id', $userIds)->orWhere("code", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
            });
        }

        if ($request->staff_id)
            $deliveryOrders = $deliveryOrders->where('staff_id', $request->staff_id);
        if ($request->start_time)
            $deliveryOrders = $deliveryOrders->whereBetween('created_at', array($request->start_time, $request->end_time));
        if ($request->status)
            $deliveryOrders = $deliveryOrders->where('status', $request->status);
        if ($request->user_id)
            $deliveryOrders = $deliveryOrders->where('user_id', $request->user_id);

        $deliveryOrders = $deliveryOrders->orderBy('created_at', 'desc')->get();

        return $this->respondSuccessWithStatus([
            'total_delivery_orders' => 10,
            'not_locked' => 2,
            'total_money' => 15000000,
            'total_paid_money' => 10000000
        ]);
    }

    public function createDeliveryOrder(Request $request)
    {
        $request->code = $request->code ? $request->code : 'DELIVERY' . rebuild_date('YmdHis', strtotime(Carbon::now()->toDateTimeString()));
        if ($request->phone == null || $request->email == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu thông tin người mua'
            ]);

        $order = new Order;
        $order->note = $request->note;
        $order->code = $request->code;
        $order->staff_id = $this->user->id;
        $order->attach_info = $request->attach_info;
        $order->status = 'place_order';

        $user = User::where('phone', $request->phone)->first();
        if ($user == null) {
            $user = new User;
        }

        $user->name = $request->name ? $request->name : $request->phone;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        $order->user_id = $user->id;

        $order->save();

        return $this->respondSuccessWithStatus(['message' => 'SUCCESS']);
    }

    public function editDeliveryOrder($orderId, Request $request)
    {
        $request->code = $request->code ? $request->code : 'DELIVERY' . rebuild_date('YmdHis', strtotime(Carbon::now()->toDateTimeString()));
        if ($request->phone == null || $request->email == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu thông tin người mua'
            ]);

        $order = Order::find($orderId);
        if ($order == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại đơn hàng'
            ]);
        $order->note = $request->note;
        $order->code = $request->code;
        $order->staff_id = $this->user->id;
        $order->attach_info = $request->attach_info;
        $order->status = 'place_order';

        $user = User::where('phone', $request->phone)->first();
        if ($user == null) {
            $user = new User;
            $user->password = Hash::make($request->phone);
        }

        $user->name = $request->name ? $request->name : $request->phone;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        $order->user_id = $user->id;

        $order->save();

        return $this->respondSuccessWithStatus(['message' => 'SUCCESS']);
    }

    public function getDetailedDeliveryOrders($deliveryOrderId, Request $request)
    {
        $deliveryOrder = Order::find($deliveryOrderId);
        if($deliveryOrder == null)
            return $this->respondErrorWithStatus('Không tồn tại đơn đặt hàng');
        return $this->respondSuccessWithStatus([
            'delivery_order' => $deliveryOrder->getDeliveryData(),
        ]);
    }
}
