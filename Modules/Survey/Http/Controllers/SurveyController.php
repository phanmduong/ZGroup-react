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

    public function getSurvey($surveyId, Request $request)
    {
        $survey = Survey::find($surveyId);
        if($survey == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại bộ câu hỏi'
            ]);
        return $this->respondSuccessWithStatus([
            'survey' => $survey->getDetailedData(),
        ]);
    }
}
