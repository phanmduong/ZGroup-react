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

class GroupTransformer extends Transformer
{
    protected $productTransformer;
    protected $topicTransformer;
    protected $user;

    public function __construct(ProductTransformer $productTransformer, TopicTransformer $topicTransformer)
    {
        $this->productTransformer = $productTransformer;
        $this->topicTransformer = $topicTransformer;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function transform($group)
    {
        $topics = $group->topics()->orderBy('created_at', 'desc')->get();
        $topic_ids = $topics->pluck('id');
        $product_ids = TopicAttendance::whereIn('topic_id', $topic_ids)->get()->pluck('product_id');
        $products = Product::whereIn('id', $product_ids)->orderBy('created_at', 'desc')->get();
        $this->topicTransformer->setUser($this->user);

        $data = [
            'link' => $group->link,
            'topics' => $this->topicTransformer->transformCollection($topics),
            'avatar_url' => $group->avatar_url,
            'name' => $group->name,
            'products' => $this->productTransformer->transformCollection($products),
            'members' => $group->members->map(function ($member) {
                return [
                    'username' => $member->username,
                    'name' => $member->name,
                    'university' => $member->university,
                    'avatar_url' => $member->avatar_url ? $member->avatar_url : "http://d1j8r0kxyu9tj8.cloudfront.net/webs/user.png"
                ];
            })
        ];


        $data['is_member'] = $this->user != null && $group->members()->where('user_id', $this->user->id)->first() != null;

        return $data;
    }
}