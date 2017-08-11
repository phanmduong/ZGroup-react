<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
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
}
