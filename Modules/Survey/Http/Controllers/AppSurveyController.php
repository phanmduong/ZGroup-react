<?php

namespace Modules\Survey\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Survey;
use Illuminate\Http\Request;
use Modules\Survey\Services\SurveyService;

class AppSurveyController extends ManageApiController
{
    protected $surveyService;

    public function __construct(
        SurveyService $surveyService
    ) {
        parent::__construct();
        $this->surveyService = $surveyService;
    }

    public function getSurveys(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $search = $request->search;

        $surveys = Survey::where('active', 1);

        $surveys = $surveys->where('name', 'like', '%' . $search . '%');

        if ($request->user_id) {
            $surveys = $surveys->where('user_id', $request->user_id);
        }

        $surveys = $surveys->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination(
            $surveys,
            [
                'surveys' => $surveys->map(function ($survey) {
                    return $survey->getData();
                }),
            ]
        );
    }
}
