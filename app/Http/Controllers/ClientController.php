<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;
use App\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Hash;
use App\Services\EmailService;
use Tymon\JWTAuth\Facades\JWTAuth;

class ClientController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        if (url('/') != url()->current()) {
            $path = explode(url('/') . '/', url()->current())[1];
        } else {
            $path = 'dashboard';
        }
        if ($path != 'login-free-trial') {
            $this->middleware('auth');
            $this->middleware('permission_tab_react:' . $path);
        }
        $this->emailService = $emailService;
        $data = [
            'jwt_token' => JWTAuth::refresh(JWTAuth::getToken())
        ];
    }

    public function loginFreeTrial(Request $request)
    {
        $email = $request->email;
        $otp = $request->otp;
        $name = $request->name;

        $user = User::where('email', $email)->first();

        if ($user == null) {
            $user = new User();
        }
        $user->email = $email;
        $user->role = 2;
        $password = generateRandomString();
        $user->password = Hash::make($password);
        $user->name = $name;
        $user->save();

        // set role CEO
        $role = Role::find(9);
        if ($role == null) {
            $role = withTrashed()
                ->where('id', 9)
                ->first();
            $role->restore();
        }

        $user->role_id = 9;
        $user->save();

        // send mail password to user
        $this->emailService->send_mail_password($user, $password);

        // send password back to floor 4th with otp
        $client = new Client();
        $res = $client->request('POST', 'https://keetool.com/free-trial/password?otp=' . $otp, [
            'form_params' => [
                'email' => $user->email,
                'password' => $password,
            ]
        ]);

        return view('freetrial::index', [
            'email' => $user->email,
            'password' => $password
        ]);
    }

    public function administration()
    {
        return view('client.administration');
    }

    public function email()
    {
        return view('client.email');
    }

    public function dashboard()
    {
        return view('client.dashboard', $data);
    }

    public function business()
    {
        return view('client.business');
    }

    public function manufacture()
    {
        return view('client.manufacture');
    }

    public function teaching()
    {
        return view('client.teaching');
    }

    public function base()
    {
        return view('client.base');
    }

    public function book()
    {
        return view('client.book');
    }

    public function hr()
    {
        return view('client.hr');
    }

    public function good()
    {
        return view('client.good');
    }

    public function work()
    {
        return view('client.work');
    }

    public function blog()
    {
        return view('client.blog');
    }

    public function marketing()
    {
        return view('client.marketing');
    }

    public function finance()
    {
        return view('client.finance');
    }

    public function profile()
    {
        return view('client.profile');
    }

    public function shift()
    {
        return view('client.shift');
    }

    public function workShift()
    {
        return view('client.work_shift');
    }

    public function landingPage()
    {
        return view('client.landingpage');
    }

    public function survey()
    {
        return view('client.surveyv2');
    }

    public function order()
    {
        return view('client.order');
    }

    public function notification()
    {
        return view('client.notification');
    }

    public function customerServices()
    {
        return view('client.customerServices');
    }

    public function sales()
    {
        return view('client.sales');
    }

    public function telesales()
    {
        return view('client.telesales');
    }
}
