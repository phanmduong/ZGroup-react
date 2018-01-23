<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 1/23/18
 * Time: 10:36 AM
 */

namespace Modules\Survey\Services;


use App\UserLessonSurvey;

class SurveyService
{
    public function startSurvey($userId, $surveyId)
    {
        $userLessonSurvey = new UserLessonSurvey();
        $userLessonSurvey->name = "SURVEY" . date('dmYHis', time());
        $userLessonSurvey->duration = 0;
        $userLessonSurvey->mark = 0;
        $userLessonSurvey->take = 0;
        $userLessonSurvey->user_id = $userId;
        $userLessonSurvey->survey_id = $surveyId;
        $userLessonSurvey->images_url = "";
        $userLessonSurvey->records_url = "";
        $userLessonSurvey->save();
        return $userLessonSurvey;
    }
}