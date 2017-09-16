<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;

class TeachingLesson extends Model
{
    protected $table = "teaching_lessons";

    public function classLesson()
    {
        return $this->belongsTo(ClassLesson::class, "class_lesson_id");
    }

    public function teacher_check_in(){
        return $this->belongsTo(CheckInCheckOut::class, "teacher_checkin_id");
    }

    public function teacher_check_out(){
        return $this->belongsTo(CheckInCheckOut::class, "teacher_checkout_id");
    }

    public function ta_check_in(){
        return $this->belongsTo(CheckInCheckOut::class, "ta_checkin_id");
    }

    public function ta_check_out(){
        return $this->belongsTo(CheckInCheckOut::class, "ta_checkout_id");
    }
}
