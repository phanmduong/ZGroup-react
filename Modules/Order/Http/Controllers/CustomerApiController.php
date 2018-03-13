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
        $customers = User::join('orders', 'users.id', '=', 'orders.user_id');

        $customers = $customers->select('users.*', DB::raw('sum(orders.status_paid = 0) as count'));
        $customers = $customers->where('orders.status', '<>', 'cancel')->where('orders.type', '<>', 'import');
        $customers = $customers->groupBy('users.id');
        if ($request->status) {
            // $customers = $customers->get();
            // dd($customers);
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
                    'deposit' => $customer->deposit,
                    'money' => $customer->money,
                ];
                $data['orders'] = $customer->orders->map(function ($order) {
                    return $order->transform();
                });
                $data['delivery_orders'] = $this->deliveryOrderTransformer->transformCollection($customer->deliveryOrders);
                return $data;
            })
        ]);
    }
}
