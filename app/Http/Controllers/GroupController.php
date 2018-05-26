<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\ClassTransformer;
use App\Colorme\Transformers\RegisterToStudentTransformer;
use App\Image;
use App\Notification;
use App\Product;
use App\StudyClass;
use App\Topic;
use App\Vote;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Redis;

class GroupController extends StudentAccessController
{
    protected $classTransformer;
    protected $registerToStudentTransformer;

    public function __construct(ClassTransformer $classTransformer, RegisterToStudentTransformer $registerToStudentTransformer)
    {
        parent::__construct();
        $this->classTransformer = $classTransformer;
        $this->registerToStudentTransformer = $registerToStudentTransformer;
    }

    public function index($classId)
    {
        $class = StudyClass::find($classId);

        $this->data['class'] = $class;
        return view('student.group.group_class', $this->data);
    }

    public function group_classes()
    {
        $classes = [];
        if ($this->user->role == 0) {
            $registers = $this->user->registers;
            foreach ($registers as $register) {
                $classes[] = $register->studyClass;
            }
        } else {
            $teach = $this->user->teach->pluck('id')->toArray();
            $assist = $this->user->assist->pluck('id')->toArray();
            $class_ids = array_merge($teach, $assist);
            $classes = StudyClass::whereIn('id', $class_ids)->orderBy('created_at', 'desc')->get();
        }

        $this->data['classes'] = $classes;
        return view('student.group.group_classes', $this->data);
    }

    public function topics($classId)
    {

        $class = StudyClass::find($classId);
        $topics = $class->topics()->orderBy('created_at', 'desc')->get();
        foreach ($topics as &$topic) {
            $topic->author;
            $topic->remain_time_raw = $topic->deadline;
            $topic->remain_time = time_remain_string(strtotime($topic->deadline));
            $topic->time_create = time_elapsed_string(strtotime($topic->created_at));
            $topic->submits = count(array_unique($topic->products->pluck('author_id')->toArray()));
            $voted = $topic->votes()->where('voter_id', $this->user->id)->first();
            $topic->voted = $voted ? $voted->value : 0;
            unset($topic->products);
        }
        return response()->json($topics, 200);
    }

    public function topic_detail($topicId)
    {
        $topic = Topic::find($topicId);
        $topic->author;
        $topic->remain_time = time_remain_string(strtotime($topic->deadline));
        $topic->remain_time_raw = $topic->deadline;
        $topic->time_create = time_elapsed_string(strtotime($topic->created_at));
        $topic->submits = count(array_unique($topic->products->pluck('author_id')->toArray()));
        $topic->all_products = $topic->products()->orderBy('created_at', 'desc')->get();
        foreach ($topic->all_products as &$product) {
            $product->liked = (isset($this->user) && $this->user->likes()->where('product_id', $product->id)->count() > 0);
            $product->author->url = url('profile/' . get_first_part_of_email($product->author->email));
            $product->created_time = time_elapsed_string(strtotime($product->created_at));
            $product->author->avatar_url = ($product->author->avatar_url != null) ? $product->author->avatar_url : url('img/user.png');
            $product->count_likes = $product->likes()->count();
            $product->count_comments = $product->comments()->count();
            $product->link = url('post/colormevn-' . convert_vi_to_en($product->description) . '?id=' . $product->id);
        }
        unset($topic->products);
        return response()->json($topic, 200);
    }

    public function topic(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name;
        $topic->description = $request->description;
        $image_name = uploadFileToS3($request, 'avatar', 300, $topic->avatar_url);
        if ($image_name != null) {
            $topic->avatar_name = $image_name;
            $topic->avatar_url = $this->s3_url . $image_name;
        }
        $topic->class_id = $request->class_id;
        $topic->author_id = $this->user->id;
        $topic->deadline = $request->deadline;
        $topic->save();
        $class = StudyClass::find($request->class_id);
        foreach ($class->registers as $register) {
            $notification = new Notification;
            $notification->actor_id = $this->user->id;
            $notification->product_id = $topic->id;
            $notification->receiver_id = $register->user->id;
            $notification->type = 5;
            $notification->save();
            $data = array(
                "message" => "Lớp " . $class->name . ": " . $this->user->name . " vừa tạo một topic mới ",
                "link" => url('group/class/' . $request->class_id . '#/topic/' . $topic->id),
                'created_at' => format_date_full_option($notification->created_at),
                "receiver_id" => $notification->receiver_id
            );

            $publish_data = array(
                "event" => "notification",
                "data" => $data
            );
            Redis::publish(config('app.channel'), json_encode($publish_data));
        }
        return response()->json($topic, 200);
    }

    public function store_video($topicId, Request $request)
    {
        $image = new Image();
        $image->owner_id = $this->user->id;
        $image->type = 1;
        $image_name = uploadLargeFileToS3UseCloudConvert($request, 'video', null);
        if ($image_name != null) {
            $image->name = $image_name;
            $image->url = $this->s3_url . $image_name;
        }
        $image->product_id = $request->product_id;
        if ($request->index == 0) {
            $product = Product::find($image->product_id);
            $product->url = $image->url;
            $product->image_name = $image->name;
            $product->save();
        }
        $image->save();
        $msg = [
            'message' => "Tải lên thành công"
        ];

        return response()->json($msg, 200);
    }

    public function store_images($topicId, Request $request)
    {
        $image = new Image();
        $image->type = 0;
        $image->owner_id = $this->user->id;
        $image_name = uploadFileToS3($request, 'image', 800, null);
        if ($image_name != null) {
            $image->name = $image_name;
            $image->url = $this->s3_url . $image_name;
        }
        $image->product_id = $request->product_id;
        if ($request->index == 0) {
            $product = Product::find($image->product_id);
            $product->url = $image->url;
            $product->image_name = $image->name;
            $thumb_name = uploadFileToS3($request, 'image', 300, null);
            if ($thumb_name != null) {
                $product->thumb_name = $thumb_name;
                $product->thumb_url = $this->s3_url . $thumb_name;
            }
            $product->save();

        }
        $image->save();
        $msg = [
            'message' => "Tải lên thành công"
        ];
        return response()->json($msg, 200);
    }

    public function create_product($topicId, Request $request)
    {
        $product = new Product();
        $product->type = 3;
        $product->topic_id = $topicId;
        $product->content = $request->description;
        $product->description = $request->title;
        $product->author_id = $this->user->id;

        $product->save();

        $data = [
            'id' => $product->id
        ];
        return response()->json($data, 200);
    }

    public function studyClass($classId)
    {
        if ($classId) {
            $class = StudyClass::find($classId);
            if ($class) {
                return response()->json($this->classTransformer->transform($class));
            } else {
                return response()->json(['error' => "classId not found!"], 404);
            }

        } else {
            return response()->json(['error' => "no classId provide"], 400);
        }
    }

    public function students($classId)
    {
        if ($classId) {
            $class = StudyClass::find($classId);
            $registers = $this->registerToStudentTransformer->transformCollection($class->registers()->where('status', 1)->get());
            if ($class) {
                return response()->json($registers, 200);
            } else {
                return response()->json(['error' => "classId not found!"], 404);
            }

        } else {
            return response()->json(['error' => "no classId provide"], 400);
        }
    }

    private function vote($topicId, $value)
    {
        if ($topicId) {
            $topic = Topic::find($topicId);
            $topic->vote = $topic->vote + 1;
            $topic->save();
            $vote = new Vote();
            $vote->topic_id = $topicId;
            $vote->voter_id = $this->user->id;
            $vote->value = $value;
            $vote->save();
            return response()->json($vote, 200);
        } else {
            return response()->json(['error' => "topicId not found!"], 404);
        }
    }

    public function upvote($topicId)
    {
        return $this->vote($topicId, 1);
    }

    public function downvote($topicId)
    {
        return $this->vote($topicId, -1);
    }

}
