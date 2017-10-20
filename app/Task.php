<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\Good\Entities\GoodPropertyItem;
use Modules\Task\Entities\TaskList;

class Task extends Model
{
    public function taskList()
    {
        return $this->belongsTo(TaskList::class, 'task_list_id');
    }

    public function member()
    {
        return $this->belongsTo(User::class, 'assignee_id');
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
        return $this->belongsToMany(GoodPropertyItem::class, 'good_property_item_task', 'task_id', 'good_property_item_id');
    }

    public function currentBoard()
    {
        return $this->belongsTo(Board::class, "current_board_id");
    }

    public function targetBoard()
    {
        return $this->belongsTo(Board::class, "target_board_id");
    }

    public function transform()
    {
        $data = [
            "current_board_id" => $this->current_board_id,
            "target_board_id" => $this->target_board_id,
            "title" => $this->title,
            "status" => $this->status,
            "id" => $this->id,
            "span" => $this->span,
            "good_property_items" => $this->goodPropertyItems->map(function ($item) {
                return $item->transform();
            }),
            "task_list_id" => $this->task_list_id,
            "order" => $this->order,
        ];

        if ($this->currentBoard) {
            $data["current_board"] = [
                "id" => $this->currentBoard->id,
                "value" => $this->currentBoard->id,
                "label" => $this->currentBoard->title,
                "title" => $this->currentBoard->title
            ];
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
        if ($this->member) {
            $data["member"] = [
                "id" => $this->member->id,
                "name" => $this->member->name,
                "avatar_url" => generate_protocol_url($this->member->avatar_url),
            ];
        }
        return $data;
    }
}
