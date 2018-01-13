<?php

namespace Modules\XHH\Http\Controllers;

use App\Good;
use App\Product;
use Faker\Provider\DateTime;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class XHHController extends Controller
{
    public function index()
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");

        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
        $totalBlogs = Product::where('type', 2)->count();
        $newestBlog = Product::where('type', 2)->orderBy('created_at', 'desc')->first();
        if ($newestBlog) {
            $newestTop3 = Product::where('type', 2)->where('id', '<>', $newestBlog->id)->orderBy('created_at', 'desc')->limit(3)->get();
        } else {
            $newestTop3 = Product::where('type', 2)->orderBy('created_at', 'desc')->limit(3)->get();
        }
        $blogSection1 = Product::where('type', 2)->where('category_id', 2)->orderBy('created_at', 'desc')->limit(2)->get();
        $blogSection2 = Product::where('type', 2)->where('category_id', 3)->orderBy('created_at', 'desc')->limit(3)->get();
        $newestBlog2 = Product::where('type', 2)->where('category_id', 7)->orderBy('created_at', 'desc')->first();
        if ($newestBlog2) {
            $blogSection4 = Product::where('type', 2)->where('id', '<>', $newestBlog2->id)->where('category_id', 7)->orderBy('created_at', 'desc')->limit(3)->get();
        } else {
            $blogSection4 = Product::where('type', 2)->where('category_id', 7)->orderBy('created_at', 'desc')->limit(3)->get();
        }
        $books = Good::where('type', 'book')->orderBy('created_at', 'desc')->limit(8)->get();
        return view('xhh::index', [
            'newestBlog' => $newestBlog,
            'newestTop3' => $newestTop3,
            'blogSection1' => $blogSection1,
            'blogSection2' => $blogSection2,
            'newestBlog2' => $newestBlog2,
            'blogSection4' => $blogSection4,
            'books' => $books,
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs
        ]);
    }

    public function blog($subfix, Request $request)
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
        $blogs = Product::where('type', 2);

        $search = $request->search;

        if ($search) {
            $blogs = $blogs->where('title', 'like', '%' . $search . '%');
        }

        $blogs = $blogs->orderBy('created_at', 'desc')->paginate(6);

        $display = "";
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $page_id - 1) $display = "display:none";
        return view('xhh::blogs', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs,
            'search' => $search
        ]);
    }

    public function post($subfix, $post_id)
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
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
        return view('xhh::post',
            [
                'post' => $post,
                'posts_related' => $posts_related,
                'count_new_blogs' => $countNewBlogs,
                'total_blogs' => $totalBlogs
            ]
        );
    }

    public function book($subfix, $book_id)
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
        $book = Good::find($book_id);
        $newestBooks = Good::where('type', 'book')->where('id', '<>', $book_id)->limit(4)->get();
        return view('xhh::book', [
            'book' => $book,
            'newestBooks' => $newestBooks,
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs
        ]);
    }

    public function allBooks($subfix, Request $request)
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
        $books = Good::where('type', 'book');

        $search = $request->search;
        if ($search) {
            $books = $books->leftJoin('good_properties', 'goods.id', '=', 'good_properties.good_id')
                ->where(function ($q) {
                    $q->where('good_properties.name', 'TYPE_BOOK');
                })
                ->where(function ($q) use ($search) {
                    $q->where('goods.name', 'like', '%' . $search . '%')
                        ->orWhere('goods.code', 'like', '%' . $search . '%')
                        ->orWhere(function ($q1) use ($search) {
                            $q1->where('good_properties.name', 'TYPE_BOOK')
                                ->where('good_properties.value', 'like', '%' . $search . '%');
                        });
                });
        }


        $books = $books->select('goods.*')->get();
        return view('xhh::library', [
            'books' => $books,
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs,
            'search' => $search
        ]);
    }

    public function aboutUs($subfix)
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
        return view('xhh::about-us', [
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs
        ]);
    }

    public function contactUs($subfix)
    {
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();
        return view('xhh::contact-us', [
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs
        ]);
    }
}
