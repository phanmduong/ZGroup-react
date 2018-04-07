<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Colorme\Transformers\DeliveryOrderTransformer;

class CustomerApiController extends ManageApiController
{
    public function __construct(DeliveryOrderTransformer $deliveryOrderTransformer)
    {
        parent::__construct();
        $this->deliveryOrderTransformer = $deliveryOrderTransformer;
    }

    public function customers(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $customers = User::leftJoin('orders', 'users.id', '=', 'orders.user_id');
        $customers = $customers->select('users.*');//, DB::raw('sum(orders.status_paid = 0) as count'));
        $customers = $customers->where('orders.status', '<>', 'cancel')->where('orders.type', '<>', 'import');
        $customers = $customers->groupBy('users.id');
        if ($request->status) {
            if ($request->status == 'paid')
                $customers = $customers->having(DB::raw('sum(orders.status_paid = 0)'), '=', 0);
            if ($request->status == 'debt')
                $customers = $customers->having(DB::raw('sum(orders.status_paid = 0)'), '>', 0);
        }
        $customers = $customers->where(function ($query) use ($keyword) {
            $query->where('users.name', 'like', '%' . $keyword . '%')
                ->orWhere('users.email', 'like', '%' . $keyword . '%')
                ->orWhere('users.phone', 'like', '%' . $keyword . '%');
        });
        $customers = $customers->paginate($limit);
        return $this->respondWithPagination($customers, [
            'customers' => $customers->map(function ($customer) {
                $data = [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'phone' => $customer->phone,
                    'email' => $customer->email,
                    'address' => $customer->address,
                    'deposit' => $customer->deposit,
                    'money' => $customer->money,
                    'count_groups' => $customer->infoCustomerGroups()->count(),
                    'last_order' => format_vn_short_datetime(strtotime($customer->allOrders()->orderBy('created_at', 'desc')->first()->created_at)),
                ];
                return $data;
            })
        ]);
    }

    public function customer($customerId, Request $request)
    {
        $customer = User::find($customerId);
        if ($customer == null)
            return $this->respondErrorWithStatus('Không tồn tại khách hàng');
        $groups = $customer->infoCustomerGroups;
        $data = [
            'id' => $customer->id,
            'name' => $customer->name,
            'phone' => $customer->phone,
            'email' => $customer->email,
            'address' => $customer->address,
            'deposit' => $customer->deposit,
            'money' => $customer->money,
            'gender' => $customer->gender,
            'birthday' => $customer->dob,
            'avatar_url' => $customer->avatar_url ? $customer->avatar_url : 'http://colorme.vn/img/user.png',
            'groups' => $groups->map(function ($group) {
                return [
                    'id' => $group->id,
                    'name' => $group->name,
                    'description' => $group->description,
                    'color' => $group->color,
                    'order_value' => $group->order_value,
                    'delivery_value' => $group->delivery_value,
                    'currency_value' => $group->currency_value,
                ];
            }),
        ];
        $data['orders'] = $customer->orders->map(function ($order) {
            return $order->transform();
        });
        $data['delivery_orders'] = $this->deliveryOrderTransformer->transformCollection($customer->deliveryOrders);
        $data['orders_total'] = $customer->orders->reduce(function ($total, $order) {
            return $total + $order->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0);
        });
        $data['orders_total_paid'] = $customer->orders->reduce(function ($total, $order) {
            return $total + $order->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);
        });
        $data['delivery_orders_total'] = $customer->deliveryOrders->reduce(function ($total, $order) {
            return $total + $order->money;
        }, 0);
        $data['delivery_orders_total_paid'] = $customer->deliveryOrders->reduce(function ($total, $order) {
            return $total + $order->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);
        }, 0);
        return $this->respondSuccessWithStatus(['customer' => $data]);
    }
}
