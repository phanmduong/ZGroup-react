<?php

namespace App\Http\Controllers;

use App\Gen;
use App\Product;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use stdClass;

class ManagePostController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function posts(Request $request)
    {
        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentTeachGen();
        }

        $this->data['current_tab'] = 52;

        $classes = $current_gen->studyclasses;

        if ($request->class_id) {
            $current_class = StudyClass::find($request->class_id);
        } else {
            $current_class = $classes[0];
        }

        $postsPagninate = Product::whereExists(function ($query) use ($current_class) {
            $query->select(DB::raw(1))
                ->from('topic_attendances')
                ->join('topics', 'topics.id', '=', 'topic_attendances.topic_id')
                ->where('topics.group_id', $current_class->group->id)
                ->whereRaw('topic_attendances.product_id = products.id');
        })->orderBy('created_at', 'desc')->paginate();

        $posts = $postsPagninate->map(function ($post) {
            $topicAttendance = $post->topicAttendance;
            $post->hasTopic = false;
            if ($topicAttendance) {
                $post->hasTopic = true;
                $topic = $topicAttendance->topic;
                $post->topic = $topic;

                $class = $topic->group->studyClass;
                if ($class) {
                    $post->class = $class;
                    $post->teacher_comments = collect([]);
                    $post->assist_comments = collect([]);
                    if ($class->teach) {
                        $post->teacher = $class->teach;
                        $post->teacher_comments = $post->comments()->where('commenter_id', $class->teach->id)->get();
                    }
                    if ($class->assist) {
                        $post->assist = $class->assist;
                        $post->assist_comments = $post->comments()->where('commenter_id', $class->assist->id)->get();
                    }
                }
            }
            return $post;
        });

        $this->data['current_gen'] = $current_gen;
        $this->data['current_class'] = $current_class;
        $this->data['classes'] = $classes;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();
        $this->data['posts'] = $posts;
        $this->data['postsPagninate'] = $postsPagninate;
        return view('manage.post.posts', $this->data);
    }

    public function staff_comment_list(Request $request)
    {
        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentTeachGen();
        }

        $teacherIds = $current_gen->studyclasses()->pluck("teacher_id")->toArray();
        $taIds = $current_gen->studyclasses()->pluck("teaching_assistant_id")->toArray();
        $ids = array_merge($teacherIds, $taIds);

        $staffs = User::whereIn("id", $ids)->get();

        $this->data['staffs'] = $staffs->map(function ($staff) use ($current_gen) {
            $total_comments = 0;
            $commented = 0;
            $teach_classes = [];
            $assist_classes = [];

            $teachs = $staff->teach()->where('gen_id', $current_gen->id)->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('groups')
                    ->whereRaw('groups.class_id = classes.id');
            })->get();

            $assists = $staff->assist()->where('gen_id', $current_gen->id)->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('groups')
                    ->whereRaw('groups.class_id = classes.id');
            })->get();


            foreach ($teachs as $class) {
                $temp = new stdClass;
                $temp->class = $class;
                $temp->uncomments = 0;
                $temp->commented = 0;

                foreach ($class->group->topics as $topic) {
                    $temp->uncomments += $topic->topicAttendances()->where('commented', false)->where('ta_commented', false)->whereNotNull('product_id')->count();
                    $temp->commented += $topic->topicAttendances()->where('commented', true)->count();
                };
                $total_comments += $temp->uncomments + $temp->commented;
                $commented += $temp->commented;
                array_push($teach_classes, $temp);
            };
            foreach ($assists as $class) {
                $temp = new stdClass;
                $temp->class = $class;
                $temp->uncomments = 0;
                $temp->commented = 0;
                foreach ($class->group->topics as $topic) {

                    $temp->uncomments += $topic->topicAttendances()->where('commented', false)->where('ta_commented', false)->whereNotNull('product_id')->count();
                    $temp->commented += $topic->topicAttendances()->where('ta_commented', true)->count();
                };
                $total_comments += $temp->uncomments + $temp->commented;
                $commented += $temp->commented;
                array_push($assist_classes, $temp);
            };

            $staff->commented = $commented;
            $staff->total_comments = $total_comments;
            $staff->teach_classes = $teach_classes;
            $staff->assist_classes = $assist_classes;

            return $staff;
        });
//        dd($staffs);
        $this->data['current_tab'] = 53;
        $this->data['penalty'] = 10000;
        $this->data['current_gen'] = $current_gen;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();
        return view('manage.post.comment_list', $this->data);
    }
}
