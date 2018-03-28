<?php

namespace Modules\EduMainPage\Http\Controllers;

use App\Base;
use App\Course;
use App\Gen;
use App\Product;
use App\Register;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class EduMainPageController extends Controller
{
    protected $EDU_VIEW;
    protected $courses;

    public function __construct()
    {
        $this->EDU_VIEW = config("app.edu_view");
        $this->courses = Course::orderBy("created_at", "desc")->where('status',1)->get();
    }

    public function index()
    {
        $blogs = Product::where("type", 2)->orderBy("created_at", "desc")->limit(3)->get();

        return view("$this->EDU_VIEW::index", [
            "blogs" => $blogs,
            "courses" => $this->courses
        ]);
    }

    public function aboutUs()
    {
        return view("$this->EDU_VIEW::about_us");
    }

    public function blog(Request $request)
    {
        $blogs = Product::where("type", 2)->orderBy("created_at", "desc")->paginate(6);
        $display = "";
        if ($request->page == null) {
            $page_id = 2;
        } else {
            $page_id = $request->page + 1;
        }
        if ($blogs->lastPage() == $page_id - 1) {
            $display = "display:none";
        }
        return view("$this->EDU_VIEW::blogs", [
            "blogs" => $blogs,
            "page_id" => $page_id,
            "display" => $display,
        ]);
    }

    public function register($courseId = null, $campaignId = null, $salerId = null)
    {
        $course = Course::find($courseId);
        $current_gen = Gen::getCurrentGen();

        $date_start = $course->classes->sortbyDesc("datestart")->first();
        if ($date_start) {
            $this->data["date_start"] = date("d-m-Y", strtotime($date_start->datestart));
        }

        $this->data["current_gen_id"] = $current_gen->id;
        $this->data["course_id"] = $courseId;
        $this->data["course"] = $course;
        $this->data["bases"] = Base::all()->filter(function ($base) use ($courseId, $current_gen) {
            return $base->classes()->where("course_id", $courseId)->where("gen_id", $current_gen->id)->count() > 0;
        });
        $this->data["courses"] = $this->courses;

        $this->data["saler_id"] = $salerId;
        $this->data["campaign_id"] = $campaignId;
        return view("$this->EDU_VIEW::register", $this->data);
    }

    public function post($post_id)
    {
        $post = Product::find($post_id);
        $post->author;
        $post->category;
        $post->url = config("app.protocol") . $post->url;
        if (trim($post->author->avatar_url) === "") {
            $post->author->avatar_url = config("app.protocol") . "d2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png";
        } else {
            $post->author->avatar_url = config("app.protocol") . $post->author->avatar_url;
        }
        $posts_related = Product::where("id", "<>", $post_id)->inRandomOrder()->limit(3)->get();
        $posts_related = $posts_related->map(function ($p) {
            $p->url = config("app.protocol") . $p->url;
            return $p;
        });
        $post->comments = $post->comments->map(function ($comment) {
            $comment->commenter->avatar_url = config("app.protocol") . $comment->commenter->avatar_url;

            return $comment;
        });
        return view(
            "$this->EDU_VIEW::post",
            [
                "post" => $post,
                "posts_related" => $posts_related
            ]
        );
    }

    public function courses()
    {
        $courses = Course::all();
        return view(
            "$this->EDU_VIEW::course",
            [
                "courses" => $courses
            ]
        );
    }

    public function codeForm()
    {
        return view("$this->EDU_VIEW::code_form");
    }

    public function check(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "code" => "required"
        ]);
        if ($validator->fails()) {
            return redirect("/code-form")
                ->withErrors($validator)
                ->withInput();
        }
        $register_count = Register::where("code", $request->code)->count();
        if ($register_count == 0) {
            return redirect("/code-form")
                ->withErrors([
                    "register" => "not found"
                ])->withInput();
        }
        $register = Register::where("code", $request->code)->first();
        $this->data["register"] = $register;
        $this->data["user"] = $register->user;
        $this->data["studyClass"] = $register->studyClass;
        $this->data["course"] = $register->studyClass->course;
        return view("$this->EDU_VIEW::info", $this->data);
    }
}
