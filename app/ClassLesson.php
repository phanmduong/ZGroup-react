<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassLesson extends Model
{
    protected $table = 'class_lesson';

    public function attendances()
    {
        return $this->hasMany('App\Attendance', 'class_lesson_id');
    }

    public function lesson()
    {
        return $this->belongsTo('App\Lesson', 'lesson_id');
    }

    public function studyClass()
    {
        return $this->belongsTo('App\StudyClass', 'class_id');
    }

    public function teachingLesson()
    {
        return $this->hasMany(TeachingLesson::class, 'class_lesson_id');
    }

    public function teachingLessonChange()
    {
        return $this->hasMany(TeachingLessonChange::class, 'class_lesson_id');
    }
}
