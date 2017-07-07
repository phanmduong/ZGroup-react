<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = "groups";

    public function studyClass()
    {
        return $this->belongsTo('App\StudyClass', 'class_id');
    }

    public function creator()
    {
        return $this->belongsTo('App\User', 'creator_id');
    }

    public function members()
    {
        return $this->belongsToMany('App\User', 'group_members', 'group_id', 'user_id');
    }

    public function topics()
    {
        return $this->hasMany('App\Topic', 'group_id');
    }
}
