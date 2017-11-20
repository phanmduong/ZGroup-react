<?php

namespace Modules\Alibaba\Http\Controllers;

use App\Product;
use App\StudyClass;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AlibabaController extends Controller
{
    public function index()
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->limit(3)->get();
        return view('alibaba::index', [
            'blogs' => $blogs
        ]);
    }

    public function aboutUs()
    {
        return view('alibaba::about_us');
    }

    public function blog($subfix, Request $request)
    {
        $blogs = Product::where('type', 2)->orderBy('created_at', 'desc')->paginate(6);
        $display = "";

        if ($request->page == null) $page_id = 2; else $page_id = $request->page + 1;
        if ($blogs->lastPage() == $page_id - 1) $display = "display:none";
        return view('alibaba::blogs', [
            'blogs' => $blogs,
            'page_id' => $page_id,
            'display' => $display,
        ]);
    }

    public function register($subfix)
    {
        $classes = StudyClass::all();

        $data = $classes->map(function ($class){
            return [
                'id' => $class->id,
                'description' => $class->description,
                'icon_url' => $class->course ? $class->course->icon_url : null,
                'datestart' => $class->datestart,
                'study_time' => $class->study_time,
                'address' => $class->base ? $class->base->address : null,
            ];
        });
        //dd(\GuzzleHttp\json_encode($data));
        return view('alibaba::register', [
            'classes' => $data
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
        return view('alibaba::post',
            [
                'post' => $post,
                'posts_related' => $posts_related
            ]
        );
    }
}
