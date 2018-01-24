<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'surveys';

    public function questions()
    {
        return $this->hasMany('App\Question', 'survey_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function survey_users()
    {
        return $this->hasMany('App\SurveyUser', 'survey_id');
    }

    public function lessons()
    {
        return $this->belongsToMany('App\Lesson', 'lesson_survey')
            ->withPivot('start_time_display', 'time_display')
            ->withTimestamps();
    }

    public function shortData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'staff' => $this->user ? $this->user->getData() : null,
            "created_at" => format_time_to_mysql(strtotime($this->created_at))
        ];
    }

    public function getData()
    {
        return [
            'id' => $this->id,
            "image_url" => $this->image_url ? $this->image_url : emptyImageUrl(),
            "description" => $this->description ? $this->description : "",
            'name' => $this->name,
            "created_at" => format_time_to_mysql(strtotime($this->created_at)),
            'staff' => $this->user ? $this->user->getData() : null,
            "questions_count" => $this->questions()->count(),
            "survey_lessons" => $this->lessons->map(function ($lesson) {
                $course = $lesson->course;
                return [
                    "lesson_id" => $lesson->id,
                    "course" => $course->shortTransform(),
                    "lesson" => $lesson->shortTransform()
                ];
            })
        ];
    }

    public function getDetailedData()
    {
        $data = $this->getData();
        $data['questions'] = $this->questions()->orderBy("order")->get()->map(function ($question) {
            return $question->getData();
        });
        return $data;
    }
}
