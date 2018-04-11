<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupMember extends Model
{
    protected $table = "group_members";

    public function group()
    {
        return $this->belongsTo('App\StudyClass', 'group_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function acceptor()
    {
        return $this->belongsTo('App\User', 'acceptor_id');
    }
}
