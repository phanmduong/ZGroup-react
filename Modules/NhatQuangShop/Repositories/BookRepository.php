<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 11/13/17
 * Time: 10:54 AM
 */

namespace Modules\NhatQuangShop\Repositories;


use App\Good;
use App\Order;
use App\ShipInfor;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;
use App\Currency;

class BookRepository
{
    public function getAllBooks()
    {
        $books = Good::where('type', 'book')->where('display_status', 1)->get();
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookData = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'name' => $book->name,
                'description' => $book->description,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
                if ($property->name == "short_description") $bookData[$property->name] = $property->value;
                if ($property->name == "coupon_value") $bookData[$property->name] = $property->value;
            }

            $book_arr[] = $bookData;
        }
        return $book_arr;
    }

    public function getBookDetail($bookId)
    {
        $book = Good::find($bookId);
        if ($book == null || $book->type != "book")
            return $this->respondErrorWithStatus("Không tồn tại sách");
        $properties = GoodProperty::where('good_id', $book->id)->get();
        $bookData = [
            'id' => $book->id,
            'cover' => $book->cover_url,
            'avatar' => $book->avatar_url,
            'name' => $book->name,
            'price' => $book->price
        ];
        foreach ($properties as $property) {
            $bookData[$property->name] = $property->value;
        }
        return $bookData;
    }

    private function sendOrderToNganLuong($total_amount, $order_code, $payment_method,
                                          $bank_code, $buyer_fullname,
                                          $buyer_address,
                                          $buyer_email, $buyer_mobile)
    {
        $nlcheckout = new NganLuong();


        $array_items = array();

        $payment_type = "1";
        $discount_amount = 0;
        $order_description = '';
        $tax_amount = 0;
        $fee_shipping = 0;
        $return_url = 'http://graphics.test/nganluongapi/order/' . $order_code . "/money/" . $total_amount . "/complete?hash=" . Hash::make($order_code);
        $cancel_url = urlencode('http://graphics.vn');

//        dd($payment_method);
//        dd($buyer_email);
//        dd($buyer_mobile);
//        dd($buyer_fullname);
//        dd($buyer_email);

        if ($payment_method != '' && $buyer_email != "" && $buyer_mobile != "" && $buyer_fullname != "" && filter_var($buyer_email, FILTER_VALIDATE_EMAIL)) {
            if ($payment_method == "VISA") {

                $nl_result = $nlcheckout->VisaCheckout($order_code, $total_amount, $payment_type, $order_description, $tax_amount,
                    $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile,
                    $buyer_address, $array_items, $bank_code);

            } elseif ($payment_method == "ATM_ONLINE" && $bank_code != '') {
                $nl_result = $nlcheckout->BankCheckout($order_code, $total_amount, $bank_code, $payment_type, $order_description, $tax_amount,
                    $fee_shipping, $discount_amount, $return_url, $cancel_url, $buyer_fullname, $buyer_email, $buyer_mobile,
                    $buyer_address, $array_items);
            } else {
                return [
                    "status" => 0,
                    "message" => "Không có phương thức thanh toán phù hợp"
                ];
            }

            return [
                "status" => 1,
                "checkout_url" => $nl_result->checkout_url . "",
                "message" => $nlcheckout->GetErrorMessage($nl_result->error_code)
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Thiếu dữ liệu thanh toán"
            ];
        }

    }

    public function saveOrder($email, $phone, $name, $province, $district, $address, $payment, $goods_arr,
                              $onlinePurchase = "", $bankCode = "", $shipPrice = 0)
    {
        $user = User::where(function ($query) use ($email, $phone) {
            $query->where("email", $email)->orWhere("phone", $email);
        })->first();

        if ($user == null) {
            $user = new User;
        }
        $user->name = $name;
        $user->email = $email;
        $user->phone = $phone;
        $user->address = $address;
        $user->type = "customer";
        $user->save();

        $ship_infor = new ShipInfor;
        $ship_infor->name = $name;
        $ship_infor->phone = $phone;
        $ship_infor->province = $province;
        $ship_infor->district = $district;
        $ship_infor->address = $address;
        $ship_infor->save();

        $order = new Order();
        $order->user_id = $user->id;
        $order->email = $user->email;
        $order->payment = $payment;
        $order->status = "place_order";
        $order->address = $address;
        $order->ship_infor_id = $ship_infor->id;
        $order->status_paid = 0;
        $order->type = "order";
        $orders_count = Order::where('type', 'order')->where('created_at', '>=', Carbon::today())->count();
        $order->code = 'ORDER' . rebuild_date('Ymd', strtotime(Carbon::now()->toDateTimeString())) . str_pad($orders_count + 1, 4, '0', STR_PAD_LEFT);

        $order->save();


        if ($goods_arr) {
            foreach ($goods_arr as $item) {
                $good = Good::find($item->id);
                $order->goods()->attach($item->id, [
                    "quantity" => $item->number,
                    "price" => $item->price - $item->discount_value,
                    'discount_money' => $item->discount_value,
                ]);
            }
        }

        $total_price = $shipPrice;
        $goods = $order->goods;
        foreach ($goods as &$good) {
//            $coupon = $good->properties()->where("name", "coupon_value")->first()->value;
//            $good->coupon_value = $coupon;
            $coupon = 0;
            $total_price += $good->price * (1 - $coupon) * $good->pivot->quantity;
        }
//        $subject = "Xác nhận đặt hàng thành công";
//        $data = ["order" => $order, "total_price" => $total_price, "goods" => $goods, "user" => $user];
//        $emailcc = ["graphics@colorme.vn"];
//        Mail::send('emails.confirm_buy_book', $data, function ($m) use ($order, $subject, $emailcc) {
//            $m->from('no-reply@colorme.vn', 'Graphics');
//            $m->to($order->email, $order->name)->bcc($emailcc)->subject($subject);
//        });
        if ($payment === "Thanh toán online") {
            $base = 0;
            $percent = 0;
//            if ($onlinePurchase === "VISA") {
//                $base = 5500;
//                $percent = 0.03;
//            }
            if ($onlinePurchase === "ATM_ONLINE") {
                $base = 1760;
                $percent = 0.011;
            }
            $sendPrice = ($total_price - $base) / (1 + $percent);
            return $this->sendOrderToNganLuong($sendPrice, $order->id, $onlinePurchase, $bankCode, $name,
                $address . ", " . $district . ", " . $province, $email, $phone);
        }
        return null;
    }

    public function saveDeliveryOrder($email, $address, $user_id, $goods_arr, $todayOrderCount)
    {
        if ($goods_arr) {
            foreach ($goods_arr as $good) {
                if ($good->link === "") {
                    return [
                        "status" => 0,
                        "message" => "Bạn chưa nhập đầy đủ thông tin"
                    ];
                    break;
                }
                if ($good->currencyId == 0)
                    return [
                        'status' => 0,
                        "message" => "Xin bạn vui lòng chọn tiền tệ"
                    ];
            }
            foreach ($goods_arr as $good) {
                $order = new Order;
                $currency = Currency::find($good->currencyId);
                $order->code = rebuild_date('ymd', strtotime(Carbon::now()->toDateTimeString())) . str_pad(++$todayOrderCount, 4, '0', STR_PAD_LEFT);
                $order->user_id = $user_id;
                $order->address = $address;
                $order->email = $email;
                $order->quantity = $good->number;
                $order->type = "delivery";
                $order->price = $good->number * $currency->ratio * $good->price;
                $order->status = 'place_order';
                $object = new \stdClass();
                $object = [
                    'size' => $good->size,
                    'link' => $good->link,
                    'color' => $good->color,
                    'description' => $good->description,
                    'quantity' => $good->number,
                    'sale_off' => 0,
                    'weight' => 0,
                    'tax' => $good->tax,
                    'price' => $good->price,
                    'ratio' => $currency->ratio,
                    'money' => 0,
                    'fee' => 0,
                    'code' => '',
                    'endTime' => "",
                    'currency_id' => $good->currencyId,
                ];
                //{"tax":"Gi\u00e1 c\u00f3 thu\u1ebf","size":"dsf","color":"asdd","link":"asdasdk","describe":""}
                // {"size":"N","link":"facebook","color":"pink","description":"run rrun run","quantity":"3","
                    // sale_off":"5","weight":0,"tax":"false","price":"15000","unit":"","ratio":1,"money":513000,"fee":0,"code":"ffffffff","endTime":"","currency_id":3}
                // $object->tax = $good->tax;
                // $object->size = $good->size;
                // $object->color = $good->color;
                // $object->link = $good->link;
                // $object->describe = $good->describe;
                $order->attach_info = json_encode($object);
                $order->save();
            }
        }
        return [
            "status" => 1,
            "message" => "Xác nhận gửi thành công đơn hàng",
        ];
    }
}