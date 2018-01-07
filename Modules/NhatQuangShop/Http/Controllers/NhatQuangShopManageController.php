<?php

namespace Modules\NhatQuangShop\Http\Controllers;

use App\Good;
use App\Order;
use App\Product;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class NhatQuangShopManageController extends Controller
{
    private $bookRepository;
    protected $data;
    protected $user;

    public function __construct(BookRepository $bookRepository)
    {
        $this->middleware('auth');
        $this->bookRepository = $bookRepository;
        $this->data = array();

        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function userOrder($subfix, Request $request)
    {
        $user = Auth::user();
        $ordersCount = Order::where('user_id', '=', $user->id)->orderBy('created_at', 'desc');
        $pageNumber = 5;
        $orders = Order::where('user_id', '=', $user->id)->orderBy('created_at', 'desc')->paginate($pageNumber);
        $this->data['orders'] = $orders;
        $page = ceil($ordersCount->count() / $pageNumber);
        $this->data['page'] = $page;
        return view("nhatquangshop::orders", $this->data);
    }

    public function infoOrder($subfix, $order_id)
    {
        $order = Order::find($order_id);
        $this->data['order'] = $order;
        $user = User::find($order->user_id);
        $paidOrderMoneys = $order->orderPaidMoneys;
        $totalPaidMoney = 0;
        if (count($paidOrderMoneys) > 0) {
            for ($i = 0; $i < count($paidOrderMoneys); $i++) {
                $totalPaidMoney += $paidOrderMoneys[$i]->money;
            }

        }
        $this->data['totalPaidMoney'] = $totalPaidMoney;
        $this->data['paidOrderMoneys'] = $paidOrderMoneys;
        return view("nhatquangshop::info_order", ['user' => $user, 'order' => $order]);
    }

}
