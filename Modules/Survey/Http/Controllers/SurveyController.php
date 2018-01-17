<?php

namespace Modules\Survey\Http\Controllers;

use App\Answer;
use App\Colorme\Transformers\TermTransformer;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ManageApiController;
use App\Lesson;
use App\Question;
use App\Survey;
use Illuminate\Http\Request;

class SurveyController extends ManageApiController
{
    public function __construct(TermTransformer $termTransformer)
    {
        parent::__construct();
    }

    public function updateQuestionOrder(Request $request)
    {
        if ($request->questions == null) {
            return [
                "status" => 0,
                "message" => "Bạn cần phải truyền danh sách câu hỏi lên"
            ];
        }

        $questions = json_decode($request->questions);

        foreach ($questions as $item) {
            $question = Question::find($item->id);
            $question->order = $item->order;
            $question->save();
        }

        return [
            "status" => 1
        ];
    }

    public function saveAnswer($answerId, Request $request)
    {
        $answer = Answer::find($answerId);
        if ($answer == null) {
            return [
                "status" => 0,
                "message" => "Câu trả lời này không tồn tại"
            ];
        }

        $answer->content = $request->content_data;
        $answer->save();

        return [
            "status" => 1,
            "answer" => $answer->getData()
        ];
    }

    public function updateQuestion($surveyId, $questionId, Request $request)
    {
        $survey = Survey::find($surveyId);
        $question = $survey->questions()->where("id", $questionId)->first();
        if ($question == null) {
            return $this->respondErrorWithStatus("Câu hỏi không tồn tại");
        }

        $question->content = $request->content_data;
        $question->type = $request->type;

        $question->save();


        if ($request->answers) {
            $question->answers()->delete();
            $answers = json_decode($request->answers);
            foreach ($answers as $a) {
                $answer = new Answer();
                $answer->question_id = $question->id;
                $answer->content = $a->content;
                $answer->correct = $a->correct;
                $answer->save();
            }
        }


        return $this->respondSuccessWithStatus([
            "question" => $question->getData()
        ]);
    }

    public function assignSurveyInfo(&$survey, $request)
    {
        $survey->name = $request->name;
        $survey->user_id = $this->user->id;
        $survey->is_final = $request->is_final;
        $survey->save();
        $questions = json_decode($request->questions);
        $order = 0;
        foreach ($questions as $question) {
            $newQuestion = new Question;
            $newQuestion->survey_id = $survey->id;
            $newQuestion->content = $question->content;
            $newQuestion->type = $question->type;
            $newQuestion->image_url = $question->image_url;
            $newQuestion->order = ++$order;
            $newQuestion->save();
            $answers = $newQuestion->answers;
            foreach ($answers as $answer) {
                $newAnswer = new Answer;
                $newAnswer->question_id = $newQuestion->id;
                $newAnswer->content = $answer->content;
                $newAnswer->image_url = $answer->image_url;
                $newAnswer->correct = $answer->correct;
                $newAnswer->save();
            }
        }
    }

    public function getSurveys(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $search = $request->search;

        $surveys = Survey::query();

        $surveys = $surveys->where('name', 'like', '%' . $search . '%');

        if ($request->user_id)
            $surveys = $surveys->where('user_id', $request->user_id);

        $surveys = $surveys->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($surveys,
            [
                'surveys' => $surveys->map(function ($survey) {
                    return $survey->getData();
                }),
            ]
        );
    }

    public function getSurvey($surveyId, Request $request)
    {
        $survey = Survey::find($surveyId);
        if ($survey == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại bộ câu hỏi'
            ]);
        return $this->respondSuccessWithStatus([
            'survey' => $survey->getDetailedData(),
        ]);
    }

    public function createSurvey(Request $request)
    {
        $survey = new Survey;
        //validate

        $this->assignSurveyInfo($survey, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editSurvey($surveyId, Request $request)
    {
        $survey = Survey::find($surveyId);
        if ($survey == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại đề'
            ]);
        //validate

        $this->assignSurveyInfo($survey, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deleteSurvey($surveyId, Request $request)
    {
        $survey = Survey::find($surveyId);
        if ($survey == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại đề'
            ]);
        //validate

        $survey->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}
