<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use SoftDeletes;
    protected $table = "lessons";

    public function course()
    {
        return $this->belongsTo('App\Course', 'course_id');
    }

    public function classes()
    {
        return $this->belongsToMany('App\StudyClass', 'class_lesson', 'lesson_id', 'class_id')->withPivot('time');
    }

    public function classLessons()
    {
        return $this->hasMany('App\ClassLesson', 'lesson_id');
    }

    public function term()
    {
        return $this->belongsTo(Term::class, "term_id");
    }

    public function surveys()
    {
        return $this->belongsToMany('App\Survey', 'lesson_survey');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'lesson_id');
    }

    public function shortTransform()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "order" => $this->order,
            'image_url' => $this->image_url
        ];
    }

    public function detailTransform()
    {
        return [
            'id' => $this->id,
            'course_id' => $this->course_id,
            'audio_url' => $this->audio_url,
            'video_url' => $this->video_url,
            'image_url' => $this->image_url,
            'name' => $this->name,
            'description' => $this->description,
            'detail' => $this->detail,
            'order' => $this->order,
            'detail_content' => $this->detail_content,
            'detail_teacher' => $this->detail_teacher,
            'term_id' => $this->term_id,
            'created_at' => format_time_to_mysql(strtotime($this->created_at))
        ];
    }
}
