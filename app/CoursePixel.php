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
        if($this->staff)
            $data['staff'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
            ];
        return $data;
    }
}
