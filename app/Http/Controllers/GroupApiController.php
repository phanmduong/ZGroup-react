<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\GroupTransformer;
use App\Colorme\Transformers\TopicTransformer;
use App\Group;
use App\Repositories\NotificationRepository;
use App\Topic;
use App\TopicAttendance;
use Illuminate\Http\Request;

use App\Http\Requests;
use Tymon\JWTAuth\Facades\JWTAuth;

class GroupApiController extends ApiController
{
//    protected $groupTransformer;
    protected $topicTransformer;
    protected $notificationRepository;

    public function __construct(
        NotificationRepository $notificationRepository,
        GroupTransformer $groupTransformer,
        TopicTransformer $topicTransformer)
    {
        parent::__construct();
        $this->topicTransformer = $topicTransformer;
        $this->notificationRepository = $notificationRepository;
    }

    public function delete_topic($topicId)
    {
        if ($this->user->role >= 1) {
            $topic = Topic::find($topicId);
            $topicAttendances = TopicAttendance::where('topic_id', $topicId)->get();
            foreach ($topicAttendances as $topicAttendance) {
                $topicAttendance->delete();
            }
            $topic->delete();
            return $this->respond(["status" => 1]);
        } else {
            return $this->respondErrorWithStatus("Bạn không có quyền xoá topic");
        }

    }

    public function save_topic(Request $request)
    {
        $groupId = $request->group_id;
        $topic = Topic::find($request->id);
        if ($topic) {
            $group = Group::find($topic->group_id);
        } else {
            $group = Group::where('link', $groupId)->first();
        }

        $user = $group->members()->where('user_id', $this->user->id)->first();
        if ($user) {
            if (!$topic) {
                $topic = new Topic();
                $topic->avatar_name = $request->avatar_name;
                $topic->thumb_name = $request->thumb_name;
            }
            $topic->title = $request->title;
            $topic->deadline = $request->deadline;
            $topic->description = $request->description;
            $topic->content = $request->content_str;
            $topic->tags = $request->tags;
            $topic->weight = $request->weight;
            $topic->avatar_url = $request->avatar_url;
            $topic->avatar_is_video = $request->avatar_is_video;
            $topic->thumb_url = $request->thumb_url;
            $topic->group_id = $group->id;
            $topic->is_required = $request->is_required;
            $topic->creator_id = $this->user->id;
            $topic->save();

            foreach ($group->members as $member) {
                $topicAttendance = new TopicAttendance();
                $topicAttendance->topic_id = $topic->id;
                $topicAttendance->user_id = $member->id;
                $topicAttendance->save();
                $this->notificationRepository->sendCreateTopicNotification($this->user, $member, $topic);
            }

            return $this->respond(['message' => "Tạo topic thành công"]);
        } else {
            return $this->responseUnAuthorized(["message" => "Bạn không thuộc nhóm này"]);
        }

    }


}
