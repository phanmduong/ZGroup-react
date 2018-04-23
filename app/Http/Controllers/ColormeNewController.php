<?php

namespace App\Http\Controllers;

use App\Base;
use App\Colorme\Transformers\CourseTransformer;
use App\Colorme\Transformers\ProductTransformer;
use App\Course;
use App\Gen;
use App\Lesson;
use App\Order;
use App\Repositories\CourseRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\CourseCategory;
use App\Product;
use Illuminate\Support\Facades\DB;
use App\Comment;

class ColormeNewController extends CrawlController
{
    protected $productTransformer;
    protected $courseTransformer;
    protected $courseRepository;

    public function __construct(ProductTransformer $productTransformer, CourseTransformer $courseTransformer, CourseRepository $courseRepository)
    {
        parent::__construct();
        $this->productTransformer = $productTransformer;
        $this->courseTransformer = $courseTransformer;
        $this->courseRepository = $courseRepository;
        $bases = Base::orderBy('created_at')->get();
        $courses = Course::where('status', '1')->orderBy('created_at', 'asc')->get();
        $this->data['courses'] = $courses;
        $this->data['paid_courses'] = $this->courseRepository->paid_courses($this->user);
        $this->data['bases'] = $bases;
    }

    public function home($saler_id = null, $campaign_id = null)
    {
        $current_gen = Gen::getCurrentGen();
        $categories = CourseCategory::all();
        $categories = $categories->filter(function ($category) {
            $courses = $category->courses;
            $courses_count = $courses->reduce(function ($count, $course) {
                return $count + $course->status;
            }, 0);
            return $courses_count > 0;
        });

        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $this->data['gen_cover'] = $current_gen->cover_url;
        $this->data['saler'] = User::find($saler_id);
        $this->data['categories'] = $categories;
        return view('colorme_new.home', $this->data);
    }

    public function course($course_id, $saler_id = null, $campaign_id = null)
    {
        $course = Course::find($course_id);
        if ($course == null) {
            $courses = Course::all();
            foreach ($courses as $key) {
                if (convert_vi_to_en($key->name) === $course_id) {
                    $course = $key;
                }
            }
        }
        $course_id = $course->id;
        $current_gen = Gen::getCurrentGen();
        $this->data['current_gen_id'] = $current_gen->id;
        $this->data['gen_cover'] = $current_gen->cover_url;
        $this->data['course'] = $course;
        $this->data['course_id'] = $course_id;
        $this->data['bases'] = Base::orderBy('created_at', 'asc')->get()->filter(function ($base) use ($course_id, $current_gen) {
            return $base->classes()->where('course_id', $course_id)->where('gen_id', $current_gen->id)->count() > 0;
        });
        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $this->data['pixels'] = $course->coursePixels;
        $this->data['saler'] = User::find($saler_id);
        return view('colorme_new.course', $this->data);
    }

    public function confirmEmailSuccess(Request $request)
    {
        $token = $request->token;
        $name = $request->name;
        $hash = $request->hash;
        $email = $request->email;
        $phone = $request->phone;

        if ($this->user) {
            return redirect('/');
        }

        if (Hash::check($name . $email . $phone . $hash, $token)) {
            $user = User::where('email', $email)->first();

            if ($user == null) {
                $user = new User();
            }

            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->email;
            $user->phone = $phone;
            $user->password = $hash;

            $user->save();
            return view('colorme_new.email_verified', $this->data);
        } else {
            return 'Đường link không chính xác';
        }
    }

    public function courseOnline($courseId, $lessonId = null)
    {
        $lesson = Lesson::find($lessonId);

        $course = Course::find($courseId);

        if ($course == null) {
            return view('colorme_new.404.not_found_course', $this->data);
        }

        $this->data['course'] = $course;

        if ($this->user == null || $this->user->registers()->where('course_id', $course->id)->where('status', 1)->first() == null) {
            return view('colorme_new.course_detail', $this->data);
        }

        if ($lesson == null) {
            $term = $course->terms()->orderBy('order')->first();
            if ($term) {
                $lesson = $term->lessons()->orderBy('order')->first();
            }
        }

        if ($lesson == null) {
            return view('colorme_new.404.not_found_lesson', $this->data);
        }

        $lessons = $course->lessons()->get()->map(function ($lesson) {
            return [
                'id' => $lesson->id,
                'name' => $lesson->name
            ];
        });

        $this->data['lesson_selected'] = $lesson;
        $this->data['lessons'] = $lessons;
        $this->data['comments'] = $lesson ? $lesson->comments()->where('parent_id', '0')->orderBy('created_at', 'desc')->get()->map(function ($comment) {
            $data = $comment->transform($this->user);
            $data['child_comments'] = $comment->child_comments()->orderBy('created_at', 'desc')->get()->map(function ($commentChild) {
                $dataComment = $commentChild->transform($this->user);
                return $dataComment;
            });
            return $data;
        }) : [];

        return view('colorme_new.course_online_lesson', $this->data);
    }

    public function profileProcess($username)
    {
        $user = User::where('username', $username)->first();

//        dd($this->data['paid_courses_user']);
        if ($user) {
            $user->avatar_url = generate_protocol_url($user->avatar_url);
            $this->data['user_profile'] = $user;
            $courses = $user->registers()->get()->map(function ($register) {
                $data = [
                    'id' => $register->studyClass->course->id,
                    'type_id' => $register->studyClass->course->type_id,
                    'name' => $register->studyClass->course->name,
                    'linkId' => convert_vi_to_en($register->studyClass->course->name),
                    'icon_url' => $register->studyClass->course->icon_url,
                    'duration' => $register->studyClass->course->duration,
                    'description' => $register->studyClass->course->description,
                    'image_url' => $register->studyClass->course->image_url,
                    'first_lesson' => $register->studyClass->course->lessons()->orderBy('order')->first(),
                    'total_lesson' => $register->studyClass->course->lessons()->count(),
                    'total_passed' => $register->studyClass->course->lessons()
                        ->join('class_lesson', 'class_lesson.lesson_id', '=', 'lessons.id')
                        ->where('class_lesson.class_id', $register->studyClass->id)
                        ->whereRaw('date(now()) >= date(class_lesson.time)')->count()
                ];
                return $data;
            });
            $this->data['paid_courses_user'] = $courses;
//            dd($this->data['paid_courses_user']);
            return view('colorme_new.profile.process', $this->data);
        }
        return redirect('/');
    }

    public function profile($username)
    {
        $user = User::where('username', $username)->first();
        $user->avatar_url = generate_protocol_url($user->avatar_url);
        $this->data['user_profile'] = $user;
        if ($user) {
            return view('colorme_new.profile.profile_react', $this->data);
        }
        return redirect('/');
    }

    public function social()
    {
        return view('colorme_new.colorme_react', $this->data);
    }

    public function blogs(Request $request)
    {
        $limit = $request->limit ? $request->limit : 12;
        $search = $request->search;

        // $current_gen = Gen::getCurrentGen();
        $blogs = Product::where('kind', 'blog')->where('status', 1)
            ->where('title', 'like', "%$search%")
            ->leftJoin('comments', 'products.id', '=', 'comments.product_id')
            ->select('products.*', DB::raw('count(comments.id) as comments_count'))->groupBy('products.id')
            ->orderBy('created_at', 'desc')->get();
            // ->paginate($limit);

        $blogs = $blogs->map(function ($blog) {
            $data = $blog->blogTransform();
            $data['comments_count'] = $blog->comments_count;
            return $data;
        });
        $this->data['blogs'] = $blogs;
        return view('colorme_new.blogs', $this->data);
    }

    public function blog($slug, Request $request)
    {
        $blog = Product::where('slug', $slug)->first();

        $data = $blog->blogDetailTransform();
        $data['comments_count'] = Comment::where('product_id', $blog->id)->count();

        $this->data['related_blogs'] = Product::where('id', '<>', $blog->id)->where('kind', 'blog')->where('status', 1)->where('author_id', $blog->author_id)
            ->limit(4)->get();
        $this->data['blog'] = $data;

        return view('colorme_new.blog', $this->data);
    }
}
