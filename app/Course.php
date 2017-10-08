<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes;
    public function classes(){
        return $this->hasMany('App\StudyClass');
    }
    public function lessons(){
        return $this->hasMany('App\Lesson','course_id');
    }
    public function links(){
        return $this->hasMany('App\Link','course_id');
    }
    public function transform(){
        return [
            'name'=> $this->name,
            'icon_url' => $this->icon_url,
            'num_classes' => $this->classes()->where("name","like","%.%")->count(),
            'duration'=> $this->duration,
            'price'=>$this->price,

        ];
    }
}
