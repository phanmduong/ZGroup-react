<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>47
 */

namespace App\Colorme\Transformers;


use App\Gen;
use App\Product;
use App\TopicAttendance;

class TopicTransformer extends Transformer
{

    protected $user;

    public function __construct()
    {
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    public function transform($topic)
    {
        $ta = TopicAttendance::where('topic_id', $topic->id)
            ->where('topic_id', $topic->id)->first();
        $submittedProduct = null;
        if ($ta) {
            $submittedProduct = $ta->product;
        }
        $totalMembers = $topic->topicAttendances()->count();
        $submittedMembers = $topic->topicAttendances()->where('product_id', '!=', NULL)->count();
        $data = [
            'id' => $topic->id,
            'created_at' => time_elapsed_string(strtotime($topic->created_at)),
            'created_time' => format_time_to_mysql(strtotime($topic->created_at)),
            'title' => $topic->title,
            'deadline' => time_remain_string(strtotime($topic->deadline)),
            'deadline_raw' => $topic->deadline,
            'description' => $topic->description,
            'avatar_url' => $topic->avatar_url,
            'thumb_url' => $topic->thumb_url,
            'is_required' => $topic->is_required == 1,
            'group_id' => $topic->group->link,
            'weight' => $topic->weight,
            "total_members" => $totalMembers,
            "submitted_members" => $submittedMembers,
            'avatar_is_video' => $topic->avatar_is_video,
            'content_str' => $topic->content,
            'isSubmitted' => $submittedProduct != null,
            'joined' => ($this->user != null) && ($topic->users()->where('user_id', $this->user->id)->first() != null),
            'creator' => [
                'name' => $topic->creator->name,
                'avatar_url' => $topic->creator->avatar_url,
                'username' => $topic->creator->username
            ]
        ];

        if ($this->user) {
            $topicAttendance = TopicAttendance::where('user_id', $this->user->id)->where('topic_id', $topic->id)->first();
            if ($topicAttendance) {
                $data['isSubmitted'] = $topicAttendance->product != null;
            }
        }

        return $data;
    }
}