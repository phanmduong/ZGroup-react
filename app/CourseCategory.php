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
}
