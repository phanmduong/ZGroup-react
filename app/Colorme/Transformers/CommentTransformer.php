<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class CommentTransformer extends Transformer
{

    public function transform($comment)
    {
        return [
            'id' => $comment->id,
            'image_url' => $comment->image_url,
            "commenter" => [
                'id' => $comment->commenter->id,
                'avatar_url' => $comment->commenter->avatar_url ? $comment->commenter->avatar_url : url('img/user.png'),
                'name' => $comment->commenter->name,
                'url' => url('profile/' . $comment->commenter->username)
            ],
            'likes' => $comment->likes,
            'likers' => $comment->comment_likes->map(function ($c) {
                return [
                    'name' => $c->liker->name
                ];
            }),
            'product' => [
                'author' => [
                    'id' => $comment->product->author->id
                ]
            ],
            'parent_id' => $comment->parent_id,
            'content' => $comment->content,
            'created_at' => time_elapsed_string(strtotime($comment->created_at))
        ];
    }
}