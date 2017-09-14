<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeachingLesson extends Model
{
    protected $table = "teaching_lessons";

    public function classLesson()
    {
        return $this->belongsTo(ClassLesson::class, "class_lesson_id");
    }
}
