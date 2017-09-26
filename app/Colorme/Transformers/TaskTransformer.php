<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class TaskTransformer extends Transformer
{

    public function transform($task)
    {
        $data = [
            "title" => $task->title,
            "status" => $task->status,
            "id" => $task->id,
            "span" => $task->span,
            "task_list_id" => $task->task_list_id
        ];
        if ($task->deadline && $task->deadline != "0000-00-00 00:00:00") {
            $data["deadline_str"] = time_remain_string(strtotime($task->deadline));
            $data["deadline"] = date("H:i d-m-Y", strtotime($task->deadline));
        }
        if ($task->member) {
            $data["member"] = [
                "id" => $task->member->id,
                "name" => $task->member->name,
                "avatar_url" => generate_protocol_url($task->member->avatar_url),
            ];
        }
        return $data;
    }
}