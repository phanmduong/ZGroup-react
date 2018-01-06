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
}
