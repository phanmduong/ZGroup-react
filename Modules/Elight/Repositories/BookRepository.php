<?php
namespace Modules\Elight\Repositories;


use App\Good;
use App\Order;
use App\ShipInfor;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;

class BookRepository
{
    // public function getAllBooks()
    // {
    //     $books = Good::where('type', 'book')->where('display_status', 1)->get();
    //     $book_arr = [];
    //     foreach ($books as $book) {
    //         $properties = GoodProperty::where('good_id', $book->id)->get();
    //         $bookData = [
    //             'id' => $book->id,
    //             'cover' => $book->cover_url,
    //             'avatar' => $book->avatar_url,
    //             'name' => $book->name,
    //             'description' => $book->description,
    //             'price' => $book->price
    //         ];
    //         foreach ($properties as $property) {
    //             if ($property->name == "short_description") $bookData[$property->name] = $property->value;
    //             if ($property->name == "coupon_value") $bookData[$property->name] = $property->value;
    //         }

    //         $book_arr[] = $bookData;
    //     }
    //     return $book_arr;
    // }

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

    private function sendOrderToNganLuong(
        $total_amount,
        $order_code,
        $payment_method,
        $bank_code,
        $buyer_fullname,
        $buyer_address,
        $buyer_email,
        $buyer_mobile
    ) {
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

                $nl_result = $nlcheckout->VisaCheckout(
                    $order_code,
                    $total_amount,
                    $payment_type,
                    $order_description,
                    $tax_amount,
                    $fee_shipping,
                    $discount_amount,
                    $return_url,
                    $cancel_url,
                    $buyer_fullname,
                    $buyer_email,
                    $buyer_mobile,
                    $buyer_address,
                    $array_items,
                    $bank_code
                );

            } elseif ($payment_method == "ATM_ONLINE" && $bank_code != '') {
                $nl_result = $nlcheckout->BankCheckout(
                    $order_code,
                    $total_amount,
                    $bank_code,
                    $payment_type,
                    $order_description,
                    $tax_amount,
                    $fee_shipping,
                    $discount_amount,
                    $return_url,
                    $cancel_url,
                    $buyer_fullname,
                    $buyer_email,
                    $buyer_mobile,
                    $buyer_address,
                    $array_items
                );
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

    public function saveOrder(
        $email,
        $phone,
        $name,
        $province,
        $district,
        $address,
        $payment,
        $goods_arr,
        $onlinePurchase = "",
        $bankCode = "",
        $shipPrice = 0
    ) {
        $user = User::where(function ($query) use ($email, $phone) {
            $query->where("email", $email)->orWhere("phone", $email);
        })->first();

        if ($user == null) {
            $user = new User;
            $user->name = $name;
        }
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
        $order->code = "ORDER" . rebuild_date('YmdHis', strtotime(Carbon::now()->toDateTimeString()));
        $order->save();

        $quantity = 0;

        if ($goods_arr) {
            foreach ($goods_arr as $item) {
                $good = Good::find($item->id);
                $quantity += $item->number;
                $order->goods()->attach($item->id, [
                    "quantity" => $item->number,
                    "price" => $good->price,
                ]);
            }
        }

        $total_price = $shipPrice;
        $goods = $order->goods;
        foreach ($goods as &$good) {
            $total_price += $good->price * $good->pivot->quantity;
        }
        $subject = $ship_infor->name . " Elight XÁC NHẬN ĐƠN HÀNG";
        $data = ["order" => $order, "total_price" => $total_price, "goods" => $goods, "user" => $user];
        $emailcc = ["elightedu.books@gmail.com"];
        Mail::send('emails.confirm_buy_book_elight', $data, function ($m) use ($order, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Nhà sách Elight');
            $m->to($order->email, $order->name)->subject($subject);
        });

        $staff_data = [
            'user' => $user,
            'quantity' => $quantity,
            'order' => $order,
            'time' => date('n/d/Y H:i:s')
        ];

        Mail::send('emails.elight_confirm_buy_book_staff', $staff_data, function ($m) {
            $m->from('no-reply@colorme.vn', 'ELIGHT BOOK');
            // $m->to("datvithanh98@gmail.com")->subject('ĐƠN HÀNG ĐẶT MUA SÁCH TIẾNG ANH CƠ BẢN');
            $m->to("elightedu.books@gmail.com")->subject('ĐƠN HÀNG ĐẶT MUA SÁCH TIẾNG ANH CƠ BẢN');
        });

        return null;
    }
}