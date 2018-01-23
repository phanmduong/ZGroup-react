<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 1/23/18
 * Time: 10:36 AM
 */

namespace Modules\Survey\Services;


use App\Http\Requests\Request;
use App\UserLessonSurvey;
use App\UserLessonSurveyQuestion;

class SurveyService
{
    public function startSurvey($userId, $surveyId)
    {
        $userLessonSurvey = new UserLessonSurvey();
        $userLessonSurvey->name = "SURVEY" . date('dmYHis', time());
        $userLessonSurvey->duration = 0;
        $userLessonSurvey->mark = 0;
        if ($userLessonSurvey->take) {
            $userLessonSurvey->take += 1;
        } else {
            $userLessonSurvey->take = 1;
        }

        $userLessonSurvey->user_id = $userId;
        $userLessonSurvey->survey_id = $surveyId;
        $userLessonSurvey->images_url = "";
        $userLessonSurvey->records_url = "";
        $userLessonSurvey->save();
        return $userLessonSurvey;
    }

    public function endSurvey($userLessonSurveyId, $images_url = "", $records_url = "")
    {
        $userLessonSurvey = UserLessonSurvey::find($userLessonSurveyId);
        $userLessonSurvey->name = "SURVEY" . date('dmYHis', time());
        $userLessonSurvey->duration = (time() - strtotime($userLessonSurvey->created_at)) / 60;
        $userLessonSurvey->mark = 0;
        $userLessonSurvey->images_url = $images_url;
        $userLessonSurvey->records_url = $records_url;
        $userLessonSurvey->save();
        return $userLessonSurvey;
    }

    public function saveUserLessonSurveyQuestion($question, $userLessonSurvey, $answer)
    {
        $userLessonSurveyQuestion = new UserLessonSurveyQuestion();
        $userLessonSurveyQuestion->question_id = $question->id;
        $userLessonSurveyQuestion->user_lesson_survey_id = $userLessonSurvey->id;
        $userLessonSurveyQuestion->answer = $answer->content;
        $userLessonSurveyQuestion->result = 0;
        $userLessonSurveyQuestion->save();
        return $userLessonSurveyQuestion;
    }
}