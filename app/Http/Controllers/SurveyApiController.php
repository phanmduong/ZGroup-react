<?php

namespace App\Http\Controllers;

use App\Survey;
use App\SurveyUser;
use App\UserLessonSurvey;
use App\UserLessonSurveyQuestion;
use Illuminate\Http\Request;

use App\Http\Requests;

class SurveyApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();

    }

    public function submit_survey(Request $request)
    {
        $survey_id = $request->survey_id;
        $user_id = $this->user->id;

        $survey = Survey::find($survey_id);

        $survey_user = SurveyUser::where('survey_id', $survey_id)
            ->where('user_id', $user_id)->first();
        $survey_user->content = $request->survey_content;
        $survey_user->status = 1;
        $survey_user->save();

        $answers = json_decode($request->survey_content);

        $userLessonSurvey = new UserLessonSurvey();
        $userLessonSurvey->take = 1;
        $userLessonSurvey->lesson_survey_id = 0;
        $userLessonSurvey->user_id = $this->user->id;
        $userLessonSurvey->survey_id = $survey_id;
        $userLessonSurvey->is_open = 0;
        $userLessonSurvey->save();

        $questions = $survey->questions;

        $answersArray = [];

        foreach ($answers as $key => $value) {
            $answersArray[$key] = $value;
        }

        foreach ($questions as $question) {
            $userLessonSurveyQuestion = new UserLessonSurveyQuestion();
            $userLessonSurveyQuestion->question_id = $question->id;
            $userLessonSurveyQuestion->user_lesson_survey_id = $userLessonSurvey->id;
            $userLessonSurveyQuestion->answer = $answersArray[$question->order . ""];
            $userLessonSurveyQuestion->result = 0;
            $userLessonSurveyQuestion->answer_id = 0;
            $userLessonSurveyQuestion->save();
        }

        return $this->respondSuccessWithStatus([]);
    }

    public function get_survey()
    {
        // survey co status bang 0 la survey can phai lam
        $survey_user = $this->user->survey_users()->where('status', 0)->first();
        if ($survey_user) {
            return $this->respondSuccessWithStatus([
                'survey_id' => $survey_user->survey_id,
                'has_survey' => true,
                'survey_name' => $survey_user->survey->name,
                'questions' => $survey_user->survey->questions()->orderBy('order')->get()->map(function ($q) {
                    return [
                        'id' => $q->id,
                        'content' => $q->content,
                        'order' => $q->order,
                        'type' => question_type_key($q->type),
                        'answers' => $q->answers->map(function ($answer) {
                            return [
                                'id' => $answer->id,
                                'content' => $answer->content
                            ];
                        })
                    ];
                })
            ]);

        } else {
            return $this->respondSuccessWithStatus(['has_survey' => false, 'questions' => []]);
        }
    }
}
