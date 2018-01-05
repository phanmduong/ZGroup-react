<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseCategory extends Model
{
    //
    protected $table = 'course_categories';

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_course_category', 'course_category_id', 'course_id');
    }

    public function getData() {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'image_url' => $this->image_url,
            'color' => $this->color,
            'icon_url' => $this->icon_url,
            'cover_url' => $this->cover_url,
            'short_description' => $this->short_description,
            'description' => $this->description,  
        ];
        return $data;
    }
}
