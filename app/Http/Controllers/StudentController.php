<?php

namespace App\Http\Controllers;

use App\Category;
use App\CategoryProduct;
use App\ClassLesson;
use App\Comment;
use App\Course;
use App\Gen;
use App\Lesson;
use App\Like;
use App\Link;
use App\Notification;
use App\Product;
use App\Register;
use App\StudyClass;
use App\Http\Requests\RegisterFormRequest;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Tag;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use RobbieP\CloudConvertLaravel\Facades\CloudConvert;


class StudentController extends StudentAccessController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->data['user'] = $this->user;
        $this->data['student_id'] = $this->user->id;
        return view('student.index', $this->data);
    }

    public function upload_image()
    {
        return view('student.upload_image', $this->data);
    }

    public function classes($class_id = null)
    {
        $class = $this->user->registers()->first();
        $has_registered = isset($class);
        if ($has_registered) {
            if ($class_id != null) {
                $class = StudyClass::find($class_id);
            } else {
                $class = $this->user->registers()->first()->studyClass;
            }
            $this->data['class'] = $class;

            $registers = $this->user->registers;
            $this->data['registers'] = $registers;
        }
        $this->data['has_registered'] = $has_registered;


        return view('student.classes', $this->data);
    }

    public function change_class(Request $request)
    {
        $classLessonTo = ClassLesson::find($request->class_lesson_id_to);
        $classLessonFrom = ClassLesson::find($request->class_lesson_id_from);
        $register = $this->user->registers()->where('class_id', $request->origin_class_id)->first();
        $attendance = $classLessonFrom->attendances()->where('register_id', $register->id)->first();
        $attendance->class_lesson_id = $classLessonTo->id;
        $attendance->save();

        Session::flash('message', 'Bạn đã chuyển buổi <strong style="font-weight: bold">' . $classLessonFrom->lesson->order . ': ' . $classLessonFrom->lesson->name . '</strong> sang lớp <strong style="font-weight: bold">' . $classLessonTo->studyClass->name . '</strong> thành công');
        return redirect('student/classes/' . $request->origin_class_id);

    }


    public function store_product(Request $request)
    {

        $product = new Product;
        $product->description = $request->description;
        $product->type = $request->type;
        $product->rating = 0;
        $product->author_id = $this->user->id;
        $product->tags = $request->tags;

        if ($request->type == 0) {

            $image_name = uploadFileToS3($request, 'product', 800, $product->image_name);
            if ($image_name != null) {
                $product->image_name = $image_name;
                $product->url = $this->s3_url . $image_name;
            }

            $thumb_name = uploadFileToS3($request, 'product', 250, $product->thumb_name);
            if ($thumb_name != null) {
                $product->thumb_name = $thumb_name;
                $product->thumb_url = $this->s3_url . $thumb_name;
            }
            $product->save();
            Session::flash('message', 'Bạn đã đăng ảnh thành công');
        } else if ($request->type == 1) {
            //            $video_name = uploadLargeFileToS3Useffmpec($request, 'product', $product->image_name);
            $video_name = uploadLargeFileToS3UseCloudConvert($request, 'product', $product->image_name);
            if ($video_name != null) {
                $product->image_name = $video_name;
                $product->url = $this->s3_url . $video_name;
                $product->save();
                Session::flash('message', 'Bạn đã đăng video thành công');
            } else {
                Session::flash('message', 'Có lỗi xảy ra');
            }
        }
        return '<strong class="green-text">Tải lên thành công</strong>';
    }


    public function store_like(Request $request)
    {
        $num_like = $this->user->likes()->where('product_id', $request->product_id)->count();
        $product = Product::find($request->product_id);
        if ($num_like == 0) {
            if ($this->user->id != $product->author->id) {
                $notification = new Notification;
                $notification->product_id = $request->product_id;
                $notification->actor_id = $this->user->id;
                $notification->receiver_id = $product->author->id;
                $notification->type = 35;
                $notification->save();

                $data = array(
                    "message" => $notification->actor->name . " đã thích bài viết của bạn",
                    "link" => url('bai-tap-colorme?id=' . $notification->product_id),
                    'created_at' => format_date_full_option($notification->created_at),
                    "receiver_id" => $notification->receiver_id
                );

                $publish_data = array(
                    "event" => "notification",
                    "data" => $data
                );
                Redis::publish(config('app.channel'), json_encode($publish_data));
            }
            $product->rating += 5;
            $like = new Like;
            $like->product_id = $request->product_id;
            $like->liker_id = $this->user->id;
            $like->save();
            $like_id = $like->id;
        } else {
            $like_id = $this->user->likes()->where('product_id', $request->product_id)->first()->id;
            $like = Like::find($like_id);
            $like->delete();
            $like_id = -1;
            $product->rating -= 5;
            Notification::where('product_id', $product->id)
                ->where('actor_id', $this->user->id)
                ->first()->delete();
        }


        $total_likes = $product->likes()->count();

        $product->save();
        $return_data = new \stdClass;
        $return_data->total_likes = $total_likes;
        $return_data->like_id = $like_id;

        return json_encode($return_data);
    }

    public function links($course_id = 1)
    {
        $link = Link::where('course_id', $course_id)->get();
        $all_course = Course::all();
        $this->data['course_id'] = $course_id;
        $this->data['all_course'] = $all_course;
        $this->data['links'] = $link;
        $this->data['loop'] = count($link);
        return view('student.links', $this->data);
    }

    public function newsfeed(Request $request)
    {
        $limit = 40;
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
        return view('student.newsfeed', $this->data);
    }

    public function load_notifications(Request $request)
    {
        $limit = 15;
        $page = $request->p;
        $offset = ($page - 1) * $limit;
        $this->data['notifications'] = $this->user->received_notifications()->take($limit)->skip($offset)->orderBy('created_at', 'desc')->get();
        DB::update(DB::raw('update notifications set seen = 1 where receiver_id=' . $this->user->id . ' and seen=0'));
        return view("components.navbar_notifications", $this->data);
    }

    public function news_feed_load_more(Request $request)
    {
        $limit = 40;
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

    public function store_comment(Request $request)
    {


        $comment_content = $request->comment_content;
        $product_id = $request->product_id;

        //send one notifcation to author
        if (Product::find($product_id)->author->id != $this->user->id) {
            $notification = new Notification;
            $notification->product_id = $request->product_id;
            $notification->actor_id = $this->user->id;
            $notification->receiver_id = Product::find($product_id)->author->id;
            $notification->type = 1;
            $notification->save();
            $data = array(
                "message" => $notification->actor->name . " đã bình luận về bài viết của bạn",
                "link" => url('bai-tap-colorme?id=' . $notification->product_id),
                'created_at' => format_date_full_option($notification->created_at),
                "receiver_id" => $notification->receiver_id
            );
            $publish_data = array(
                "event" => "notification",
                "data" => $data
            );
            Redis::publish(config('app.channel'), json_encode($publish_data));
        }


        $product = Product::find($product_id);

        $already_sent_noti = array();

        //send to all others that involve in the post

        foreach ($product->comments as $comment) {
            $commenter_id = $comment->commenter_id;
            if ($product->author->id != $commenter_id && $commenter_id != $this->user->id && !in_array($commenter_id, $already_sent_noti)) {
                $notification = new Notification;
                $notification->product_id = $request->product_id;
                $notification->actor_id = $this->user->id;
                $notification->receiver_id = $commenter_id;
                $notification->type = 2;
                $notification->save();

                $data = array(
                    "message" => $notification->actor->name . " cũng đã bình luận về bài viết mà bạn đã bình luận",
                    "link" => url('bai-tap-colorme?id=' . $notification->product_id),
                    'created_at' => format_date_full_option($notification->created_at),
                    "receiver_id" => $notification->receiver_id
                );

                $publish_data = array(
                    "event" => "notification",
                    "data" => $data
                );
                Redis::publish(config('app.channel'), json_encode($publish_data));
                $already_sent_noti[] = $commenter_id;
            }
        }

        $comment = new Comment;
        $comment->product_id = $product_id;
        $comment->commenter_id = $this->user->id;
        $comment->content = $comment_content;
        $comment->save();

        $view = View::make('components.comment_item', ['comment' => $comment]);
        $contents = $view->render();

        $publish_data = array(
            "event" => "comment",
            "data" => $contents
        );

        Redis::publish(config('app.channel'), json_encode($publish_data));

        return time_elapsed_string(strtotime($comment->created_at));
    }


    public function class_products($class_id)
    {
        $class = StudyClass::find($class_id);
        $this->data['products'] = $class->registers()->whereExists(function ($query) use ($class_id) {
            $query->select(DB::raw(1))
                ->from('registers')
                ->whereRaw('registers.user_id = users.id and registers.class_id=' . $class_id);
        });
    }

    public function lesson_content($lesson_id = null)
    {
        if ($this->user->role == 1 || $this->user->role == 2) {
            $courses = Course::all();
            $lesson = Lesson::find($lesson_id);
            $this->data['current_lesson'] = $lesson;
            $this->data['courses'] = $courses;
            return view('student.all_giaotrinh', $this->data);
        } else {
            $lesson = Lesson::find($lesson_id);

            $class = $this->user->registers()->first();
            $has_registered = isset($class);
            if ($has_registered) {
                $this->data['class'] = $class;
                $registers = $this->user->registers;
                $this->data['registers'] = $registers;
            }
            $this->data['has_registered'] = $has_registered;
            $this->data['current_lesson'] = $lesson;
            return view('student.giaotrinh', $this->data);
        }


    }

    public function get_lesson_content(Request $request)
    {
        $lesson_id = $request->lesson_id;
        $lesson = Lesson::find($lesson_id);
        return $lesson->detail_content;
    }

    public function delete_product(Request $request)
    {
        $product_id = $request->product_id;
        $product = Product::find($product_id);
        $s3 = Storage::disk('s3');
        $product->delete();
        if ($product->image_name != null) {
            $s3->delete($product->image_name);
        }
        if ($product->thumb_name != null) {
            $s3->delete($product->thumb_name);
        }

    }

    public function edit_profile($id)
    {
        if ($this->user->id == $id) {
            $user = User::where('id', $id)->first();
            $this->data['user'] = $user;
            return (view('student.edit_profile', $this->data));
        } else {
            return redirect('/');
        }
    }

    public function save_profile_info(Request $request)
    {
        $user = $this->user;
        $user->name = $request->name;
        $user->dob = $request->dob;
        $user->gender = $request->gender;
        $user->university = $request->university;
        $user->work = $request->work;

        $user->save();
        return redirect('profile/edit/' . $request->id)->with('isChanged', 1);
    }

    public function save_avatar(Request $request)
    {
        $user = $this->user;
        $avatar_name = uploadFileToS3($request, 'avatar_url', 200, $user->avatar_name);
        $user->avatar_url = $this->s3_url . $avatar_name;
        $user->avatar_name = $avatar_name;
        //            $this->data['isChanged'] = 1;
        $code = get_first_part_of_email($user->email);
        $user->save();
        return redirect('profile/' . $code);
    }

    public function save_cover(Request $request)
    {
        $user = $this->user;
        $cover_name = uploadFileToS3($request, 'cover_url', 1000, $user->cover_name);
        $user->cover_url = $this->s3_url . $cover_name;
        $user->cover_name = $cover_name;
        //            $this->data['isChanged'] = 1;
        $code = get_first_part_of_email($user->email);
        $user->save();
        return redirect('profile/' . $code);
    }

    public function count_notification(Request $request)
    {
        return $this->user->received_notifications()->where('seen', 0)->count();
    }

    public function notifications()
    {
        $this->data['notifications'] = $this->user->received_notifications()->take(30)->orderBy('created_at', 'desc')->get();
        DB::update(DB::raw('update notifications set seen = 1 where receiver_id=' . $this->user->id . ' and seen=0'));
        return view('student.notifications', $this->data);
    }

    public function store_rating(Request $request)
    {

        $register = Register::find($request->register_id);
        $register->rating_teacher = $request->rating_teacher;
        $register->rating_ta = $request->rating_ta;
        $register->comment_teacher = $request->comment_teacher;
        $register->comment_ta = $request->comment_ta;
        //        dd($request->rating_teacher);
        $register->rated = 1;

        $register->save();
        return "<strong class=\"green-text\">Cám ơn bạn đã đánh giá và góp ý cho giảng viên và trợ giảng của colorME</strong>";
    }

    public function upload_product()
    {
        $tags = Tag::all()->sortByDesc('created_at')->pluck('name')->toArray();
        $this->data['tags'] = $tags;
        $this->data['owner_id'] = $this->user->id;
        $this->data['categories'] = CategoryProduct::all();
        return view('student.upload', $this->data);
    }

    public function edit_blog_post($id)
    {
        $product = Product::find($id);
        $this->data['product'] = $product;
        $this->data['categories'] = CategoryProduct::all();
        $this->data['tags'] = Tag::all();
        $this->data['owner_id'] = $this->user->id;
        return view('student.edit_blog_post', $this->data);
    }


    public function store_blog_post(Request $request)
    {

        $id = $request->id;
        if ($id == -1) {
            $product = new Product;
        } else {
            $product = Product::find($id);
        }

        $product->description = $request->title;
        $product->type = $request->type;
        $product->rating = 0;
        $product->author_id = $this->user->id;
        $product->tags = $request->tags;
        $product->content = $request->blog_content;
        $product->category_id = $request->category_id;
        $avatar_type = $request->avatar_type;

        if ($avatar_type == 0) {

            $image_name = uploadFileToS3($request, 'avatar', 800, $product->image_name);
            if ($image_name != null) {
                $product->image_name = $image_name;
                $product->url = $this->s3_url . $image_name;
            }
            $thumb_name = uploadFileToS3($request, 'avatar', 250, $product->thumb_name);
            if ($thumb_name != null) {
                $product->thumb_name = $thumb_name;
                $product->thumb_url = $this->s3_url . $thumb_name;
            }
            $product->save();
            Session::flash('message', 'Bạn đã đăng bài viết thành công. <a href="' . url('bai-tap-colorme?id=' . $product->id) . '">Click vào đây để xem bài viết</a>');
        } else if ($avatar_type == 1) {
            //            $video_name = uploadLargeFileToS3Useffmpec($request, 'product', $product->image_name);
            $video_name = uploadLargeFileToS3UseCloudConvert($request, 'avatar', $product->image_name);
            if ($video_name != null) {
                $product->image_name = $video_name;
                $product->url = $this->s3_url . $video_name;
                $product->save();
                Session::flash('message', 'Bạn đã đăng bài viết thành công');
            } else {
                Session::flash('message', 'Có lỗi xảy ra');
            }
        }
        return '<strong class="green-text">Đăng bài viết thành công</strong>';
    }


}
