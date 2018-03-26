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

    public function createTopic(Request $request)
    {
        $topic = new Topic;
        if($request->title === null || trim($request->title) === '')
            return $this->respondErrorWithStatus('Thiếu tiêu đề');
        $topic->title = $request->title;
        $topic->avatar_url = $request->avatar_url;
        $topic->description = $request->description;
        $topic->content = $request->content;
        $topic->thumb_url = $request->thumb_url;
        $topic->creator_id = $this->user->id;
        $topic->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Tạo topic thành công'
        ]);
    }

    public function createProduct()
    {

    }
}
