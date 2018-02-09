<?php

namespace Modules\Topic\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\Topic;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TopicApiController extends ApiController
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

        if($limit == -1) {
            $topics->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'topics' => $topics->map(function ($topic){
                    return $topic->getData();
                })
            ]);
        }
        $topics->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($topics, [
            'topics' => $topics->map(function ($topic){
                return $topic->getData();
            })
        ]);
    }

    public function createTopic()
    {

    }

    public function getTopicProducts()
    {

    }

    public function createProduct()
    {

    }
}
