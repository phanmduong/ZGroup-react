<?php

namespace Modules\Demo\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Gen;
use App\CourseCategory;
use App\User;
use App\Base;
use App\Course;
use App\StudyClass;
use App\Register;

class DemoApiController extends Controller
{
    public function register(Request $request)
    {
    //send mail here
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = bcrypt($phone);
            $user->username = $request->email;
            $user->email = $request->email;
        }
        $user->rate = 5;
        $user->name = $request->name;
        $user->phone = $phone;
        $user->save();

        $register = new Register();
        $register->user_id = $user->id;
        $register->gen_id = Gen::getCurrentGen()->id;
        $register->class_id = $request->class_id;
        $register->status = 0;
        $register->saler_id = $request->saler_id;
        $register->campaign_id = $request->campaign_id;
        $register->time_to_call = addTimeToDate($register->created_at, '+2 hours');

        $register->save();

        $this->emailService->send_mail_confirm_registration($user, $request->class_id, [AppServiceProvider::$config['email']]);

        $class = $register->studyClass;
        if (strpos($class->name, '.') !== false) {
            if ($class->registers()->count() >= $class->target) {
                $class->status = 0;
                $class->save();
            }
        }

        return ['message' => 'SUCCESS'];
    }
}
