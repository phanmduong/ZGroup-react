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
        $orders = Order::where('user_id', '=', $user->id)->orderBy('created_at', 'desc')->paginate(15);
        $this->data['orders'] = $orders;
        return view("nhatquangshop::orders", $this->data);
    }
    public function infoOrder($subfix, $order_id){
       $order = Order::find($order_id);
       $this->data['order'] = $order;
       $paidOrderMoneys = $order->orderPaidMoneys;
       $this->data['paidOrderMoneys'] = $paidOrderMoneys;
       return view("nhatquangshop::infoOrder", $this->data);
    }

}
