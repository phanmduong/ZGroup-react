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
        return $this->belongsToMany(Board::class);
    }

    public function taskList()
    {
        return $this->belongsToMany(TaskList::class);
    }
}
