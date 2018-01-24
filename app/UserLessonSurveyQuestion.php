<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLessonSurveyQuestion extends Model
{
    protected $table = 'user_lesson_survey_question';

    public function userLessonSurvey()
    {
        return $this->belongsTo(UserLessonSurvey::class, 'user_lesson_survey_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "answer" => $this->answer,
            "result" => $this->result,
            "created_at" => format_time_to_mysql(strtotime($this->created_at)),
            "updated_at" => format_time_to_mysql(strtotime($this->updated_at))
        ];
    }
}
