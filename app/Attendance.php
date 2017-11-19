<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table = 'attendances';

    public function classLesson()
    {
        return $this->belongsTo('App\ClassLesson', 'class_lesson_id');
    }

    public function register()
    {
        return $this->belongsTo('App\Register', 'register_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "register_id" => $this->register_id,
            "checker_id" => $this->checker_id,
            "status" => $this->status,
            "hw_status" => $this->hw_status,
            "class_lesson_id" => $this->class_lesson_id,
            "device" => $this->device,
        ];
    }
}
