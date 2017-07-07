<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    public function classLesson()
    {
        return $this->belongsTo('App\ClassLesson','class_lesson_id');
    }
    public function register(){
        return $this->belongsTo('App\Register','register_id');
    }
}
