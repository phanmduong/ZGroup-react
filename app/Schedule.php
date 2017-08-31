<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use SoftDeletes;
    protected $table = "schedules";

    protected $dates = ['deleted_at'];

    public function studySessions()
    {
        return $this->belongsToMany(StudySession::class, "schedule_study_session", "schedule_id", "study_session_id");
    }

    public function classes()
    {
        return $this->hasMany(StudyClass::class,'schedule_id');
    }
}
