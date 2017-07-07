<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = "schedules";

    public function studySessions()
    {
        return $this->belongsToMany(StudySession::class, "schedule_study_session", "schedule_id", "study_session_id");
    }

    public function classes()
    {
        return $this->hasMany(StudyClass::class,'schedule_id');
    }
}
