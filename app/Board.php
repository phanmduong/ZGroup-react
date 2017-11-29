<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Board extends Model
{
    protected $table = "boards";

    use SoftDeletes;

    public function cards()
    {
        return $this->hasMany(Card::class, 'board_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function currentTasks()
    {
        return $this->hasMany(Task::class, "current_board_id");
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "is_start" => $this->is_start,
            "order" => $this->order
        ];
    }

    public function transformWithTaskList($taskList)
    {
        $boardIds = $taskList->tasks->map(function ($task) {
            return $task->current_board_id;
        })->toArray();
        $data = $this->transform();
        $data["checked"] = in_array($this->id, $boardIds);
        return $data;
    }

    public function transformBoardWithCard()
    {
        $cards = $this->cards()->where("status", "open")->orderBy('order')->get();
        $data = $this->transform();

        $data["cards"] = $cards->map(function ($card) {
            return $card->transform();
        });
        return $data;
    }


}
