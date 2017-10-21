<?php

namespace Modules\Order\Http\Controllers;

use App\Good_category;
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
    public function all_Category(){
        $good_categories= Good_category::orderBy("created_at","desc")->get();
        return $this->respondSuccessWithStatus([
            $good_categories,
            [
                'good_categories' => $good_categories->map(function ($good_category) {
                    return $good_category->Category_transform();
                })
            ]

        ]);
    }

}
