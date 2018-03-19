<?php

namespace Modules\Topic\Http\Controllers;

use App\Topic;
use Illuminate\Http\Request;
use Modules\Base\Http\Controllers\PublicApiController;

class TopicPublicApiController extends PublicApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getTopics(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $topics = Topic::query();

        $topics = $topics->where('title', 'like', '%' . $request->search . '%');

        if ($limit == -1) {
            $topics = $topics->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'topics' => $topics->map(function ($topic) {
                    return $topic->getData();
                })
            ]);
        }
        $topics = $topics->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($topics, [
            'topics' => $topics->map(function ($topic) {
                return $topic->getData();
            })
        ]);
    }

    public function getTopic($topicId, Request $request)
    {
        $topic = Topic::find($topicId);
        if($topic == null)
            return $this->respondErrorWithStatus('Không tồn tại topic');
        return $this->respondSuccessWithStatus([
            'topic' => $topic->getData(),
        ]);
    }
}
