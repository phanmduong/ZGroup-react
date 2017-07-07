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
            "commenter" => [
                'id' => $comment->commenter->id,
                'avatar_url' => $comment->commenter->avatar_url ? $comment->commenter->avatar_url : url('img/user.png'),
                'name' => $comment->commenter->name,
                'url' => url('profile/' . $comment->commenter->username)
            ],
            'product' => [
                'author' => [
                    'id' => $comment->product->author->id
                ]
            ],
            'content' => $comment->content,
            'created_at' => time_elapsed_string(strtotime($comment->created_at))
        ];
    }
}