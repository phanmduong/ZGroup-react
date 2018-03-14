<?php

namespace App\Http\Controllers;

use App\Base;
use App\Category;
use App\CategoryProduct;
use App\Console\Commands\SendSurvey;
use App\Console\Commands\WorkShiftsCheckInCheckOutNoti;
use App\Course;
use App\Email;
use App\EmailForm;
use App\EmailTemplate;
use App\Gen;
use App\Http\Requests\RegisterFormRequest;
use App\Image;
use App\Landing;
use App\Notification;
use App\Product;
use App\Providers\AppServiceProvider;
use App\Register;
use App\Services\EmailService;
use App\StudyClass;
use App\Test;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class PublicController extends Controller
{
    private $user;
    private $data;
    protected $emailService;

    public function __construct(
        EmailService $emailService
    )
    {
        $this->data = array();
        $this->data['rating'] = false;
        $courses = Course::where('status', '1')->orderBy('created_at', 'asc')->get();
        $this->data['courses'] = $courses;
        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
            foreach ($this->user->registers as $register) {
                if ($register->rated == 2 && $register->staff_id > 0) {
                    $this->data['rating'] = true;
                    break;
                }
            }
        }
        $this->emailService = $emailService;
    }

    public function redirect()
    {
        return redirect(config('app.protocol') . config("app.domain"));
    }

    public function elightMail(Request $request)
    {
        $email = $request->email;
        $msg = "First line of text\nSecond line of text";


        $msg = wordwrap($msg, 70);


        mail($email, "My subject", $msg);
        return "done";
    }

    public function store_images($topicId, Request $request)
    {
        $image = new Image();
        $image->owner_id = 1;
        $image_name = uploadFileToS3($request, 'product', 800, null);
        if ($image_name != null) {
            $image->name = $image_name;
            $image->url = $this->s3_url . $image_name;
        }
        $image->save();
        $msg = [
            'message' => "Tải lên thành công"
        ];
        return response()->json($msg, 200);
    }


    public function access_forbidden()
    {
        return view('public.access_forbidden');
    }

    public function index()
    {
        $this->data['class_name'] = null;
        $limit = 15;
        $products = Product::orderBy('created_at', 'desc')->take($limit)->get();
//        dd(extract_dominant_color($products[0]->thumb_url));
        $this->data['gen'] = Gen::getCurrentGen();
        $this->data['products'] = $products;
        return view('student.newsfeed', $this->data);

    }


    public function products(Request $request)
    {
        $cat_id = $request->cat_id;
        $limit = 20;
        if ($cat_id != null) {
            $this->data['category_id'] = $cat_id;
        }
        $this->data['gen'] = Gen::getCurrentGen();
        $category = CategoryProduct::find($cat_id);
        $products = $category->products()->orderBy('created_at', 'desc')->take($limit)->get();
        $this->data['products'] = $products;

        return view('student.newsfeed', $this->data);
    }


    public function courses($user_id, $campaign_id)
    {

        //get all course categories
        $filter = false;

        if ($filter) {

        } else {
            $couses = Course::all();
        }

        $course_categories = Category::all();

        $this->data['gen'] = Gen::getCurrentGen();
        $this->data['courses'] = $couses;
        $this->data['categories'] = $course_categories;
        $this->data['user_id'] = $user_id;
        $this->data['campaign_id'] = $campaign_id;

        return view('public.courses', $this->data);
    }

    public function classes($course_id = null, $saler_id = null, $campaign_id = null)
    {
        $course = Course::find($course_id);;
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
        return view('2018-course', $this->data);
    }

    public function register($course_id = null, $saler_id = null, $campaign_id = null)
    {
        $course = Course::find($course_id);
        if ($course == null) {
            $courses = Course::all();
            foreach ($courses as $key) {
                if (convert_vi_to_en($key->name) === $course_id)
                    $course = $key;
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
        return view('2018-register', $this->data);
    }

    public function register_class($class_id = null, $saler_id = null, $campaign_id = null)
    {

        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $class = StudyClass::find($class_id);
        $course = Course::find($class->course_id);

        $this->data['class'] = $class;
        $this->data['course'] = $course;

        return view('public.register_course', $this->data);
    }

    public function register_success_confirm()
    {
        return view('public.confirm_regis', $this->data);
    }


    public function register_store(RegisterFormRequest $request)
    {
        //send mail here
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->name = $request->name;
            $user->phone = $phone;
            $user->email = $request->email;
            $user->university = $request->university;
            $user->work = $request->work;
            $user->address = $request->address;
            $user->how_know = how_know($request->how_know);
            $user->username = $request->username ? $request->username : $request->email;
            $user->facebook = $request->facebook;
            $user->gender = $request->gender;
            $user->dob = strtotime($request->dob);
            $user->password = bcrypt($user->phone);

            if ($request->other_reason) {
                $user->how_know = $request->other_reason;
            }

            $user->save();

        } else {
            $user->university = $request->university;
            $user->work = $request->work;
            $user->address = $request->address;
            $user->phone = $phone;
            $user->gender = $request->gender;
            $user->dob = date('Y-m-d', strtotime($request->dob));
            $user->facebook = $request->facebook;

            $user->save();
        }
        $register = new Register;
        $register->user_id = $user->id;
        $register->gen_id = Gen::getCurrentGen()->id;
        $register->class_id = $request->class_id;
        $register->status = 0;
        $register->saler_id = $request->saler_id;
        $register->campaign_id = $request->campaign_id;
        $register->leader_phone = $request->leader_phone;
        $register->coupon = $request->coupon;
        $register->time_to_call = addTimeToDate($register->created_at, "+24 hours");

        $register->save();

        $this->emailService->send_mail_confirm_registration($user, $request->class_id);

        $class = $register->studyClass;
        if (strpos($class->name, '.') !== false) {
            if ($class->registers()->count() >= $class->target) {
                $class->status = 0;
                $class->save();
            }
        }

        return redirect('register_success');
    }

    public function new_register_store(Request $request)
    {
        //send mail here
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = bcrypt($phone);
            $user->username = $request->email;
            $user->email = $request->email;

        }
        $user->name = $request->name;
        $user->phone = $phone;
        $user->save();



        $register = new Register;
        $register->user_id = $user->id;
        $register->gen_id = Gen::getCurrentGen()->id;
        $register->class_id = $request->class_id;
        $register->status = 0;
        $register->saler_id = $request->saler_id;
        $register->campaign_id = $request->campaign_id;
        $register->time_to_call = addTimeToDate($register->created_at, "+24 hours");

        $register->save();

        $this->emailService->send_mail_confirm_registration($user, $request->class_id, [AppServiceProvider::$config['email']]);

        $class = $register->studyClass;
        if (strpos($class->name, '.') !== false) {
            if ($class->registers()->count() >= $class->target) {
                $class->status = 0;
                $class->save();
            }
        }

        return ['message' => 'SUCCESS'];
    }

    public function send_mail()
    {
        $user = array(
            'name' => 'Quan Cao Anh',
            'email' => 'aquancva@gmail.com',
            'password' => 'password',
            'university' => 'USTH',
            'work' => 'USTH',
            'phone' => '0969032275',
            'address' => 'Ba Trieu',
            'created_at' => '2-1-2016'
        );
        $register = array(
            'class_id' => 5
        );
        $class = StudyClass::find($register['class_id']);

        $course = Course::find($class->course_id);

        $data['class'] = $class;
        $data['course'] = $course;
        $data['user'] = $user;

        $subject = "Xác nhận đăng kí khoá học " . $course->name;

        Mail::send('emails.confirm_email_2', $data, function ($m) use ($user, $subject) {
            $m->from(AppServiceProvider::$config['email'], 'Color Me');

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function edit_mail()
    {
        return view('emails.confirm_email_2', $this->data);
    }

    public function upload_file(Request $request)
    {
        $owner_id = $request->owner_id;
        $s3_url = config('app.s3_url');

        $image_name = uploadFileToS3($request, 'upload', 800, null);
        $url = $s3_url . $image_name;

        $image = new Image;
        $image->name = $image_name;
        $image->url = $url;
        $image->owner_id = $owner_id;
        $image->save();

        $funcNum = $_GET['CKEditorFuncNum'];
        $message = 'Tài lên thành công';
        return "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
    }

    public function profile($code)
    {
        $register = Register::where('code', $code)->first();
        if (!isset($register)) {
            $user = User::where('email', 'like', $code . '@%')->first();
        } else {
            $user = $register->user;
        }
        $this->data['target_user'] = $user;
        if (isset($user)) {
            $this->data['is_authorized'] = isset($this->user) && $this->user->id == $user->id;
            $this->data['student_id'] = $user->id;
        }
        $this->data['code'] = $code;
        if ($user->cover_url != null) {
            $this->data['cover'] = $user->cover_url;
        }

        if ($this->user != null) {
            $survey_user = $this->user->survey_users()->where('status', 0)->first();
            $this->data['survey_user'] = $survey_user;
        } else {
            $this->data['survey_user'] = null;
        }

        $total_product = $user->products()->get()->count();

        $this->data['total_product'] = $total_product;
        return view('student.index', $this->data);
    }


    public function product_detail(Request $request)
    {

        //random select course
        $course = DB::select('SELECT * FROM courses ORDER BY RAND() LIMIT 1')[0];

        $this->data['course'] = $course;

        $product_id = $request->id;

        $product = Product::find($product_id);
        $product->views += 1;
        $product->save();
        if (isset($this->user)) {
            $this->data['like'] = $product->likes()->where('liker_id', $this->user->id)->first();
        }
        $this->data['current_product'] = $product;

        return view('public.product_detail', $this->data);
    }

    public function get_product(Request $request)
    {
        $product_id = $request->product_id;
        $product = Product::find($product_id);


        $obj = $product;
        $obj->total_likes = $product->likes()->count();
        if (isset($this->user)) {
            $obj->is_liked = $this->user->likes()->where('product_id', $product_id)->count();
        }
        return json_encode($obj);
    }


    public function get_comment_new(Request $request)
    {
        $product_id = $request->product_id;
        $product = Product::find($product_id);
        $this->data['product'] = $product;
        return view('student.comment_list_new', $this->data);
    }

    public function get_comment(Request $request)
    {
        $product_id = $request->product_id;
        $product = Product::find($product_id);
        $this->data['product'] = $product;
        return view('student.comment_list', $this->data);
    }

    public function get_user_data(Request $request)
    {
        $user = User::where('email', '=', $request->email)->first();
        return json_encode($user);
    }

    public function get_product_data(Product $product)
    {
        $product->views += 1;
        $product->save();
        $product->author;
        $classes = array();
        foreach ($product->author->registers as $register) {
            $register->studyClass->course;
            $classes[] = $register->studyClass;
        }

        if ($product->category != null) {
            $product->category_name = $product->category->name;
            $product->category_url = url('category?cat_id=' . $product->category->id);
        }
        if ($product->type == 2 || $product->type == 3) {
            $product->share_url = url('post/colormevn-' . convert_vi_to_en($product->description) . '?id=' . $product->id);
        }
        $product->parsed_tags = view('components.tag', ['current_product' => $product])->render();
        $product->classes = $classes;
        $product->remain_time = time_elapsed_string(strtotime($product->created_at));
        $product->author->email_name = get_first_part_of_email($product->author->email);
        $product->total_likes = $product->likes()->count();
        $product->total_comments = $product->comments()->count();
        if ($product->type == 3) {
            $product->items = '';
            foreach ($product->images as $image) {
                if ($image->type == 0) {
                    $product->items .= "<img src='$image->url'style='width: 100%' />";
                } else {
                    $product->items .= "
                    <video full=\"$image->url\" class=\"responsive-video\"
                           controls preload='metadata'>
                        <source src=\"$product->url\" type=\"video/mp4\">
                    </video>
                    ";
                }

            }
        }
        return $product;
    }


    public function get_user_info($id)
    {
        $user = User::find($id);

        //Get icon for current learning course for profile page
        $course_learning = array();
        $course_learning_icon_id = array();
        foreach ($user->registers as $register) {
            array_push($course_learning, $register->studyclass->course_id);
        }
        foreach ($course_learning as $course_id) {
            if (!in_array($course_id, $course_learning_icon_id)) {
                array_push($course_learning_icon_id, $course_id);
            }
        }

        $canEdit = ($this->user != null && $user->id == $this->user->id);

        $this->data['canEdit'] = $canEdit;
        $this->data['course_learning_id'] = $course_learning_icon_id;
        $this->data['user'] = $user;
        $this->data['id'] = $id;
        return view('components/profile-tab-data-info', $this->data);
    }

    // public function store_view(Request $request)
    // {
    //     $product_id = $request->product_id;
    //     if (isset($this->user)) {
    //         $viewer_id = $this->user->id;
    //     } else {
    //         $viewer_id = -1;
    //     }
    //
    //     $view = new View;
    //     $view->viewer_id = $viewer_id;
    //     $view->product_id = $product_id;
    //     $view->save();
    //
    //     $product = Product::find($product_id);
    //     $product->rating += 0.2;
    //     $product->save();
    //
    //     return $product->views()->count();
    // }

    public function store_email(Request $request)
    {
        $email = new Email;
        $email->name = $request->name;
        $email->save();
        return 'Bạn đã đăng kí nhận email thành công';
    }

    public function get_liked_users(Request $request)
    {
        $product_id = $request->product_id;

        $product = Product::find($product_id);
        $likes = $product->likes()->orderBy('created_at', 'desc')->get();

        $this->data['likes'] = $likes;
        return view('components.liked_users', $this->data);
    }

    public function search(Request $request)
    {
        $search_str = $request->q;
        $search_part = '%' . $search_str . '%';
        $courses = Course::where('name', 'like', $search_part)->get();
        $members = User::where('name', 'like', $search_part)
            ->orWhere('email', 'like', $search_part)
            ->orWhere('phone', 'like', $search_part)
            ->get();
        $products = Product::where('description', 'like', $search_part)
            ->orWhere('tags', 'like', $search_part)
            ->get();

        $this->data['members'] = $members;
        $this->data['courses'] = $courses;
        $this->data['products'] = $products;
        $this->data['search_str'] = $search_str;
        return view('public.search_result', $this->data);
    }

    public function search_autocomplete(Request $request)
    {
        $value = $request->value;
        $search_part = '%' . $value . '%';

        $courses = Course::where('name', 'like', $search_part)->take(5)->get();
        $members = User::where('name', 'like', $search_part)
            ->orWhere('email', 'like', $search_part)
            ->orWhere('phone', 'like', $search_part)
            ->take(5)
            ->get();
        $products = Product::where('type', '=', 2)
            ->where(function ($query) use ($search_part) {
                $query->where('description', 'like', $search_part)
                    ->orWhere('tags', 'like', $search_part);
            })
            ->take(5)
            ->get();
        $this->data['members'] = $members;
        $this->data['courses'] = $courses;
        $this->data['products'] = $products;
        return view('components.search_items', $this->data);

    }

    public function landing(Request $request)
    {
        $landing = Landing::find($request->id);
        $course_id = $landing->course_id;

        $course = Course::find($course_id);
        $courses = Course::all();

        $current_gen = Gen::getCurrentGen();
        $classes = StudyClass::getClassesByCourseAndGen($current_gen->id, $course_id);
        $date_start = $course->classes->sortbyDesc('datestart')->first();

        $bases = Base::all();

        $demos = json_decode($landing->demos, true);
        $timeline = json_decode($landing->timeline, true);
        $feedbacks = json_decode($landing->feedbacks, true);
        $reasons = json_decode($landing->reasons, true);

        $demo_contents = array();

        for ($i = 1; $i <= 6; $i++) {
            if ($demos['demo' . $i]) {
                $product = Product::find($demos['demo' . $i]);
                if ($product->type == 2) {
                    $demo_contents[$i] = $product->content;
                } else {
                    $demo_contents[$i] = '<img src=' . $product->url . '>';
                }
            } else {
                $demo_contents[$i] = '';
            }
        }

//        dd($demo_contents);
        $this->data['landing'] = $landing;
        $this->data['demo_contents'] = $demo_contents;
        $this->data['demos'] = $demos;
        $this->data['timeline'] = $timeline;
        $this->data['feedbacks'] = $feedbacks;
        $this->data['reasons'] = $reasons;
        $this->data['bases'] = $bases;
        $this->data['date_start'] = $date_start->datestart;
        $this->data['current_gen_id'] = $current_gen->id;
        $this->data['course_id'] = $course_id;
        $this->data['course'] = $course;
        $this->data['classes'] = $classes;
        $this->data['courses'] = $courses;

        return view('public.landing-promo', $this->data);
    }

    public function newsfeed(Request $request)
    {
        $limit = 15;
        //        type = 1: moi nhat
        //        type = 2: noi bat nhat
        //        type = 3: blog
        $type = $request->type;

        if ($type == 3) {
            $products = Product::orderBy('created_at', 'desc')->where('type', '=', 2)->take($limit)->get();
        } else if ($type == 2) {
            $products = Product::orderBy('rating', 'desc')->take($limit)->get();
        } else {
            //            $class = DB::select("select * from classes where replace(name,' ','') like ?", [$class_name])[0];
            //            $usersIdOfThisClass = StudyClass::find($class->id)->registers()->select(DB::raw('user_id'))->get()->pluck('user_id');
            //            $products = Product::whereIn('author_id', $usersIdOfThisClass)->orderBy('created_at', 'desc')->take($limit)->get();


            $products = Product::orderBy('created_at', 'desc')->take($limit)->get();
        }

        $this->data['type'] = $type;
        $this->data['products'] = $products;
        $this->data['gen'] = Gen::getCurrentGen();
        return view('student.newsfeed', $this->data);
    }

    public function news_feed_load_more(Request $request)
    {
        $limit = 15;
        $page = $request->page;


        $class_name = $request->class_name;
        $category_id = $request->category_id;

        if ($class_name != null) {
            $class = DB::select("select * from classes where replace(name,' ','') like ?", [$class_name])[0];
            $usersIdOfThisClass = StudyClass::find($class->id)->registers()->select(DB::raw('user_id'))->get()->pluck('user_id');
            $products = Product::whereIn('author_id', $usersIdOfThisClass)->orderBy('created_at', 'desc')->skip($page * $limit)->take($limit)->get();

        } else if ($category_id != null) {
            $category = CategoryProduct::find($category_id);
            $products = $category->products()->orderBy('created_at', 'desc')->skip($page * $limit)->take($limit)->get();
        } else {

            $type = $request->type;

            if ($type == 3) {
                $products = Product::orderBy('created_at', 'desc')->where('type', '=', 2)->skip($page * $limit)->take($limit)->get();
            } else if ($type == 2) {
                $products = Product::orderBy('rating', 'desc')->skip($page * $limit)->take($limit)->get();
            } else {
                //            $class = DB::select("select * from classes where replace(name,' ','') like ?", [$class_name])[0];
                //            $usersIdOfThisClass = StudyClass::find($class->id)->registers()->select(DB::raw('user_id'))->get()->pluck('user_id');
                //            $products = Product::whereIn('author_id', $usersIdOfThisClass)->orderBy('created_at', 'desc')->take($limit)->get();


                $products = Product::orderBy('created_at', 'desc')->skip($page * $limit)->take($limit)->get();
            }
        }

        $data['user'] = $this->user;
        $data['products'] = $products;
        return view('ajax.newsfeed_load_more', $data);
    }

    public function landing_register(Request $request)
    {
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
//        dd('WORK');
        if ($user == null) {
            $user = new User;
            $user->name = $request->name;
            $user->phone = $phone;
            $user->email = $request->email;
            $user->university = $request->university;
            $user->work = $request->work;
            $user->address = $request->address;
            $user->how_know = $request->how_know;
            $user->username = $request->username ? $request->username : $request->email;
            $user->facebook = $request->facebook;
            $user->gender = $request->gender;
            $user->dob = strtotime($request->dob);
            $user->password = bcrypt($phone);
            $user->save();

        } else {
            $user->university = $request->university;
            $user->work = $request->work;
            $user->address = $request->address;
            $user->phone = $phone;
            $user->gender = $request->gender;
            $user->dob = date('Y-m-d', strtotime($request->dob));
            $user->facebook = $request->facebook;
            $user->save();
        }
        $register = new Register;
        $register->user_id = $user->id;
        $register->gen_id = Gen::getCurrentGen()->id;
        $register->class_id = $request->class_id;
        $register->status = 0;
        $register->leader_phone = $request->leader_phone;
        $register->coupon = $request->coupon;

        $register->save();
        $this->emailService->send_mail_confirm_registration($user, $request->class_id, [AppServiceProvider::$config['email']]);

        return redirect('register_success');
    }

    public function test_push()
    {
        $data = json_encode(['message' => "ajsdlksamkdmsalk:))"]);
        return send_push_notification($data);
    }

    public function receive_video_convert_notifications()
    {
        $post = file_get_contents('php://input');


        $test = new Test;
        $test->content = $post;
        $test->save();

        $noti = json_decode($post);
        $message = json_decode($noti->Message);
        $jobId = $message->jobId;

        $video_name = '/videos/' . $message->outputs[0]->key;
        $video_url = config('app.s3_url') . $video_name;

        $publish_data = array(
            "event" => "transcode-video",
            "data" => [
                "video_url" => $video_url,
                'video_name' => $video_name,
                'jobId' => $jobId,
                'thumb_url' => $video_url
            ]
        );
        Redis::publish(config('app.channel'), json_encode($publish_data));

        $tmp_file_name = "/" . $message->input->key;
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');
        $s3->delete($tmp_file_name);

        return "done";
    }

    public function receive_notifications()
    {
        $post = file_get_contents('php://input');
        // $test = new Test;
        // $test->content = $post;
        // $test->save();

        $noti = json_decode($post);
        $message = json_decode($noti->Message);
        $mail_id = $message->mail->messageId;
        $mail_status = $message->notificationType;
        $mail = Email::find($mail_id);
        if ($mail == null) {
            $mail = new Email();
        }
        $mail->status = email_status_str_to_int($mail_status);
        $mail->save();
    }

    public function open_email(Request $request)
    {
        $cam_id = $request->cam_id;
        $to = $request->to;
        $email = Email::where('campaign_id', $cam_id)->where('to', $to)->first();
        if ($email->status == 1) {
            $email->status = 3;
        }
        $email->save();
    }

    public function re_scrape_fb(Request $request)
    {
        $url = $request->url_string;
        re_scrape($url);
        return null;
    }


    public function load_more_product_profile($user_id, $offset, $limit)
    {
        $user = User::find($user_id);

        $this->data['target_user'] = $user;
        $this->data['offset'] = $offset;
        $this->data['limit'] = $limit;

        return view('ajax.load_more_product_profile', $this->data);
    }

    public function public_test()
    {
        $obj = new WorkShiftsCheckInCheckOutNoti();
        $obj->handle();
        return "done";
    }

    public function beta()
    {
        return view('beta');
    }

    public function manage($path)
    {
        return view('manage');
    }

    public function redirectManage()
    {
        return redirect(config('app.protocol') . 'manage.' . config('app.domain'));
    }

    public function redirectKeetool()
    {
        return redirect('https://keetool.com');
    }

    public function render_email_form($email_form_id, $email_template_id)
    {
        $email_form = EmailForm::find($email_form_id);
        $email_form->template = EmailTemplate::find($email_template_id);
        $data = convert_email_form($email_form);
        return view('emails.view_email', ['data' => $data]);
    }


    public function notificationRedirect($id)
    {
        $notification = Notification::find($id);
        $notification->seen = 2;
        $notification->save();
        return redirect($notification->url);
    }

    public function send_noti_test()
    {
        $a = new SendSurvey();
        $a->handle();
        return "test";
    }

    public function codeForm()
    {
        $test = 0;
        return view('public.code_form');
    }

    public function check(Request $request)
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
        return view('public.info', $this->data);
    }
}
