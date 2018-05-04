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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Modules\Good\Entities\GoodProperty;
use Modules\NhatQuangShop\Repositories\BookRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Order\Repositories\OrderService;

class NhatQuangShopManageController extends Controller
{
    private $bookRepository;
    protected $data;
    protected $user;

    public function __construct(BookRepository $bookRepository, OrderService $orderService)
    {
        $this->middleware('auth');
        $this->bookRepository = $bookRepository;
        $this->orderService = $orderService;
        $this->data = array();

        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function orderStatusToVietnamese($status)
    {
        switch ($status) {
            case 'place_order':
                return 'Đặt hàng';
                break;
            case 'not_reach':
                return 'Chưa gọi';
                break;
            case 'transfering':
                return 'Chờ chuyển khoản';
                break;
            case 'confirm_order':
                return 'Xác nhận';
                break;
            case 'ship_order':
                return 'Giao hàng';
                break;
            case 'completed_order':
                return 'Hoàn thành';
                break;
            case 'cancel':
                return 'Huỷ';
                break;
            default:
                return 0;
                break;
        }
    }

    public function deliveryStatusToVietnamese($status)
    {

        switch ($status) {
            case 'place_order':
                return 'Đơn mới';
                break;
            case 'sent_price':
                return 'Đã báo giá';
                break;
            case 'confirm_order':
                return 'Xác nhận';
                break;
            case 'ordered':
                return 'Đặt hàng';
                break;
            case 'arrive_date':
                return 'Dự kiến ngày về';
                break;
            case 'arrived':
                return 'Đã về VN';
                break;
            case 'ship':
                return 'Giao hàng';
            case 'completed':
                return 'Hoàn thành';
            case 'cancel':
                return 'Huỷ';
            default:
                return '';
                break;
        }
    }

    public function formatDeliveryOrders(&$orders)
    {
        foreach ($orders as $order) {
            $order->en_status = $order->status;
            $order->status = $this->deliveryStatusToVietnamese($order->status);
            $order->vnd_price = number_format($order->price, 0, ',', '.') . ' đ';
        }
    }

    public function userOrder()
    {
        $user = Auth::user();
        $orders = Order::where([['user_id', '=', $user->id], ['type', '=', 'order']])->orderBy('created_at', 'desc')->paginate(15);
        foreach ($orders as $order) {
            $order->en_status = $order->status;
            $order->status = $this->orderStatusToVietnamese($order->status);
        }
        $this->data['orders'] = $orders;

        return view("nhatquangshop::orders", $this->data);
    }

    public function infoOrder($order_id)
    {
        $order = Order::find($order_id);
        $this->data['order'] = $order;
        $paidOrderMoneys = $order->orderPaidMoneys;
        $totalPaidMoney = 0;
        if (count($paidOrderMoneys) > 0) {
            for ($i = 0; $i < count($paidOrderMoneys); $i++) {
                $totalPaidMoney += $paidOrderMoneys[$i]->money;
            }
        }
        $this->data['totalPaidMoney'] = $totalPaidMoney;
        $this->data['paidOrderMoneys'] = $paidOrderMoneys;
        return view("nhatquangshop::info_order", $this->data);
    }

    public function account_information()
    {
        $user = Auth::user();
        $user->money = number_format($user->money, 0, ',', '.') . ' đ';
        $user->deposit = number_format($user->deposit, 0, ',', '.') . ' đ';
        $this->data['user'] = $user;
        return view("nhatquangshop::account", $this->data);
    }

    public function get_account_change_information()
    {
        $user = Auth::user();
        $this->data['user'] = $user;
        return view("nhatquangshop::account_change", $this->data);
    }

    public function account_change_information(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
        ], [
            'name.required' => 'Bạn chưa nhập tên',
            'email.required' => 'Bạn chưa nhập địa chỉ email',
        ]);
        if ($validator->fails()) {
            return redirect('/manage/account_change')
                ->withInput()
                ->withErrors($validator);
        }
        $user = Auth::user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->save();
        $this->data['user'] = $user;
        return view("nhatquangshop::account", $this->data);
    }

    public function get_password_change()
    {
        return view("nhatquangshop::password_change");
    }

    public function password_change(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:6',
            'newPassword' => 'required|min:6',
            'againPassword' => 'required|same:newPassword|min:6'
        ], [
            'password.required' => 'Bạn chưa nhập mật khẩu hiện tại',
            'newPassword.required' => 'Bạn chưa nhập mật khẩu mới',
            'againPassword.required' => 'Bạn chưa nhập mật khẩu xác nhận',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
            'newPassword.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
            'againPassword.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
            'againPassword.same' => 'Mật khẩu xác nhận không chính xác',
        ]);
        if ($validator->fails()) {
            return redirect('/manage/password_change')
                ->withInput()
                ->withErrors($validator);
        }
        $user = Auth::user();
        $nowPassword = Hash::make($user->password);
        if ($nowPassword != $user->password) {
            return redirect('/manage/password_change')->with('error', 'Mật khẩu hiện tại không chính xác');
        }
        $user->password = bcrypt($request->password);
        $user->save();
        $this->data['user'] = $user;
        return view("nhatquangshop::account", $this->data);
    }

    public function filterOrders(Request $request)
    {
        $user = Auth::user();
        $orders = Order::where([['user_id', '=', $user->id], ['type', '=', 'order']])->orderBy('created_at', 'desc');
        $code = $request->code;
        $status = $request->status;
        $start_day = $request->start_day;
        $end_day = $request->end_day;

        if ($start_day)
            $orders = $orders->whereBetween('created_at', array($start_day, $end_day));
        if ($status)
            $orders = $orders->where('status', $status);
        if ($code)
            $orders = $orders->where('code', 'like', '%' . $code . '%');
        $orders = $orders->orderBy('created_at', 'desc')->paginate(15);
        foreach ($orders as $order) {
            $order->en_status = $order->status;
            $order->status = $this->orderStatusToVietnamese($order->status);
        }
        $this->data['orders'] = $orders;
        return view("nhatquangshop::orders", $this->data);
    }

    public function userDeliveryOrders()
    {
        $user = Auth::user();
        $deliveryOrders = Order::where([['user_id', '=', $user->id], ['type', '=', 'delivery']])->orderBy('created_at', 'desc')->paginate(15);
        $this->formatDeliveryOrders($deliveryOrders);
        $this->data['deliveryOrders'] = $deliveryOrders;
        return view('nhatquangshop::delivery_orders', $this->data);
    }

    public function filterDeliveryOrders(Request $request)
    {
        $user = Auth::user();
        $deliveryOrders = Order::where([['user_id', '=', $user->id], ['type', '=', 'delivery']])->orderBy('created_at', 'desc');
        if ($request->start_day)
            $deliveryOrders = $deliveryOrders->whereBetween('created_at', array($request->start_day, $request->end_day));
        if ($request->status)
            $deliveryOrders = $deliveryOrders->where('status', $request->status);
        if ($request->code)
            $deliveryOrders = $deliveryOrders->where('code', 'like', "%$request->code%");
        $deliveryOrders = $deliveryOrders->orderBy('created_at', 'desc')->paginate(15);
        // dd($deliveryOrders);
        $this->formatDeliveryOrders($deliveryOrders);
        $this->data['deliveryOrders'] = $deliveryOrders;
        return view("nhatquangshop::delivery_orders", $this->data);
    }

    public function editDeliveryOrder($order_id, Request $request)
    {
        $user = Auth::user();
        $order = Order::find($order_id);
        $order = Order::find($order_id);
        $object = json_decode($order->attach_info);
        $object->color = $request->color;
        $object->size = $request->size;
        $order->attach_info = json_encode($object);
        $order->price = $order->price / $order->quantity * $request->quantity;
        $order->quantity = $request->quantity;
        $order->save();
        return [
            'message' => "Cập nhật đơn hàng thành công"
        ];
    }

    public function saveDeliveryOrder(Request $request)
    {
        $user = Auth::user();
        $email = $user->email;
        $user_id = $user->id;
        $address = $user->address ? $user->address : "Người dùng chưa có địa chỉ";

        $delivery_orders = json_decode($request->fastOrders);
        // dd($delivery_orders);
        $response = $this->bookRepository->saveDeliveryOrder($email, $address, $user_id, $delivery_orders, $this->orderService->getTodayOrderId('delivery'));
        if ($response['status'] === 1) {
            return [
                "delivery_order" => $delivery_orders,
                "status" => 1,
                "message" => $response['message'],
            ];
        }
        return [
            "status" => 0,
            "message" => $response['message'],
        ];
    }
}
