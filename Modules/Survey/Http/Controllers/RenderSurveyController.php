<?php

namespace Modules\Survey\Http\Controllers;

use Modules\Survey\Services\SurveyService;
use App\Survey;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\SurveyUser;

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
            $user = Auth::user();
            $data = [
                'user' => $user,
                'survey' => $survey
            ];
            return view('survey::survey', $data);
        }
    }

    public function surveySubmitted()
    {
        return view('survey::survey_submitted');
    }

    public function submitForm($surveyId, Request $request)
    {
        $data = $request->data;
        $email = $request->email;
        $name = $request->name;
        $phone = $request->phone;

        // Get logged user
        $user = Auth::user();

        $survey = Survey::find($surveyId);
        if ($survey == null) {
            return $this->respondErrorWithStatus('Survey không tồn tại');
        }

        if ($data == null) {
            // Form data is missing
            return $this->respondErrorWithStatus('Bạn truyền lên thiếu dữ liệu form');
        }

        if ($user == null) {
            // if user not logged in
            if ($email == null || $name == null || $phone == null) {
                return $this->respondErrorWithStatus('Bạn truyền lên thiếu dữ liệu user');
            }
            $user = User::where('email', $email)->first();

            if ($user == null) {
                // There is no user with this $email
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'phone' => $phone
                ]);
                $user->save();
            }
        }
        // $user and $survey are surely not null
        $surveyUser = new SurveyUser();
        $surveyUser->user_id = $user->id;
        $surveyUser->status = 1;
        $surveyUser->content = $data;
        $surveyUser->gen_id = 0;
        $surveyUser->survey_id = $surveyId;
        $surveyUser->save();

        return $this->respondSuccessV2([
            'message' => 'Bạn đã gửi khảo sát thành công'
        ]);
    }
}
