<?php

namespace Modules\Elight\Http\Controllers;

use App\Course;
use App\Good;
use App\Lesson;
use App\Product;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class ElightController extends Controller
{
    public function index()
    {
        $newestBlog = Product::where('type', 2)->where('category_id', 1)->orderBy('created_at', 'desc')->first();
        $newestTop3 = Product::where('type', 2)->where('category_id', 1)->where('id', '<>', $newestBlog->id)->orderBy('created_at', 'desc')->limit(3)->get();
        $blogSection1 = Product::where('type', 2)->where('category_id', 2)->orderBy('created_at', 'desc')->limit(2)->get();
        $blogSection2 = Product::where('type', 2)->where('category_id', 3)->orderBy('created_at', 'desc')->limit(3)->get();
        $books = Good::where('type', 'book')->orderBy('created_at', 'desc')->limit(8)->get();
        return view('elight::index', [
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

    public function book($subfix, $book_id, $lesson_id)
    {
        $lesson = Lesson::find($lesson_id);

        $book = Course::find($book_id);
        if ($book == null) {
            return view('elight::404-not-found');
        }

        if ($lesson == null) {
            $term = $book->terms()->orderBy('order')->first();
            $lesson = $term->lessons()->orderBy('order')->first();
        }

        return view('elight::book', [
            'book' => $book,
            'lesson' => $lesson
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
}
