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
        return [
            "title" => $task->title,
            "status" => $task->status,
            "id" => $task->id,
            "task_list_id" => $task->task_list_id
        ];
    }
}