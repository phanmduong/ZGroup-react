<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 19=>02
 */

namespace App\Colorme\Transformers;


class TopicActionTransformer extends Transformer
{
    public function transform($topicAction)
    {
        return [
            "id" => $topicAction->id,
            "content" => $topicAction->content,
            "user" => [
                "id" => $topicAction->user->id,
                "username" => $topicAction->user->username,
                "name" => $topicAction->user->name,
                "avatar_url" => $topicAction->user->avatar_url
            ],
            "created_at" => time_elapsed_string(strtotime($topicAction->created_at))
        ];
    }
}