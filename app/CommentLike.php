<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentLike extends Model
{
    protected $table = 'comment_likes';

    public function liker()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
