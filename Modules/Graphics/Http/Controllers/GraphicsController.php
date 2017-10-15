<?php

namespace Modules\Graphics\Http\Controllers;

use App\Good;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;

class GraphicsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $books = Good::where('type', 'book')->get();
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'type' => $book->type,
                'name' => $book->name,
                'description' => $book->description,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
                $bookdata[$property->name] = $property->value;
            }
            $book_arr[] = $bookdata;
        }
        return view('graphics::index', [
            'books' => $book_arr,
        ]);
    }

    public function aboutUs()
    {
        return view('graphics::about_us');
    }

    public function addGoodToCart($goodId, Request $request)
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

    public function removeBookFromCart($goodId, Request $request)
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

    public function getGoodsFromSession(Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);

        $goods = [];

        foreach ($goods_arr as $item) {
            $good = Good::find($item->id);
            $good->number = $item->number;
            $goods[] = $good;
        }

        $totalPrice = 0;

        foreach ($goods as $good) {
            $totalPrice += $good->price * $good->number;
        }
        $data = [
            "books" => $goods,
            "total_price" => $totalPrice
        ];
        return view("graphics::goods_cart", $data);
    }

    public function book($good_id)
    {
        $good = Good::find($good_id);
        $properties = GoodProperty::where('good_id', $good_id)->get();

        $data = [
            'cover' => $good->cover_url,
            'avatar' => $good->avatar_url,
            'type' => $good->type,
            'name' => $good->name
        ];
        foreach ($properties as $property) {
            $data[$property->name] = $property->value;
        }
        return view('graphics::book', [
            'properties' => $data,
        ]);
    }

    public function contact_us()
    {
        return view('graphics::contact_us');
    }

    public function contact_info(Request $request)
    {
        $data = ['email' => $request->email, 'name' => $request->name, 'message_str' => $request->message_str];

        Mail::send('emails.contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Graphics');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->subject($subject);
        });
        Mail::send('emails.contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Graphics');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->subject($subject);
        });
        return "OK";
    }
}
