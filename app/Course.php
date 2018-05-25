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

    public function terms()
    {
        return $this->hasMany(Term::class, 'course_id');
    }

    public function links()
    {
        return $this->hasMany('App\Link', 'course_id');
    }

    public function courseType()
    {
        return $this->belongsTo(CourseType::class, 'type_id');
    }

    public function coursePixels()
    {
        return $this->hasMany(CoursePixel::class, 'course_id');
    }

    public function courseCategories()
    {
        return $this->belongsToMany(CourseCategory::class, 'course_course_category', 'course_id', 'course_category_id');
    }

    public function detailedTransform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'duration' => $this->duration,
            'price' => $this->price,
            'description' => $this->description,
            'linkmac' => $this->linkmac,
            'linkwindow' => $this->linkwindow,
            'num_classes' => $this->classes()->where("name", "like", "%.%")->count(),
            'mac_how_install' => $this->mac_how_install,
            'window_how_install' => $this->window_how_install,
            'cover_url' => generate_protocol_url($this->cover_url),
            'color' => $this->color,
            'image_url' => generate_protocol_url($this->image_url),
            'icon_url' => generate_protocol_url($this->icon_url),
            'created_at' => format_time_to_mysql(strtotime($this->created_at)),
            'detail' => $this->detail,
            'lessons' => $this->lessons,
            'links' => $this->links,
            'terms' => $this->terms,
            'status' => $this->status,
            'type_id' => $this->type_id,
            'order_number' => $this->order_number,
            'type' => $this->courseType ? $this->courseType->getData() : null,
            'categories' => $this->courseCategories->map(function ($courseCategory) {
                return $courseCategory->getData();
            }),
            'pixels' => $this->coursePixels->map(function ($coursePixel) {
                return $coursePixel->getData();
            }),
            'classes' => $this->classes
        ];
    }

    public function shortTransform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon_url' => $this->icon_url,
        ];
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon_url' => $this->icon_url,
            'num_classes' => $this->classes()->where("name", "like", "%.%")->count(),
            'duration' => $this->duration,
            'price' => $this->price,
            'status' => $this->status,
            'color' => $this->color,
            'type_id' => $this->type_id,
            'description' => $this->description,
            'order_number' => $this->order_number,
            'image_url' => generate_protocol_url($this->image_url),
            'lessons' => $this->lessons->map(function ($lesson) {
                return $lesson->shortTransform();
            }),
            'categories' => $this->courseCategories->map(function ($courseCategory) {
                return $courseCategory->getData();
            }),
        ];
    }
}
