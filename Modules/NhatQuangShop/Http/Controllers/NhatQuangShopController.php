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
use Modules\NhatQuangShop\Repositories\BookRepository;
use Modules\Order\Repositories\OrderService;

class NhatQuangShopController extends Controller
{
    private $bookRepository;
    protected $data;
    protected $user;

    public function __construct(BookRepository $bookRepository, OrderService $oderService)
    {
        $this->bookRepository = $bookRepository;
        $this->orderService = $oderService;
        $this->data = array();
        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function index()
    {
        $goodQuery = Good::where('display_status', 1)->groupBy('code');
        $newestGoods = $goodQuery->orderBy("created_at", "desc")->take(8)->get();
        $generalGoods = $goodQuery->take(8)->get();
        $highLightGoods = $goodQuery->where("highlight_status", 1)->orderBy("updated_at", "desc")->take(8)->get();

        $generalGoods = $generalGoods->map(function ($good) {
            return $good->transformAllProperties();
        });
        $this->data["generalGoods"] = $generalGoods;
        $this->data["newestGoods"] = $newestGoods;
        $this->data["highLightGoods"] = $highLightGoods;
        return view('nhatquangshop::index', $this->data);
    }

    public function productNew(Request $request)
    {
        $search = $request->search;
        if ($search == null) {
            $products = Good::groupBy('code')->where('name', 'like', '%' . "$search" . '%')->orderBy('created_at', 'desc')
                ->paginate(20);
        } else {
            $products = Good::groupBy('code')->where('name', 'like', '%' . "$search" . '%')
                ->orWhere('code', 'like', '%' . "$search" . '%')
                ->orWhere('description', 'like', '%' . "$search" . '%')
                ->paginate(20);
        }
        $this->data["products"] = $products;
        return view('nhatquangshop::product_new', $this->data);
    }

    public function productFeature(Request $request)
    {
        $search = $request->search;
        if ($search == null) {
            $products = Good::groupBy('code')->where('highlight_status', '=', '1')->orderBy('created_at', 'desc')
                ->paginate(20);
        } else {
            $products = Good::groupBy('code')->where('name', 'like', '%' . "$search" . '%')
                ->orWhere('code', 'like', '%' . "$search" . '%')
                ->orWhere('description', 'like', '%' . "$search" . '%')
                ->andWhere('highlight_status', '=', '1')
                ->paginate(20);
        }
        $this->data["products"] = $products;
        return view('nhatquangshop::product_feature', $this->data);
    }

    public function productDetail()
    {
        return view('nhatquangshop::product_detail');
    }

    public function about_us()
    {
        return view('nhatquangshop::about_us');
    }
    
    public function book($good_id)
    {
        $book = Good::find($good_id);
        if ($book == null)
            return view('nhatquangshop::404');
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
        return view('nhatquangshop::book', [
            'properties' => $data,
        ]);
    }

    public function contact_us()
    {
        return view('nhatquangshop::contact_us');
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

    public function post($post_id)
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
        return view('nhatquangshop::post',
            [
                'post' => $post,
                'posts_related' => $posts_related
            ]
        );
    }

    public function blog(Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(6);
        $display = "";
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $request->page) $display = "display:none";
        return view('nhatquangshop::blogs', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
        ]);
    }

    public function saveOrder(Request $request)
    {
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $email = $request->email;
        $name = $request->name;
        $phone = $phone;
        $address = $request->address;
        $payment = $request->payment;

        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);

        if (count($goods_arr) > 0) {
//            $this->bookRepository->saveOrder($email, $phone, $name, $address, $payment, $goods_arr);
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

    //code api dat hang nhanh
    public function saveFastOrder(Request $request)
    {
        $user = Auth::user();
        $email = $user->email;
        $user_id = $user->id;
        $address = $user->address;

        $fast_orders = json_decode($request->fastOrders);
        $response = $this->bookRepository->saveFastOrder($email, $address, $user_id, $fast_orders, $this->orderService->getTodayOrderId('delivery'));
        if ($response['status'] === 1) {
            return [
                "fast_order" => $fast_orders,
                "status" => 1,
                "message" => $response['message'],
            ];
        }
        return [
            "status" => 0,
            "message" => $response['message'],
        ];
    }

    public function test(Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(9);
        $display = "";
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $request->page) $display = "display:none";
        return view('nhatquangshop::test', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->intended("/");
    }
    // code cua cuong

}
