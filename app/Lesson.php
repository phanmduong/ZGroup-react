<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    public function course()
    {
        return $this->belongsTo('App\Course', 'course_id');
    }

    public function classes()
    {
        return $this->belongsToMany('App\StudyClass', 'class_lesson', 'lesson_id', 'class_id')->withPivot('time');
    }

    public function classLessons()
    {
        return $this->hasMany('App\ClassLesson', 'lesson_id');
    }

    public function surveys()
    {
        return $this->belongsToMany('App\Survey', 'lesson_survey');
    }
}
