<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Task\Entities\CardLabel;
use Modules\Task\Entities\TaskList;

class Card extends Model
{
    use SoftDeletes;

    protected $table = "cards";

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
}
