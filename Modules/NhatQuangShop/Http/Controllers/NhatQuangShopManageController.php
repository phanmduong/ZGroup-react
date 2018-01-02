<?php

namespace Modules\NhatQuangShop\Http\Controllers;

use App\Good;
use App\Order;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;

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

    public function userOrder($subfix)
    {
        return view("nhatquangshop::orders", $this->data);
    }

}
