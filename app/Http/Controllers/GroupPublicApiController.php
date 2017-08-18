<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\GroupTransformer;
use App\Colorme\Transformers\ProductTransformer;
use App\Colorme\Transformers\TopicActionTransformer;
use App\Colorme\Transformers\TopicTransformer;
use App\Group;
use App\Product;
use App\Topic;
use App\TopicAttendance;
use Illuminate\Http\Request;

use App\Http\Requests;
use Tymon\JWTAuth\Facades\JWTAuth;

class GroupPublicApiController extends ApiController
{
    protected $groupTransformer;
    protected $topicTransformer;
    protected $productTransformer;
    protected $topicActionTransformer;

    public function __construct(GroupTransformer $groupTransformer,
                                TopicTransformer $topicTransformer,
                                TopicActionTransformer $topicActionTransformer,
                                ProductTransformer $productTransformer)
    {
//        parent::__construct();
        $this->groupTransformer = $groupTransformer;
        $this->topicTransformer = $topicTransformer;
        $this->topicActionTransformer = $topicActionTransformer;
        $this->productTransformer = $productTransformer;
    }

    public function topic( $topicId, Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->topicTransformer->setUser($user);
        }
        $topic = Topic::find($topicId);
        return $this->respond($this->topicTransformer->transform($topic));
    }

    public function group( $groupId, Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->groupTransformer->setUser($user);
        }

        $group = Group::where('link', $groupId)->first();
        if ($group) {
            return $this->respond([
                "status" => 1,
                "group" => $this->groupTransformer->transform($group)
            ]);
        } else {
            return $this->respond([
                "status" => 0,
                "message" => "Nhóm này không tồn tại"
            ]);
        }

    }

    public function topic_products( $topicId, Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->productTransformer->setUser($user);
        }
        $product_ids = TopicAttendance::where('topic_id', $topicId)->get()->pluck('product_id');
        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 20;
        }
        $products = Product::whereIn('id', $product_ids)->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($products, ['products' => $this->productTransformer->transformCollection($products)]);
    }

    public function topic_actions( $topicId)
    {
        $topic = Topic::find($topicId);
        $topicActions = $topic->topicActions;
        return $this->respond(["topicActions" => $this->topicActionTransformer->transformCollection($topicActions)]);
    }

}
