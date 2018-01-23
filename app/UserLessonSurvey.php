<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLessonSurvey extends Model
{
    //
    protected $table = 'user_lesson_survey';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function lessonSurvey()
    {
        return $this->belongsTo(LessonSurvey::class, 'lesson_survey_id');
    }

    public function userLessonSurveyQuestions()
    {
        return $this->hasMany(UserLessonSurveyQuestion::class, 'user_lesson_survey_id');
    }

    public function survey()
    {
        return $this->belongsTo(Survey::class, "survey_id");
    }

    public function transform()
    {
        return [
            "name" => $this->name,
            "duration" => $this->duration,
            "mark" => $this->mark,
            "take" => $this->take,
            "user" => $this->user->transformAuth(),
            "survey" => $this->survey->shortData(),
            "created_at" => format_time_to_mysql($this->created_at),
            "updated_at" => format_time_to_mysql($this->created_at),
            "images_url" => $this->images_url,
            "records_url" => $this->records_url
        ];
    }
}
