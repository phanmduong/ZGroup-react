<?php

namespace Modules\Task\Entities;

use App\Task;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    protected $table = "task_lists";

    public function tasks(){
        return $this->hasMany(Task::class, 'task_list_id');
    }
}
