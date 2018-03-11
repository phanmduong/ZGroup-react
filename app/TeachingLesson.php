<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;

class TeachingLesson extends Model
{
    protected $table = 'teaching_lessons';

    public function classLesson()
    {
        return $this->belongsTo(ClassLesson::class, 'class_lesson_id');
    }

    public function teacher_check_in()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'teacher_checkin_id');
    }

    public function teacher_check_out()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'teacher_checkout_id');
    }

    public function ta_check_in()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'ta_checkin_id');
    }

    public function ta_check_out()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'ta_checkout_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function teaching_assistant()
    {
        return $this->belongsTo(User::class, 'teaching_assistant_id');
    }

    public function staff()
    {
        return $this->belongsTo(User::class, 'teaching_id');
    }

    public function class_position()
    {
        return $this->belongsTo(ClassPosition::class, 'class_position_id');
    }

    public function check_in()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'checkin_id');
    }

    public function check_out()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'checkout_id');
    }
}
