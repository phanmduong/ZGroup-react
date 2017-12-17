<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\Good\Entities\BoardTaskTaskList;
use Modules\Good\Entities\GoodPropertyItem;
use Modules\Good\Entities\GoodPropertyItemTask;
use Modules\Task\Entities\TaskList;

class Task extends Model
{
    public function taskList()
    {
        return $this->belongsTo(TaskList::class, 'task_list_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function goodPropertyItems()
    {
        return $this->belongsToMany(GoodPropertyItem::class, 'good_property_item_task',
            'task_id', 'good_property_item_id')->withPivot("order");
    }

    public function currentBoard()
    {
        return $this->belongsTo(Board::class, "current_board_id");
    }

    public function targetBoard()
    {
        return $this->belongsTo(Board::class, "target_board_id");
    }

    public function templateTask()
    {
        return $this->belongsTo(Task::class, "task_template_id");
    }

    public function boardTasks()
    {
        return $this->hasMany(BoardTaskTaskList::class, "task_id");
    }

    public function goodPropertyItemTasks()
    {
        return $this->hasMany(GoodPropertyItemTask::class, "task_id");
    }

    public function users()
    {
        return $this->belongsToMany(User::class, "user_task", "task_id", "user_id")
            ->withTimestamps();
    }

    public function transform()
    {
        $data = [
            "title" => $this->title,
            "status" => $this->status,
            "id" => $this->id,
            "span" => $this->span,
            "task_list_id" => $this->task_list_id
        ];


        $data['current_board_id'] = $this->current_board_id;
        $data['order'] = $this->order;

        if ($this->goodPropertyItemTasks) {
            $data['good_property_items'] = $this->goodPropertyItemTasks()->orderBy("order")->get()->map(function ($item) {
                $goodPropertyItem = GoodPropertyItem::find($item->good_property_item_id);
                $data = $goodPropertyItem->transform();
                $data['order'] = $item->order;
                return $data;
            });
        }


        if ($this->currentBoard) {
            $data["current_board"] = [
                "id" => $this->currentBoard->id,
                "value" => $this->currentBoard->id,
                "label" => $this->currentBoard->title,
                "title" => $this->currentBoard->title
            ];
        }

        if ($this->boardTasks) {
            $data["board_tasks"] = $this->boardTasks->map(function ($boardTask) {
                return $boardTask->transform();
            });
        }

        if ($this->targetBoard) {
            $data["target_board"] = [
                "id" => $this->targetBoard->id,
                "value" => $this->targetBoard->id,
                "title" => $this->targetBoard->title,
                "label" => $this->targetBoard->title
            ];
        }

        if ($this->deadline && $this->deadline != "0000-00-00 00:00:00") {
            $data["deadline_str"] = time_remain_string(strtotime($this->deadline));
            $data["deadline"] = date("H:i d-m-Y", strtotime($this->deadline));
        }
        if ($this->users) {
            $data["members"] = $this->users->map(function ($user) {
                return [
                    "id" => $user->id,
                    "name" => $user->name,
                    "avatar_url" => generate_protocol_url($user->avatar_url),
                ];
            });
        }
        return $data;
    }
}
