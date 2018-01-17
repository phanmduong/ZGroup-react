<?php

namespace Modules\Lesson\Http\Controllers;

use App\Colorme\Transformers\TermTransformer;
use App\Http\Controllers\ApiController;
use App\Lesson;
use Illuminate\Http\Request;

class LessonSurveyApiController extends ApiController
{
    public function __construct(TermTransformer $termTransformer)
    {
        parent::__construct();
    }

    public function lessonSurveys($lessonId, Request $request)
    {
        $lesson = Lesson::find($lessonId);
        if($lesson == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại tiết học'
            ]);
        $surveys = $lesson->surveys;
        return $this->respondSuccessWithStatus([
            'surveys' => $surveys->map(function ($survey){
                return $survey->getData;
            })
        ]);
    }
}
