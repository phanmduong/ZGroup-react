<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TopicAction extends Model
{
    protected $table = "topic_actions";

    public function topic()
    {
        return $this->belongsTo('App\Topic', 'topic_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
