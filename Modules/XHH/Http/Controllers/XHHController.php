<?php

namespace Modules\XHH\Http\Controllers;

use App\Good;
use App\Product;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class XHHController extends Controller
{
    public function index()
    {
        $newestBlog = Product::where('type', 2)->orderBy('created_at', 'desc')->first();
        $newestTop3 = Product::where('type', 2)->where('id', '<>', $newestBlog->id)->orderBy('created_at', 'desc')->limit(3)->get();
        $blogSection1 = Product::where('type', 2)->where('category_id', 2)->orderBy('created_at', 'desc')->limit(2)->get();
        $blogSection2 = Product::where('type', 2)->where('category_id', 3)->orderBy('created_at', 'desc')->limit(3)->get();
        $books = Good::where('type', 'book')->orderBy('created_at', 'desc')->limit(8)->get();
        return view('xhh::index', [
            'newestBlog' => $newestBlog,
            'newestTop3' => $newestTop3,
            'blogSection1' => $blogSection1,
            'blogSection2' => $blogSection2,
            'books' => $books
        ]);
    }

    public function blog($subfix, Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(6);
        $display = "";
        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $page_id - 1) $display = "display:none";
        return view('xhh::blogs', [
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
        return view('xhh::post',
            [
                'post' => $post,
                'posts_related' => $posts_related
            ]
        );
    }

    public function book($subfix, $book_id)
    {
        $book = Good::find($book_id);
        $newestBooks = Good::where('type', 'book')->where('id', '<>', $book_id)->limit(4)->get();
        return view('xhh::book', [
            'book' => $book,
            'newestBooks' => $newestBooks
        ]);
    }

    public function allBooks($subfix)
    {
        $books = Good::where('type', 'book')->get();
        return view('xhh::library', [
            'books' => $books,
        ]);
    }

    public function aboutUs($subfix)
    {
        return view('xhh::about-us');
    }

    public function contactUs($subfix)
    {
        return view('xhh::contact-us');
    }
}
