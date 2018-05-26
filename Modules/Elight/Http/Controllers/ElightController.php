<?php

namespace Modules\Elight\Http\Controllers;

use App\CategoryProduct;
use App\District;
use App\Course;
use App\Good;
use App\Lesson;
use App\Term;
use App\Product;
use App\Province;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;
use Modules\Elight\Repositories\BookRepository;
use App\CourseCategory;
use Illuminate\Support\Facades\DB;

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
        $newestTop3 = Product::where('type', 2)->where('category_id', 1);
        if ($newestBlog)
            $newestTop3 = $newestTop3->where('id', '<>', $newestBlog->id);
        $newestTop3 = $newestTop3->orderBy('created_at', 'desc')->limit(3)->get();
        $blogSection = CategoryProduct::find(1)->mulCatProducts()->where('status', 1)->orderBy('created_at', 'desc')->limit(4)->get();
        $blogSection1 = CategoryProduct::find(2)->mulCatProducts()->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        $blogSection2 = CategoryProduct::find(3)->mulCatProducts()->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();

        $goods = Good::where('type', 'book')->orderBy('created_at', 'desc')->limit(8)->get();
        $books = Course::orderBy('created_at', 'desc')->limit(8)->get();
        return view('elight::index', [
            'newestBlog' => $newestBlog,
            'newestTop3' => $newestTop3,
            'blogSection' => $blogSection,
            'blogSection1' => $blogSection1,
            'blogSection2' => $blogSection2,
            'books' => $books,
            'goods' => $goods,
        ]);
    }

    public function blog($subfix, Request $request)
    {
        $blogs = Product::leftJoin('product_category_product', 'product_category_product.product_id', '=', 'products.id')
            ->where('products.type', 2)->where('products.status', 1);
        $search = $request->search;
        $type = $request->type;
        $type_name = CategoryProduct::find($type);
        $type_name = $type_name ? $type_name->name : '';

        if ($search)
            $blogs = $blogs->where('products.title', 'like', '%' . $search . '%');
        if ($type)
            $blogs = $blogs->where('product_category_product.category_product_id', '=', $type);

        $blogs = $blogs->select('products.*')->groupBy('products.id');
        $blogs = $blogs->orderBy('created_at', 'desc')->paginate(6);
        $categories = CategoryProduct::orderBy('name')->get();


        $this->data['type'] = $type;
        $this->data['type_name'] = $type_name;
        $this->data['blogs'] = $blogs->map(function ($blog) {
            $data = $blog;
            $category = $blog->productCategories()->orderBy('pivot_id')->first();
            $data['category_name'] = $category ? $category->name : '';
            return $data;
        });
        $this->data['search'] = $search;
        $this->data['categories'] = $categories;

        $this->data['total_pages'] = ceil($blogs->total() / $blogs->perPage());
        $this->data['current_page'] = $blogs->currentPage();
        return view('elight::blogs', $this->data);
    }

    public function post($subfix, $post_id)
    {
        $post = Product::find($post_id);
        $post->url = config('app.protocol') . $post->url;
        if (trim($post->author->avatar_url) === '') {
            $post->author->avatar_url = config('app.protocol') . 'd2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png';
        } else {
            $post->author->avatar_url = config('app.protocol') . $post->author->avatar_url;
        }
        $categoriesId = Product::where('products.id', $post_id)
            ->join('product_category_product', 'products.id', '=', 'product_category_product.product_id')
            ->select('product_category_product.*')->groupBy('product_category_product.product_id')->pluck('category_product_id')->toArray();
        $posts_related = Product::join('product_category_product', 'products.id', '=', 'product_category_product.product_id')
            ->whereIn('product_category_product.category_product_id', $categoriesId)
            ->where('products.status', 1)
            ->where('products.id', '<>', $post_id)
            ->select('products.*')->groupBy('products.id')->orderBy('created_at', 'desc')->limit(3)->get();
        // dd($posts_related);
        $posts_related = $posts_related->map(function ($p) {
            $p->url = config('app.protocol') . $p->url;
            return $p;
        });

        $post->comments = $post->comments->map(function ($comment) {
            $comment->commenter->avatar_url = config('app.protocol') . $comment->commenter->avatar_url;

            return $comment;
        });
        return view(
            'elight::post',
            [
                'post' => $post,
                'posts_related' => $posts_related,
                'categories' => $post->productCategories()->orderBy('pivot_id')->get()
            ]
        );
    }

    public function book($subfix, $book_id, $term_id = null, $lesson_id = null)
    {
        $course = Course::find($book_id);
        $term = Term::find($term_id);
        $lesson = Lesson::find($lesson_id);
        if ($course == null) {
            return view('elight::404-not-found');
        }

        if($term == null)
            $term = $course->terms()->orderBy('order')->first();
        if ($lesson == null)
            $lesson = $term->lessons()->orderBy('order')->first();
        if ($lesson == null) {
            $terms = $course->terms()->orderBy('order')->get();
            foreach ($terms as $term) {
                $data = $term->lessons()->orderBy('order')->first();
                if ($data != null) {
                    $lesson = $data;
                    break;
                }
            }
        }

        if ($lesson == null) 
            return view('elight::404-not-lesson'); 
        $term = $lesson->term;
        $sound_cloud_track_id = sound_cloud_track_id($lesson->audio_url);
        return view('elight::book', [
            'term_id' => $term ? $term->id : $lesson->term->id,
            'lesson' => $lesson,
            'course' => $course,
            'lessons' => $course->lessons()->get()->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'name' => $lesson->name
                ];
            }),
            'track_id' => $sound_cloud_track_id,
            'terms' => $course->terms->filter(function ($term) {
                return $term->lessons->count() > 0;
            })
        ]);
    }

    public function allBooks($subfix, Request $request)
    {
        $books = Course::leftJoin('course_course_category', 'courses.id', '=', 'course_course_category.course_id');
        if ($request->search)
            $books = $books->where('courses.name', 'like', "%$request->search%");
        if ($request->category_id)
            $books = $books->where('course_course_category.course_category_id', '=', $request->category_id);
        $books = $books->where('courses.status', 1);
        $books = $books->select('courses.*')->groupBy('courses.id');

        $books = $books->orderBy('order_number', 'asc')->paginate(8);

        $categories = CourseCategory::join('course_course_category', 'course_categories.id', '=', 'course_course_category.course_category_id')
            ->select('course_categories.*', DB::raw('count(*) as count'))->groupBy('course_categories.id')->having('count', '>', 0)->get();

        return view('elight::library', [
            'books' => $books,
            'search' => $request->search,
            'categories' => $categories,
            'category_id' => $request->category_id,
            'total_pages' => ceil($books->total() / $books->perPage()),
            'current_page' => $books->currentPage(),
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
                $goods[] = $good;
            }
        }

        $totalPrice = 0;

        foreach ($goods as $good) {
            $totalPrice += $good->price * $good->number;
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
        $address = $request->address;
        $payment = $request->payment;
        $goods_str = $request->session()->get('goods');
        $goods_arr = json_decode($goods_str);
        if (count($goods_arr) > 0) {
            $this->bookRepository->saveOrder($email, $phone, $name, "", "", $address, $payment, $goods_arr);
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
        return view('emails.elight_aboutus');
        $request->session()->flush();
    }
}