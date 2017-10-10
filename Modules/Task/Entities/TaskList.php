<?php

namespace Modules\Task\Entities;

use App\Card;
use App\Task;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    protected $table = "task_lists";

    protected $fillable = ["title"];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'task_list_id');
    }

    public function card()
    {
        return $this->belongsTo(Card::class, 'card_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "type" => $this->type,
            "num_tasks" => $this->tasks()->count(),
            "tasks" => $this->tasks->map(function ($task) {
                return $task->transform();
            })
        ];
    }
}
