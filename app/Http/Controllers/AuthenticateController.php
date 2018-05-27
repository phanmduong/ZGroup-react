<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use App\Services\EmailService;
use App\ProductSubscription;

class AuthenticateController extends Controller
{
//    public function secretLogin(Request $request)
//    {
//        $email = $request->email;
//        $user = User::where("email", $email)->first();
//        if ($user) {
//            Auth::login($user);
//            return "success";
//        } else {
//            return "wrong email";
//        }
//    }

    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function freeTrialLogin(Request $request)
    {
        
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->flush();

        $request->session()->regenerate();

        return redirect('/login');
    }

    public function login(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Email hoặc Password không đúng'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $user = User::where('email', $credentials['email'])->first();
        $user->avatar_url = config('app.protocol') . trim_url($user->avatar_url);

        Auth::attempt($credentials);

        if ($user->phone != null && $user->phone != '' && $user->homeland != null && $user->homeland != '' &&
            $user->age != null && $user->age != '' && $user->name != null && $user->name != '' &&
            $user->address != null && $user->address != '' && $user->color != null && $user->color != '') {
            $user->first_login = 1;
        }
        // all good so return the token

        return response()->json([
            'token' => compact('token')['token'],
            'user' => $user
        ]);
    }

    public function loginSocial(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Email hoặc Password không đúng'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $user = User::where('email', $credentials['email'])->first();
        $user->avatar_url = generate_protocol_url($user->avatar_url);

        Auth::attempt($credentials);

        return response()->json([
            'token' => compact('token')['token'],
            'user' => $user
        ]);
    }

    public function confirmEmail(Request $request)
    {
        if ($request->name == null || $request->email == null || $request->password == null || $request->phone == null) {
            return response()->json([
                'status' => 0,
                'error' => 'Bạn điền thiếu thông tin'
                ]);
        }
        $email = trim($request->email);
        $check_email = User::where('email', $email)->orWhere('username', $email)->first();
        if ($check_email) {
            return response()->json(['error' => 'Email đã tồn tại']);
        }
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $hash = Hash::make($request->password);
        $name = trim($request->name);

        $token = Hash::make($name . $email . $phone . $hash);

        $this->emailService->send_mail_confirm_email($email, $name, $hash, $phone, $token, $request->product_id); 
        
        return [
            'status' => 1,
            'message' => 'Color Me đã gửi email xác nhận vào hòm thư "' . $email . '". Bạn vui lòng kiểm tra email để hoàn thành đăng kí'
        ];
    }

    public function registerSocial(Request $request)
    {
        if ($request->name == null || $request->email == null || $request->password == null || $request->phone == null) {
            return response()->json(['error' => 'Thiếu trường']);
        }
        $check_email = User::where('email', $request->email)->orWhere('username', $request->email)->first();
        if ($check_email) {
            return response()->json(['error' => 'Email đã tồn tại']);
        }

        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->email;
        $user->phone = $phone;
        $user->password = bcrypt($request->password);

        $user->save();

        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Email hoặc Password không đúng'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user->avatar_url = generate_protocol_url($user->avatar_url);

        Auth::attempt($credentials);

        return response()->json([
            'token' => compact('token')['token'],
            'user' => $user
        ]);
    }

    // somewhere in your controller
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }
}
