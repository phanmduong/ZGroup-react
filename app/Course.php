<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function classes(){
        return $this->hasMany('App\StudyClass');
    }
    public function lessons(){
        return $this->hasMany('App\Lesson','course_id');
    }
    public function links(){
        return $this->hasMany('App\Link','course_id');
    }
}
