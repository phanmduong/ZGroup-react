<?php

namespace Modules\Techkids\Http\Controllers;

use App\GoodCategory;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class TechkidsController extends Controller
{
    private function getPostData($post)
    {
        $post->author;
        $post->category;
        $post->url = config('app.protocol') . $post->url;
        if (trim($post->author->avatar_url) === '') {
            $post->author->avatar_url = config('app.protocol') . 'd2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png';
        } else {
            $post->author->avatar_url = config('app.protocol') . $post->author->avatar_url;
        }
        $posts_related = Product::where('id', '<>', $post->id)->inRandomOrder()->limit(3)->get();
        $posts_related = $posts_related->map(function ($p) {
            $p->url = config('app.protocol') . $p->url;
            return $p;
        });
        $post->comments = $post->comments->map(function ($comment) {
            $comment->commenter->avatar_url = config('app.protocol') . $comment->commenter->avatar_url;

            return $comment;
        });
        $this->data['post'] = $post;
        $this->data['posts_related'] = $posts_related;
        return $this->data;
    }

    public function index()
    {
        return view('techkids::index');
    }

    public function blogs()
    {
        $blogs = Product::where('type', 2)->where('status', 1)->get();
        $blogs = $blogs->take(6);
        $this->data['blogs'] = $blogs;


        $goodCategories = GoodCategory::orderBy("created_at", "desc")->take(10)->get();
        $this->data["goodCategories"] = $goodCategories;


        return view('techkids::blogs', $this->data);
    }

    public function course()
    {
        return view('techkids::course');
    }




    public function postBySlug($slug)
    {
        $post = Product::where('slug', $slug)->first();
        if ($post == null) {
            return 'Bài viết không tồn tại';
        }
        $data = $this->getPostData($post);



        return view('techkids::blog_detail', $data);

    }

    public function postByCategory($id)
    {
        $postCategory = $id;
        $this->data['postCategory'] = $postCategory;

        return view('techkids::post_category', $this->data);
    }
}
