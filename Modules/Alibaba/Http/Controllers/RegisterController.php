<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 11/19/17
 * Time: 18:11
 */

namespace Modules\Alibaba\Http\Controllers;

use App\Gen;
use App\Providers\AppServiceProvider;
use App\Register;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{

    public function getRegisterClass($subfix, $class_id)
    {

        $class = StudyClass::find($class_id);
        return view('alibaba::register_class', [
            'class' => $class
        ]);
    }

    public function storeRegisterClass($subfix, Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => "required",
            'email' => "required|email",
            'phone' => "required",
        ]);

        if ($validator->fails()) {
            return redirect('register-class/' . $request->class_id)
                ->withErrors($validator)
                ->withInput();
        }

        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9.]+/', '', $request->phone);

        if ($user == null) {
            $user = new User;
            $user->name = $request->name;
            $user->phone = $phone;
            $user->email = $request->email;
            $user->username = $request->email;
            $user->password = bcrypt($user->phone);
            $user->save();

        } else {
            $user->phone = $phone;
        }

        $user->save();

        $register = new Register;
        $register->user_id = $user->id;
        $register->gen_id = Gen::getCurrentGen()->id;
        $register->class_id = $request->class_id;
        $register->status = 0;
        $register->time_to_call = addTimeToDate($register->created_at, "+24 hours");

        $register->save();

//        send_mail_confirm_registration($user, $request->class_id, [AppServiceProvider::$config['email']]);

        $class = $register->studyClass;
        if (strpos($class->name, '.') !== false) {
            if ($class->registers()->count() >= $class->target) {
                $class->status = 0;
                $class->save();
            }
        }

        return view('alibaba::register_class_success', [
            'class' => $class
        ]);
    }


}