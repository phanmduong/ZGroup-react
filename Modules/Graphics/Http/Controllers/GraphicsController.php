<?php

namespace Modules\Graphics\Http\Controllers;

use App\District;
use App\Good;
use App\Order;
use App\OrderPaidMoney;
use App\Product;
use App\Province;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;
use Modules\Graphics\Repositories\NganLuong;

class GraphicsController extends Controller
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function index()
    {
        $book_arr = $this->bookRepository->getAllBooks();
        return view('graphics::index', [
            'books' => $book_arr,
        ]);
    }

    public function about_us()
    {
        return view('graphics::about_us');
    }

    public function countGoodsFromSession( Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $goods = json_decode($goods_str);

        $count = 0;
        if ($goods) {
            foreach ($goods as $good) {
                $count += $good->number;
            }
        }

        return $count;
    }

    public function addGoodToCart( $goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');

        if ($goods_str) {
            $goods = json_decode($goods_str);
        } else {
            $goods = [];
        }
        $added = false;
        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number += 1;
                $added = true;
            }
        }
        if (!$added) {
            $temp = new \stdClass();
            $temp->id = $goodId;
            $temp->number = 1;
            $goods[] = $temp;
        }
        $goods_str = json_encode($goods);
        $request->session()->put('goods', $goods_str);
        return ["status" => 1];
    }

    public function removeBookFromCart( $goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');

        $goods = json_decode($goods_str);

        $new_goods = [];

        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number -= 1;
            }
            if ($good->number > 0) {
                $temp = new \stdClass();
                $temp->id = $good->id;
                $temp->number = $good->number;
                $new_goods[] = $temp;
            }
        }

        $goods_str = json_encode($new_goods);
        $request->session()->put('goods', $goods_str);
        return ["status" => 1];
    }

    public function getGoodsFromSession( Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        $goods = [];
        if ($goods_arr) {
            foreach ($goods_arr as $item) {
                $good = Good::find($item->id);
                $good->number = $item->number;
                $properties = GoodProperty::where('good_id', $good->id)->get();
                foreach ($properties as $property) {
                    $good[$property->name] = $property->value;
                }
                $goods[] = $good;
            }
        }

        $totalPrice = 0;

        foreach ($goods as $good) {
            $totalPrice += $good->price * (1 - $good["coupon_value"]) * $good->number;
        }
        $data = [
            "goods" => $goods,
            "total_order_price" => $totalPrice
        ];

        return $data;
    }

    public function book( $good_id)
    {
        $book = Good::find($good_id);
        if ($book == null)
            return view('graphics::404');
        $data = $this->bookRepository->getBookDetail($good_id);
        return view('graphics::book', [
            'book_id' => $good_id,
            'properties' => $data,
        ]);
    }

    public function contact_us()
    {
        return view('graphics::contact_us');
    }

    public function contact_info( Request $request)
    {
        $data = ['email' => $request->email,
                'name' => $request->name,
                'message_str' => $request->message_str];

        Mail::send('emails.contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Graphics');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->subject($subject);
        });
        // Mail::send('emails.contact_us', $data, function ($m) use ($request) {
        //     $m->from('no-reply@colorme.vn', 'Graphics');
        //     $subject = "Xác nhận thông tin";
        //     $m->to($request->email, $request->name)->subject($subject);
        // });
        return "OK";
    }

    public function post( $post_id)
    {
        $post = Product::find($post_id);
        $post->author;
        $post->category;
        $post->url = config('app.protocol') . $post->url;
        if (trim($post->author->avatar_url) === '') {
            $post->author->avatar_url = config('app.protocol') . 'd2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png';
        } else {
            $post->author->avatar_url = config('app.protocol') . $post->author->avatar_url;
        }
        $posts_related = Product::where('id', '<>', $post_id)->inRandomOrder()->limit(3)->get();
        $posts_related = $posts_related->map(function ($p) {
            $p->url = config('app.protocol') . $p->url;
            return $p;
        });
        $post->comments = $post->comments->map(function ($comment) {
            $comment->commenter->avatar_url = config('app.protocol') . $comment->commenter->avatar_url;

            return $comment;
        });
//        dd($post);
        return view('graphics::post',
            [
                'post' => $post,
                'posts_related' => $posts_related
            ]
        );
    }

    public function blog( Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(6);
        $display = "";
        //dd($blogs->lastPage());
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $page_id - 1) $display = "display:none";
        return view('graphics::blogs', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
        ]);
    }

    public function onlinePaidOrder( $orderId, $money, Request $request)
    {
        if (Hash::check($orderId, $request->hash)) {
            $order = Order::find($orderId);
            if ($order) {
                $orderPaidMoney = new OrderPaidMoney();
                $orderPaidMoney->money = $money;
                $orderPaidMoney->staff_id = 0;
                $orderPaidMoney->order_id = $orderId;
                $orderPaidMoney->note = "Thanh toán qua ngân lượng";
                $orderPaidMoney->payment = "Thanh toán online";
                $orderPaidMoney->save();
                $order->status_paid = 1;
                $order->save();
            } else {
                return "Đơn hàng không tồn tại";
            }

            return view('graphics::checkout_success');
        } else {
            return "Mã xác thực không khớp";
        }
    }


    public function saveOrder( Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $province = Province::find($request->provinceid)->name;
        $district = District::find($request->districtid)->name;
        $address = $request->address;
        $payment = $request->payment;
        $bankCode = $request->bank_code;
        $onlinePurchase = $request->online_purchase;
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);


        if (count($goods_arr) > 0) {
            $onlineOrder = $this->bookRepository->saveOrder($email, $phone,
                $name, $province, $district, $address, $payment, $goods_arr, $onlinePurchase, $bankCode, (int)$request->ship_price);

            if ($onlineOrder) {
                return $onlineOrder;
            }
            $request->session()->flush();
            return [
                "status" => 1
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Bạn chưa đặt cuốn sách nào"
            ];
        }
    }

    public function provinces()
    {
        $provinces = Province::get();
        return [
            'provinces' => $provinces,
        ];
    }

    public function districts( $provinceId)
    {
        $province = Province::find($provinceId);
        return [
            'districts' => $province->districts,
        ];
    }

    public function flush( Request $request)
    {
        $request->session()->flush();
    }

    public function checkout()
    {
        return view('graphics::checkout');
    }

    public function checkoutSuccess()
    {
        return view('graphics::checkout_success');
    }

//    public function createCheckout()
//    {
//        $nlcheckout = new NganLuong();
//
//        $total_amount = $_POST['total_amount'];
//
//        $array_items[0] = array('item_name1' => 'Product name',
//            'item_quantity1' => 1,
//            'item_amount1' => $total_amount,
//            'item_url1' => 'http://nganluong.vn/');
//
//        $array_items = array();
//        $payment_method = $_POST['option_payment'];
//        $bank_code = @$_POST['bankcode'];
//        $order_code = "macode_" . time();
//
//        $payment_type = "1";
//        $discount_amount = 0;
//        $order_description = '';
//        $tax_amount = 0;
//        $fee_shipping = 0;
//        $return_url = 'http://localhost/nganluong.vn/checkoutv3/payment_success.php';
//        $cancel_url = urlencode('http://localhost/nganluong.vn/checkoutv3?orderid=' . $order_code);
//
//        $buyer_fullname = $_POST['buyer_fullname'];
//        $buyer_email = $_POST['buyer_email'];
//        $buyer_mobile = $_POST['buyer_mobile'];
//
//        $buyer_address = '';
//
//
//        if ($payment_method != '' && $buyer_email != "" && $buyer_mobile != "" && $buyer_fullname != "" && filter_var($buyer_email, FILTER_VALIDATE_EMAIL)) {
//            if ($payment_method == "VISA") {
//
//                $nl_result = $nlcheckout->VisaCheckout($order_code, $total_amount, $payment_type, $order_description, $tax_amount,
//                    $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile,
//                    $buyer_address, $array_items, $bank_code);
//
//            } elseif ($payment_method == "NL") {
//                $nl_result = $nlcheckout->NLCheckout($order_code, $total_amount, $payment_type, $order_description, $tax_amount,
//                    $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile,
//                    $buyer_address, $array_items);
//
//            } elseif ($payment_method == "ATM_ONLINE" && $bank_code != '') {
//                $nl_result = $nlcheckout->BankCheckout($order_code, $total_amount, $bank_code, $payment_type, $order_description, $tax_amount,
//                    $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile,
//                    $buyer_address, $array_items);
//            } elseif ($payment_method == "NH_OFFLINE") {
//                $nl_result = $nlcheckout->officeBankCheckout($order_code, $total_amount, $bank_code, $payment_type, $order_description, $tax_amount, $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile, $buyer_address, $array_items);
//            } elseif ($payment_method == "ATM_OFFLINE") {
//                $nl_result = $nlcheckout->BankOfflineCheckout($order_code, $total_amount, $bank_code, $payment_type, $order_description, $tax_amount, $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile, $buyer_address, $array_items);
//
//            } elseif ($payment_method == "IB_ONLINE") {
//                $nl_result = $nlcheckout->IBCheckout($order_code, $total_amount, $bank_code, $payment_type, $order_description, $tax_amount, $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile, $buyer_address, $array_items);
//            } elseif ($payment_method == "CREDIT_CARD_PREPAID") {
//
//                $nl_result = $nlcheckout->PrepaidVisaCheckout($order_code, $total_amount, $payment_type, $order_description, $tax_amount, $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile, $buyer_address, $array_items, $bank_code);
//            }
//        }
////        dd($nl_result);
//        return [
//            "checkout_url" => $nl_result->checkout_url . "",
//            "error_code" => $nlcheckout->GetErrorMessage($nl_result->error_code)
//        ];
//    }
}
