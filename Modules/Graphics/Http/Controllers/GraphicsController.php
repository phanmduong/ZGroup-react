<?php

namespace Modules\Graphics\Http\Controllers;

use App\Good;
use App\Order;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;

class GraphicsController extends Controller
{
    public function index($subfix)
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

    public function about_us($subfix)
    {
        return view('graphics::about_us');
    }

    public function addGoodToCart($subfix, $goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $number = $request->number;

        if ($goods_str) {
            $goods = json_decode($goods_str);
        } else {
            $goods = [];
        }

        $added = false;
        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                if ($number) {
                    $good->number = $number;
                } else {
                    $good->number += 1;
                }
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

    public function countGoodsFromSession($subfix, Request $request)
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

    public function removeBookFromCart($subfix, $goodId, Request $request)
    {
        $goods_str = $request->session()->get('goods');
        $number = $request->number;

        $goods = json_decode($goods_str);

        $new_goods = [];

        foreach ($goods as &$good) {
            if ($good->id == $goodId) {
                $good->number = $number;
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

    public function getGoodsFromSession($subfix, Request $request)
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
            "books" => $goods,
            "total_price" => $totalPrice
        ];
        return view("graphics::goods_cart", $data);
    }

    public function book($subfix, $good_id)
    {
        $book = Good::find($good_id);
        if ($book == null)
            return view('graphics::404');
        $properties = GoodProperty::where('good_id', $good_id)->get();

        $data = [
            'id' => $book->id,
            'cover' => $book->cover_url,
            'avatar' => $book->avatar_url,
            'type' => $book->type,
            'name' => $book->name,
            'description' => $book->description,
            'price' => $book->price
        ];
        foreach ($properties as $property) {
            $data[$property->name] = $property->value;
        }
        return view('graphics::book', [
            'properties' => $data,
        ]);
    }

    public function contact_us($subfix)
    {
        return view('graphics::contact_us');
    }

    public function contact_info($subfix, Request $request)
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

    public function post($subfix, $post_id)
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

    public function blog($subfix, Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(6);
        $display = "";
        //dd($blogs->lastPage());
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $page_id-1) $display = "display:none";
        return view('graphics::blogs', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
        ]);
    }

    public function saveOrder($subfix, Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $phone = $request->phone;
        $address = $request->address;
        $payment = $request->payment;

        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);

        if (count($goods_arr) > 0) {
            $order = new Order();
            $order->name = $name;
            $order->email = $email;
            $order->phone = $phone;
            $order->address = $address;
            $order->payment = $payment;
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
