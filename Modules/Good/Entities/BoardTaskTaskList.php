<?php

namespace Modules\Good\Entities;

use App\Board;
use Illuminate\Database\Eloquent\Model;
use Modules\Task\Entities\TaskList;

class BoardTaskTaskList extends Model
{
    protected $table = "board_tasks";

    public function board()
    {
        return $this->belongsTo(Board::class, "board_id");
    }

    public function taskList()
    {
        return $this->belongsTo(TaskList::class, "task_list_id");
    }

    public function transform()
    {
        return [
            "board" => [
                "id" => $this->board->id,
                "title" => $this->board->title
            ],
            "process" => [
                "id" => $this->taskList->id,
                "title" => $this->taskList->title
            ]
        ];
    }

}
