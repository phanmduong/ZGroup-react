<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudyClass extends Model
{
    use SoftDeletes;
    protected $table = "classes";

    protected $dates = ['deleted_at'];

    public function scopeGetClassesByCourseAndGen($scope, $gen_id, $course_id)
    {

        $where_clause = ['course_id' => $course_id, 'gen_id' => $gen_id];
        return StudyClass::where($where_clause)
            ->orderBy('name', 'desc')->get();
    }

    public function scopeGetClassByGen($scope, $gen_id)
    {
        $where_clause = ['gen_id' => $gen_id];
        return StudyClass::where($where_clause)
            ->orderBy('name', 'desc')->get();
    }

    public function registers()
    {
        return $this->hasMany('App\Register', 'class_id');
    }

    public function course()
    {
        return $this->belongsTo('App\Course');
    }

    public function gen()
    {
        return $this->belongsTo('App\Gen', 'gen_id');
    }

    public function teach()
    {
        return $this->belongsTo('App\User', 'teacher_id');
    }

    public function assist()
    {
        return $this->belongsTo('App\User', 'teaching_assistant_id');
    }

    public function lessons()
    {
        return $this->belongsToMany('App\Lesson', 'class_lesson', 'class_id', 'lesson_id')->withPivot('time', 'start_time', 'end_time');
    }

    public function classLessons()
    {
        return $this->hasMany('App\ClassLesson', 'class_id');
    }

    public function class_surveys()
    {
        return $this->hasMany('App\ClassSurvey', 'class_id');
    }

    public function room()
    {
        return $this->belongsTo('App\Room', 'room_id');
    }

    public function base()
    {
        return $this->belongsTo('App\Base', 'base_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }

    public function group()
    {
        return $this->hasOne('App\Group', 'class_id');
    }

    public function teachers()
    {
        return $this->hasMany(ClassPosition::class, "class_id")->where("position_id", "1");
    }

    public function teaching_assistants()
    {
        return $this->hasMany(ClassPosition::class, "class_id")->where("position_id", "2");
    }

    public function class_position()
    {
        return $this->hasMany(ClassPosition::class, "class_id");
    }
}
