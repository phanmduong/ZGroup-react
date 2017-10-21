<?php

namespace Modules\Order\Http\Controllers;

use App\GoodOrder;
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
        $limit = 20;
        $start = $request->start;
        $end = $request->end;
        $type = $request->type;
        $total_records = Order::get()->count();
        if ($start) {
            if ($type)
                $orders = Order::where('type', $type)->whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate($limit);
            else
                $orders = Order::whereBetween('created_at', array($start, $end))->orderBy("created_at", "desc")->paginate($limit);
        } else {
            if ($type)
                $orders = Order::where('type', $type)->orderBy("created_at", "desc")->paginate($limit);
            else
                $orders = Order::orderBy("created_at", "desc")->paginate($limit);
        }
        return $this->respondWithPagination(
            $orders,
            [
                'total_records' => $total_records,
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }
}
