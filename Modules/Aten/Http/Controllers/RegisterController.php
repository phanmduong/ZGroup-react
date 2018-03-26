<?php

namespace Modules\Aten\Http\Controllers;

use App\Gen;
use App\Register;
use App\Services\EmailService;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    protected $emailService;

    public function __construct(
        EmailService $emailService
    ) {
        $this->emailService = $emailService;
    }

    public function getRegisterClass($classId = '', $salerId = '', $campaignId = '')
    {
        $class = StudyClass::find($classId);
        return view('aten::register_class', [
            'class' => $class,
            'saler_id' => $salerId,
            'campaign_id' => $campaignId,
        ]);
    }

    public function storeRegisterClass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|min:6|numeric',
            'phone_confirmation' => 'required_with:phone|same:phone|min:6|numeric',
            'university' => 'required',
            'facebook' => 'required',
            'dob' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect('register-class/' . $request->class_id)
                ->withErrors($validator)
                ->withInput();
        }

        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->username = $request->email;
            $user->email = $request->email;
        }
        $user->name = $request->name;
        $user->phone = $phone;
        $user->how_know = $request->how_know;
        $user->password = bcrypt($user->phone);
        $user->university = $request->university;
        $user->dob = $request->dob;
        $user->facebook = $request->facebook;
        $user->save();
        $register = new Register;
        $register->user_id = $user->id;
        $register->gen_id = Gen::getCurrentGen()->id;
        $register->class_id = $request->class_id;
        $register->status = 0;
        $register->campaign_id = 8;
        $register->time_to_call = addTimeToDate($register->created_at, '+24 hours');
        $register->save();

        $this->emailService->send_mail_confirm_registration($user, $request->class_id);
        $class = $register->studyClass;
        if (strpos($class->name, '.') !== false) {
            if ($class->registers()->count() >= $class->target) {
                $class->status = 0;
                $class->save();
            }
        }

        return view('aten::register_class_success', [
            'class' => $class
        ]);
    }
}
