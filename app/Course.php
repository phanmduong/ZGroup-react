<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes;
    protected $table = "courses";
    public function classes()
    {
        return $this->hasMany('App\StudyClass');
    }

    public function lessons()
    {
        return $this->hasMany('App\Lesson', 'course_id');
    }

    public function links()
    {
        return $this->hasMany('App\Link', 'course_id');
    }

    public function detailedTransform()
    {
        return [
            "id" =>$this->id,
            "name" => $this->name,
            "duration" => $this->duration,
            "price" => $this->price,
            "description" => $this->price,
            "linkmac" => $this->linkmac,
            "linkwindow" => $this->linkwindow,
            "mac_how_install" => $this->mac_how_install,
            "window_how_install" => $this->window_how_install,
            "cover_url" => $this->cover_url,
            "color" => $this->color,
            "image_url" => $this->image_url,
            "icon_url" => $this->icon_url,
            "created_at" => format_time_to_mysql(strtotime($this->created_at)),
            "detail" => $this->detail,
            "lessons" => $this->lessons,
            "links" => $this->links
        ];
    }
    public function transform(){
        return [
            'id' =>$this->id,
            'name'=> $this->name,
            'icon_url' => $this->icon_url,
            'num_classes' => $this->classes()->where("name","like","%.%")->count(),
            'duration'=> $this->duration,
            'price'=>$this->price,

        ];
    }
}
