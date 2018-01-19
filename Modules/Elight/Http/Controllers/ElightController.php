<?php

namespace Modules\Elight\Http\Controllers;

use App\District;
use App\Course;
use App\Good;
use App\Lesson;
use App\Product;
use App\Province;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;

class ElightController extends Controller
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function index()
    {
        $newestBlog = Product::where('type', 2)->where('category_id', 1)->orderBy('created_at', 'desc')->first();
        $newestTop3 = Product::where('type', 2)->where('category_id', 1)->where('id', '<>', $newestBlog->id)->orderBy('created_at', 'desc')->limit(3)->get();
        $blogSection1 = Product::where('type', 2)->where('category_id', 2)->orderBy('created_at', 'desc')->limit(2)->get();
        $blogSection2 = Product::where('type', 2)->where('category_id', 3)->orderBy('created_at', 'desc')->limit(3)->get();
        $goods = Good::where('type', 'book')->orderBy('created_at', 'desc')->limit(8)->get();
        $books = Course::orderBy('created_at', 'desc')->limit(8)->get();
        return view('elight::index', [
            'newestBlog' => $newestBlog,
            'newestTop3' => $newestTop3,
            'blogSection1' => $blogSection1,
            'blogSection2' => $blogSection2,
            'books' => $books,
            'goods' => $goods,
        ]);
    }

    public function blog($subfix, Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(6);
        $display = "";
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $page_id - 1) $display = "display:none";
        return view('elight::blogs', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
        ]);
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
        return view('elight::post',
            [
                'post' => $post,
                'posts_related' => $posts_related
            ]
        );
    }

    public function book($subfix, $book_id, $lesson_id = null)
    {
        $lesson = Lesson::find($lesson_id);

        $course = Course::find($book_id);
        if ($course == null) {
            return view('elight::404-not-found');
        }

        if ($lesson == null) {
            $term = $course->terms()->orderBy('order')->first();
            $lesson = $term->lessons()->orderBy('order')->first();
        }

        $lessons = $course->lessons()->get()->map(function ($lesson) {
            return [
                'id' => $lesson->id,
                'name' => $lesson->name
            ];
        });

        $sound_cloud_track_id = sound_cloud_track_id($lesson->audio_url);


        return view('elight::book', [
            'book' => $course,
            'lesson_selected' => $lesson,
            'lessons' => $lessons,
            'course' => $course,
            'track_id' => $sound_cloud_track_id
        ]);
    }

    public function allBooks($subfix)
    {
        $books = Course::all();
        return view('elight::library', [
            'books' => $books,
        ]);
    }

    public function aboutUs($subfix)
    {
        return view('elight::about-us');
    }

    public function contactUs($subfix)
    {
        return view('elight::contact-us');
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
            "goods" => $goods,
            "total_price" => $totalPrice
        ];

        return $data;
    }

    public function addGoodToCart($subfix, $goodId, Request $request)
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

    public function removeBookFromCart($subfix, $goodId, Request $request)
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

    public function saveOrder($subfix, Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $province = Province::find($request->provinceid)->name;
        $district = District::find($request->districtid)->name;
        $address = $request->address;
        $payment = $request->payment;
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        if (count($goods_arr) > 0) {
            $this->bookRepository->saveOrder($email, $phone, $name, $province, $district, $address, $payment, $goods_arr);
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

    public function provinces($subfix)
    {
        $provinces = Province::get();
        return [
            'provinces' => $provinces,
        ];
    }

    public function districts($subfix, $provinceId)
    {
        $province = Province::find($provinceId);
        return [
            'districts' => $province->districts,
        ];
    }

    public function flush($subfix, Request $request)
    {
        $request->session()->flush();
    }


}
