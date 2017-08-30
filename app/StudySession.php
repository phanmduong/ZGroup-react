<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudySession extends Model
{
    use SoftDeletes;
    protected $table = "study_sessions";

    protected $dates = ['deleted_at'];

    public function schedules(){
        return $this->belongsToMany(Schedule::class,'schedule_study_session',
            'study_session_id','schedule_id');
    }
}
