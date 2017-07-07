<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudySession extends Model
{
    protected $table = "study_sessions";

    public function schedules(){
        return $this->belongsToMany(Schedule::class,'schedule_study_session',
            'study_session_id','schedule_id');
    }
}
