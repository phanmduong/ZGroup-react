<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 12/11/2017
 * Time: 15:45
 */

namespace Modules\Order\Http\Controllers;


use App\Http\Controllers\ManageApiController;
use App\Order;
use App\User;
use Illuminate\Http\Request;

class CustomerController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allCustomers(Request $request)
    {

        $limit = $request->limit ? $request->limit : 20;

        $users = User::where("type", "customer")->paginate($limit);


        return $this->respondWithPagination(
            $users,
            [
                'customers' => $users->map(function ($user) {
                    $orders = Order::where("user_id", $user->id)->get();
                    $totalMoney = 0;
                    $totalPaidMoney = 0;
                    $lastOrder=0;
                    foreach ($orders as $order) {
                        $goodOrders = $order->goodOrders()->get();
                        foreach ($goodOrders as $goodOrder) {
                            $totalMoney += $goodOrder->quantity * $goodOrder->price;
                        }
                        $lastOrder = $order->created_at;
                    }
                    foreach ($orders as $order) {
                        $orderPaidMoneys = $order->orderPaidMoneys()->get();
                        foreach ($orderPaidMoneys as $orderPaidMoney) {
                            $totalPaidMoney += $orderPaidMoney->money;
                        }
                    }
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'phone' => $user->phone,
                        'email' => $user->email,
                        'address' => $user->address,
                        'last_order' => format_vn_short_datetime(strtotime($lastOrder)),
                        'total_money' => $totalMoney,
                        'total_paid_money' => $totalPaidMoney,
                        'debt' => $totalMoney - $totalPaidMoney,

                    ];
                }),
            ]
        );
    }


}