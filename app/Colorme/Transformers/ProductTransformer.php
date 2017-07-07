<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class ProductTransformer extends Transformer
{
    protected $authorTransformer, $user;

    public function __construct(AuthorTransformer $authorTransformer)
    {
        $this->authorTransformer = $authorTransformer;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function transform($product)
    {
        $data = [
            'id' => $product->id,
            'type' => $product->type,
            'views_count' => $product->views,
            'title' => "Bài tập ColorME",
            'likes_count' => $product->likes()->count(),
            'created_at' => time_elapsed_string(strtotime($product->created_at)),
            'comments_count' => $product->comments()->count(),
            'author' => $this->authorTransformer->transform($product->author),
            'tags' => explode(",", $product->tags),
            'more_products' => [],
            'likers' => $product->likes->map(function ($like) {
                return [
                    'name' => $like->liker->name,
                    'username' => $like->liker->username,
                    'avatar_url' => $like->liker->avatar_url ? $like->liker->avatar_url : "http://d1j8r0kxyu9tj8.cloudfront.net/webs/user.png"
                ];
            })
        ];

        if ($product->feature_id) {
            $data['feature'] = [
                "id" => $product->feature->id,
                "name" => $product->feature->name,
                "username" => $product->feature->username
            ];
        }

        if ($product->topicAttendance) {
            $topic = $product->topicAttendance->topic;
            if ($topic) {
                $group = $topic->group;
                if ($group) {
                    $data['group'] = [
                        'id' => $group->id,
                        'name' => $group->name,
                        'link' => '/group/' . $group->link
                    ];
                }
            }
        }

        if ($product->need_comment) {
            $time = $product->created_at != '0000-00-00 00:00:00' ?
                ceil(diffDate(date('Y-m-d H:i:s'), $product->created_at)) + 24 : 0;
            if ($time >= 0) {
                $data['comment_time'] = $time;
                $data['need_comment'] = true;
            } else {
                $data['comment_time'] = $time;
                $data['need_comment'] = true;
            }
        } else {
            $data['need_comment'] = false;
        }

        if ($product->category) {
            $data['category'] = [
                'name' => $product->category->name,
                'id' => $product->category->id
            ];
            $data['category_id'] = $product->category->id;
        }
        if ($this->user) {
            $liked = $product->likes()->where('liker_id', $this->user->id)->first() != null;
            $data['liked'] = $liked;
        }
        switch ($product->type) {
            case 0:
                $data['thumb_url'] = $product->thumb_url;
                $data['image_url'] = $product->url;
//                $data['tags'] = $product->tags;
                $data['description'] = $product->description;
                break;
            case 1:
                $data['video_url'] = $product->url;
//                $data['tags'] = $product->tags;
                $data['description'] = $product->description;
                break;
            case 2:
                if ($product->thumb_name) {
                    $data['thumb_url'] = $product->thumb_url;
                    $data['thumb_name'] = $product->thumb_name;
                    $data['image_url'] = $product->url;
                    $data['colors'] = $product->colors->map(function ($color) {
                        return $color->value;
                    });
                } else {
                    $data['video_url'] = $product->url;
                    $data['thumb_url'] = $product->thumb_url;
                }
//                $data['tags'] = $product->tags;
                $data['title'] = $product->title;
                $data['description'] = $product->description;
                break;
            case 3:
                if ($product->thumb_url) {
                    $data['thumb_url'] = $product->thumb_url;
                    $data['image_url'] = $product->url;
                    $data['sub_type'] = 0;

                } else {
                    $data['video_url'] = $product->url;
                    $data['sub_type'] = 1;
                }

//                $data['tags'] = $product->tags;
                $data['title'] = $product->title;
                $data['description'] = $product->description;
                break;
        }
        if ($data['title'] == null || $data['title'] == "") {
            $data['title'] = "Bài tập ColorME";
        }
        $data['linkId'] = convert_vi_to_en($data['title']) . "-" . $product->id;
        return $data;
    }
}