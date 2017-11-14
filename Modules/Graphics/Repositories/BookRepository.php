<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 11/13/17
 * Time: 10:54 AM
 */

namespace Modules\Graphics\Repositories;


use App\Good;
use App\Order;
use App\User;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;

class BookRepository
{
    public function getAllBooks()
    {
        $books = Good::where('type', 'book')->get();
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

    public function saveOrder($email, $phone, $name, $address, $payment, $goods_arr)
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

        $order = new Order();
        $order->user_id = $user->id;
        $order->email = $user->email;
        $order->payment = $payment;
        $order->status = "place_order";
        $order->status_paid = 0;
        $order->type = "order";
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
    }
}