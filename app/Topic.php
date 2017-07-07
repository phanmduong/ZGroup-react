<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $table = "topics";

    public function group()
    {
        return $this->belongsTo('App\Group', 'group_id');
    }

    public function creator()
    {
        return $this->belongsTo('App\User', 'creator_id');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'topic_attendances', 'topic_id', 'user_id');
    }

    public function topicAttendances()
    {
        return $this->hasMany('App\TopicAttendance', 'topic_id');
    }

    public function topicActions()
    {
        return $this->hasMany('App\TopicAction', 'topic_id');
    }
}
