<?php

namespace Modules\Alibaba\Http\Controllers;

use App\Base;
use App\Course;
use App\Gen;
use App\Product;
use App\Register;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

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

    public function register($subfix, $courseId = null, $campaignId = null, $salerId = null)
    {

        $course = Course::find($courseId);
        $courses = Course::all();
        $current_gen = Gen::getCurrentGen();

        $date_start = $course->classes->sortbyDesc('datestart')->first();
        if ($date_start) {
            $this->data['date_start'] = date("d-m-Y", strtotime($date_start->datestart));
        }

        $this->data['current_gen_id'] = $current_gen->id;
        $this->data['course_id'] = $courseId;
        $this->data['course'] = $course;
        $this->data['bases'] = Base::all()->filter(function ($base) use ($courseId, $current_gen) {
            return $base->classes()->where('course_id', $courseId)->where('gen_id', $current_gen->id)->count() > 0;
        });
        $this->data['courses'] = $courses;

        $this->data['saler_id'] = $salerId;
        $this->data['campaign_id'] = $campaignId;
        return view('alibaba::register', $this->data);
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

    public function courses($subfix)
    {
        $courses = Course::all();
        return view('alibaba::course',
            [
                'courses' => $courses
            ]
        );
    }

    public function codeForm($subfix)
    {
        return view('alibaba::code_form');
    }

    public function check($subfix, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required'
        ]);
        if ($validator->fails()) {
            return redirect('/code-form')
                ->withErrors($validator)
                ->withInput();
        }
        $register_count = Register::where('code', $request->code)->count();
        if ($register_count == 0)
            return redirect('/code-form')
                ->withErrors([
                    'register' => 'not found'
                ])->withInput();
        $register = Register::where('code', $request->code)->first();
        $this->data['register'] = $register;
        $this->data['user'] = $register->user;
        $this->data['studyClass'] = $register->studyClass;
        $this->data['course'] = $register->studyClass->course;
        return view('alibaba::info', $this->data);
    }
}
