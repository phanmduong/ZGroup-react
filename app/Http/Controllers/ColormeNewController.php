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
use App\Services\EmailService;
use Carbon\Carbon;

class ColormeNewController extends CrawlController
{
    protected $productTransformer;
    protected $courseTransformer;
    protected $courseRepository;
    protected $emailService;

    public function __construct(EmailService $emailService, ProductTransformer $productTransformer, CourseTransformer $courseTransformer, CourseRepository $courseRepository)
    {
        parent::__construct();
        $this->productTransformer = $productTransformer;
        $this->courseTransformer = $courseTransformer;
        $this->courseRepository = $courseRepository;
        $this->emailService = $emailService;
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

    public function timeCal($time)
    {
        $diff = abs(strtotime($time) - strtotime(Carbon::now()->toDateTimeString()));
        $diff /= 60;
        if ($diff < 60)
            return floor($diff) . ' phút trước';
        $diff /= 60;
        if ($diff < 24)
            return floor($diff) . ' giờ trước';
        $diff /= 24;
        if ($diff <= 30)
            return floor($diff) . ' ngày trước';
        return date('d-m-Y', strtotime($time));
    }

    public function blogs(Request $request)
    {
        $limit = $request->limit ? $request->limit : 6;
        $search = $request->search;
        $tag = $request->tag;

        $blogs = Product::where('kind', 'blog')->where('status', 1)
            ->where('title', 'like', "%$search%");
        if ($tag)
            $blogs = $blogs->where('tags', 'like', "%$tag%");
        $blogs = $blogs->orderBy('created_at', 'desc')->paginate($limit);

        $this->data['total_pages'] = ceil($blogs->total() / $blogs->perPage());
        $this->data['current_page'] = $blogs->currentPage();

        $blogs = $blogs->map(function ($blog) {
            $data = $blog->blogTransform();
            $data['time'] = $this->timeCal(date($blog->created_at));
            return $data;
        });
        $this->data['blogs'] = $blogs;
        $this->data['search'] = $search;
        $this->data['tag'] = $tag;
        return view('colorme_new.blogs', $this->data);
    }

    public function mailViews($views)
    {
        if ($views < 10)
            return false;
        while ($views != 0) {
            if ($views > 10 && $views % 10 != 0)
                return false;
            if ($views < 10 && ($views == 1 || $views == 2 || $views == 5))
                return true;
            $views /= 10;
        }
    }

    public function blog($slug, Request $request)
    {
        $blog = Product::where('slug', $slug)->first();
        $blog->views += 1;
        $blog->save();
        if ($this->mailViews($blog->views) === true)
            $this->emailService->send_mail_blog($blog, $blog->author, $blog->views);
        $data = $blog->blogDetailTransform();
        $this->data['related_blogs'] = Product::where('id', '<>', $blog->id)->where('kind', 'blog')->where('status', 1)->where('author_id', $blog->author_id)
            ->limit(4)->get();
        $this->data['blog'] = $data;

        return view('colorme_new.blog', $this->data);
    }

    public function register(Request $request)
    {
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = bcrypt('123456');
            $user->username = $request->email;
            $user->email = $request->email;
            $user->name = $request->name;
            $user->phone = $phone;
        }
        $user->rate = 5;
        $user->save();

        $this->emailService->send_mail_welcome($user);
        return [
            'message' => 'success'
        ];
    }

    public function extract(Request $request)
    {
        $blog = Product::find(7785);
        $this->emailService->send_mail_blog($blog, $blog->author, $blog->views);
    }
}
