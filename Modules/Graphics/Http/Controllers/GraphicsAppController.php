<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 10/11/2017
 * Time: 15:18
 */

namespace Modules\Graphics\Http\Controllers;


use App\Good;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NoAuthApiController;

use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;

class GraphicsAppController extends NoAuthApiController
{
    public function __construct()
    {
    }

    public function index(){
        $books = Good::where('type', 'book')->get();
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'name' => $book->name,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
               if($property->name=="short_description") $bookdata[$property->name] = $property->value;
            }
            $book_arr[] = $bookdata;
        }

        return $this->respondSuccessWithStatus([
           "books" => $book_arr
        ]);
    }

    public function detailedBook($book_id,Request $request){

        $book = Good::find($book_id);
        if($book ==null || $book->type != "book")
            return $this->respondErrorWithStatus("Không tồn tại sách");
        $book_data = [];
         $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'name' => $book->name,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
                $bookdata[$property->name] = $property->value;
            }
            $book_data[] = $bookdata;


        return $this->respondSuccessWithStatus([
            "book" => $book_data
        ]);


    }
    public function saveOrder(Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $phone = $request->phone;
        $address = $request->address;
        $payment = $request->payment;

        if(!$name) return $this->respondErrorWithStatus("Thiếu tên");
        if(!$phone) return $this->respondErrorWithStatus("Thiếu số điện thoại");
        if(!$address) return $this->respondErrorWithStatus("Thiếu địa chỉ");
        if(!$payment) return $this->respondErrorWithStatus("Thiếu phương thức thanh toán");
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->respondErrorWithStatus("Email không hợp lệ");
        }

        $user = User::where(function ($query) use ($request) {
            $query->where("email", $request->email)->orWhere("phone",$request->phone);
        }) ->get();

        if($user){

        }
        else{
            $user= new User;
            $user->name=$request->name;
            $user->email=$request->email;
            $user->phone=$request->phone;
            $user->address=$request->address;
            $user->save();
        }

        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);

        if (count($goods_arr) > 0) {
            $order = new Order();
            $order->user_id= $user->id;
            $order->payment = $payment;
            $order->status= "PLACE_ORDER";
            $order->save();


            if ($goods_arr) {
                foreach ($goods_arr as $item) {
                    $good = Good::find($item->id);
                    $order->goods()->attach($item->id, [
                        "quantity" => $item->number,
                        "price" => $good->price,
                    ]);

                }
            }
            $total_price = 0;
            $goods = $order->goods;
            foreach ($goods as &$good) {
                $coupon = $good->properties()->where("name", "coupon_value")->first()->value;
                $good->coupon_value = $coupon;
                $total_price += $good->price * (1 - $coupon) * $good->pivot->quantity;
            }
            $subject = "Xác nhận đặt hàng thành công";
            $data = ["order" => $order, "total_price" => $total_price, "goods" => $goods];
            $emailcc = ["graphics@colorme.vn"];
            Mail::send('emails.confirm_buy_book', $data, function ($m) use ($order, $subject, $emailcc) {
                $m->from('no-reply@colorme.vn', 'Graphics');
                $m->to($order->email, $order->name)->bcc($emailcc)->subject($subject);
            });
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


}