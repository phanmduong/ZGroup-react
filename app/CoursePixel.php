<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CoursePixel extends Model
{
    protected $table = 'course_pixels';

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function staff()
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
        ];
        if($this->course)
            $data['course'] = $this->course->transform();
        if($this->staff)
            $data['staff'] = $this->staff->transform();
        return $data;
    }
}
