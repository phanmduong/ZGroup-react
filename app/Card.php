<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Task\Entities\CardLabel;
use Modules\Task\Entities\TaskList;
use Modules\Task\Transformers\MemberTransformer;

class Card extends Model
{
//    use SoftDeletes;

    protected $table = "cards";

    protected $memberTransformer;

    public function tasks()
    {
        return $this->hasMany(Task::class, 'card_id');
    }

    public function board()
    {
        return $this->belongsTo(Board::class, 'board_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function taskLists()
    {
        return $this->hasMany(TaskList::class, "card_id");
    }

    public function assignees()
    {
        return $this->belongsToMany(User::class, "card_user", "card_id", "user_id");
    }

    public function files()
    {
        return $this->hasMany(File::class, "card_id");
    }

    public function cardLabels()
    {
        return $this->belongsToMany(CardLabel::class, "card_card_labels", "card_id", "card_label_id");
    }

    public function cardComments()
    {
        return $this->hasMany(CardComment::class, "card_id");
    }

    public function good()
    {
        return $this->belongsTo(Good::class, "good_id");
    }

    public function transform()
    {
        $this->memberTransformer = new MemberTransformer();
        $taskListIds = $this->taskLists->pluck("id");
        $hasDeadline = $this->deadline && $this->deadline != "0000-00-00 00:00:00";
        $board = $this->board;


        $data = [
            'id' => $this->id,
            'title' => $this->title,
            'is_end' => false,
            "point" => $this->point,
            "deadline_elapse" => $hasDeadline ? time_remain_string(strtotime($this->deadline)) : null,
            "deadline" => $hasDeadline ? format_vn_short_datetime(strtotime($this->deadline)) : null,
            'board_id' => $this->board_id,
            "good_id" => $this->good_id,
            "completed" => false,
            "board" => [
                "id" => $board->id,
                "title" => $board->title
            ],
            "status" => $this->status,
            'order' => $this->order,
            "cardLabels" => $this->cardLabels,
            "tasks" => Task::whereIn("task_list_id", $taskListIds)->get()->map(function ($task) {
                return $task->transform();
            }),
            "members" => $this->memberTransformer->transformCollection($this->assignees)
        ];


        if ($this->good_id !== 0) {
            $taskList = $this->taskLists()->first();

            if ($taskList) {
                $task = $taskList->tasks()->where("current_board_id", $this->board_id)->first();
                if ($task) {
                    if ($task->boardTasks->count() === 0) {
                        $data['is_end'] = true;
                    }
                    if ($task->status == true) {
                        $data["completed"] = true;
                    }
                }
            }
        }


        return $data;
    }
}
