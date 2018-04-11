<?php

namespace Modules\Task\Entities;

use App\Card;
use App\Task;
use Illuminate\Database\Eloquent\Model;
use Modules\Good\Entities\GoodPropertyItem;

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

    public function goodPropertyItems()
    {
        return $this->belongsToMany(GoodPropertyItem::class, 'good_property_item_task', 'task_id', 'good_property_item_id');
    }

    public function getData()
    {
        $data = [
            "id" => $this->id,
            "title" => $this->title,
            "type" => $this->type,
            "role" => $this->role,
            "num_tasks" => $this->tasks()->count()
        ];
        return $data;
    }

    public function transform()
    {
        $data = $this->getData();
        $data["tasks"] = $this->tasks->map(function ($task) {
            return $task->transform();
        });
        return $data;
    }

    public function transformWithOrderedTasks()
    {
        $data = $this->getData();
        $data["tasks"] = $this->tasks()->orderBy("order")->get()->map(function ($task, $key) {
            if ($task->order == null) {
                $task->order = $key;
                $task->save();
            }
            return $task->transform();
        });

        return $data;
    }
}
