<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function card()
    {
        return $this->belongsTo(Card::class, 'card_id');
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
