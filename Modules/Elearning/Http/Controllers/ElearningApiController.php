<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 1/6/18
 * Time: 09:49
 */

namespace Modules\Elearning\Http\Controllers;


use App\Comment;
use App\CommentLike;
use App\Course;
use App\CourseKey;
use App\Gen;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Like;
use App\Register;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class ElearningApiController extends ApiController
{
    public function __construct()
    {
        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function registerStore(Request $request)
    {
        if ($request->course_id == null) {
            return $this->respondErrorWithStatus("Thiếu course");
        }

        $course = Course::find($request->course_id);

        if ($course == null) {
            return $this->respondErrorWithStatus("Khóa học không tồn tại");
        }

        $register = Register::find($request->register_id);
        $auth = null;

        if ($register == null) {
            if ($this->user) {
                $current_gen = Gen::getCurrentGen();
                $register = new Register();
                $register->user_id = $this->user->id;
                $register->gen_id = $current_gen->id;
                $register->course_id = $course->id;
                $register->class_id = $course->classes()->where('gen_id', $current_gen->id)->first()->id;
                $register->save();
            } else {
                $user = User::where('email', '=', $request->email)->first();
                if ($user) {
                    return $this->respondErrorWithStatus("Tài khoản đã tồn tại");
                } else {
                    $phone = preg_replace('/[^0-9]+/', '', $request->phone);
                    $user = new User();
                    $user->name = $request->name;
                    $user->phone = $phone;
                    $user->email = $request->email;
                    $user->username = $request->email;
                    $user->password = bcrypt($user->phone);
                    $user->save();
                    $user->avatar_url = generate_protocol_url($user->avatar_url);

                    Auth::attempt(['email' => $user->email, 'password' => $phone]);
                    $token = JWTAuth::attempt(['email' => $user->email, 'password' => $phone]);

                    $auth = [
                        'token' => compact('token')['token'],
                        'user' => $user
                    ];

                    $current_gen = Gen::getCurrentGen();
                    $register = new Register();
                    $register->user_id = $user->id;
                    $register->gen_id = $current_gen->id;
                    $register->course_id = $course->id;
                    $register->class_id = $course->classes()->where('gen_id', $current_gen->id)->first()->id;
                    $register->save();
                }
            }
        }

        $codes = CourseKey::where('code', $request->code)->where('course_id', $course->id)->where('status', 1)->get();

        foreach ($codes as $code) {
            if ($code && $code->times < $code->limit) {
                $register->course_key_id = $code->id;
                $register->active_time = format_time_to_mysql(time());
                $register->status = 1;
                $register->save();

                $code->times += 1;
                $code->save();
                return [
                    'status' => 1,
                    'message' => 'Thành công',
                    'auth' => $auth
                ];
            }
        }

        return [
            'status' => 0,
            'message' => 'Mã không khả dụng. Vui lòng thử lại',
            'register_id' => $register->id,
        ];
    }
}