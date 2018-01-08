<?php

namespace Modules\Survey\Http\Controllers;

use App\Colorme\Transformers\TermTransformer;
use App\Http\Controllers\ApiController;
use App\Lesson;
use App\Survey;
use Illuminate\Http\Request;

class SurveyController extends ApiController
{
    public function __construct(TermTransformer $termTransformer)
    {
        parent::__construct();
    }

    public function assignSurveyInfo(&$survey, $request)
    {

    }

    public function getSurveys($surveyId, Request $request)
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
