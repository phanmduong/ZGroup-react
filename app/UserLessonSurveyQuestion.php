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


}
