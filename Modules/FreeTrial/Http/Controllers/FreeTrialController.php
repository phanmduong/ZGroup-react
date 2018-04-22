<?php

namespace Modules\FreeTrial\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Services\EmailService;
use GuzzleHttp\Client;
use App\Role;

class FreeTrialController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function createAccount(Request $request)
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
        $res = $client->request('GET', 'http://keetool.test/free-trial/password?otp=' . $otp, [
            'form_params' => [
                'email' => $user->email,
                'password' => $password,
            ]
        ]);

        // login this account
        Auth::login($user, true);
        $token = JWTAuth::fromUser($user);

        // redirect to manage.keetool.xyz
        return view('freetrial::index', [
            'token' => $token,
            'user' => json_encode($user)
        ]);
    }
}
