<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public function userLessonSurveys()
    {
        return $this->hasMany(UserLessonSurvey::class, "survey_id");
    }

    public function shortData()
    {
        return [
            'id' => $this->id,
            "active" => $this->active,
            "image_url" => $this->image_url ? $this->image_url : emptyImageUrl(),
            "description" => $this->description ? $this->description : "",
            'name' => $this->name,
            "created_at" => format_time_to_mysql(strtotime($this->created_at)),
            'staff' => $this->user ? $this->user->getData() : null,
            "questions_count" => $this->questions()->count(),
            "target" => $this->target,
            "take" => $this->userLessonSurveys()->count()
        ];
    }

    public function getData()
    {
        $data = $this->shortData();
        $data["survey_lessons"] = $this->lessons()->orderBy("created_at", "desc")
            ->get()->map(function ($lesson) {
                $course = $lesson->course;
                return [
                    "lesson_id" => $lesson->id,
                    "course" => $course->shortTransform(),
                    "lesson" => $lesson->shortTransform()
                ];
            });
        return $data;
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
