<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Colorme\Transformers\DeliveryOrderTransformer;

class CustomerController extends ManageApiController
{
    public function __construct(DeliveryOrderTransformer $deliveryOrderTransformer)
    {
        parent::__construct();
        $this->deliveryOrderTransformer = $deliveryOrderTransformer;
    }

    public function customers(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $customers = User::join('orders', 'users.id', '=', 'orders.user_id');

        $customers = $customers->select('users.*', DB::raw('sum(orders.paid_status = 0) as count'));
        $customers = $customers->where('orders.status', '<>', 'cancel');
        $customers = $customers->groupBy('users.id');
        if ($request->status) {
            if ($request->status == 'paid')
                $customers = $customers->having('count', '=', 0);
            if ($request->status == 'debt')
                $customers = $customers->having('count', '>', 0);
        }
        $customers = $customers->where(function ($query) use ($keyword) {
            $query->where('name', 'like', '%' . $keyword . '%')
                ->orWhere('email', 'like', '%' . $keyword . '%')
                ->orWhere('phone', 'like', '%' . $keyword . '%');
        });
        $customers = $customers->paginate($limit);
        return $this->respondWithPagination($customers, [
            'customers' => $customers->map(function ($customer) {
                $data = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'phone' => $user->phone,
                    'email' => $user->email,
                    'deposit' => $user->deposit,
                    'money' => $user->money,
                ];
                $data['orders'] = $customer->orders->map(function($order){
                    return $order->transform();
                });
                $data['delivery_orders'] = $this->deliveryOrderTransformer->transformCollection($customer->deliveryOrders);
                return $data;
            })
        ]);
    }
}
