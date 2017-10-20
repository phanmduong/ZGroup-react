<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\ManageApiController;
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
        $start = $request->start;
        $end = $request->end;
        $type = $request->type;
        if ($start) {
            if ($type)
                $orders = Order::where('type', $type)->whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate(20);
            else
                $orders = Order::whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate(20);
        } else {
            if ($type)
                $orders = Order::where('type', $type)->orderBy("created_at", "desc")->paginate(20);
            else
                $orders = Order::orderBy("created_at", "desc")->paginate(20);
        }
        return $this->respondWithPagination(
            $orders,
            [
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }
}
