<?php

namespace Modules\Survey\Http\Controllers;

use Modules\Survey\Services\SurveyService;
use \App\Http\Controllers\Controller;
use App\Survey;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Foundation\Auth\User;
use App\User;
use Illuminate\Support\Facades\Auth;

class RenderSurveyController extends ApiController
{
    protected $surveyService;

    public function __construct(
        SurveyService $surveyService
    ) {
        $this->surveyService = $surveyService;
    }

    public function render($surveyId)
    {
        $survey = Survey::find($surveyId);

        if ($survey == null) {
            return 'Khảo sát không tồn tại';
        } else {
            $data = [
                // 'user' => Auth::user(),
                'survey' => $survey
            ];
            return view('survey::survey', $data);
        }
    }

    public function submitForm(Request $request) {
        $data = $request->data;
        $email = $request->email;
        $name = $request->name;
        $phone = $request->phone;

        if ($data == null) {
            return $this->respondErrorWithStatus("Bạn truyền lên thiếu dữ liệu form");
        }

        if ($email == null || $name == null || $phone == null ) {
            return $this->respondErrorWithStatus("Bạn truyền lên thiếu dữ liệu user");
        }

        $user = User::where("email", $email)->first();
        if ($user == null) {
            $user = User::create([
                "name" => $name,
                "email" => $email,
                "phone" => $phone
            ]);
            $user->save();
        }
        // TODO: save data to survey_user 
    }
}
