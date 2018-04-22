<?php

namespace Modules\FreeTrial\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class FreeTrialController extends Controller
{
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
        $password = generateRandomString();
        $user->password = Hash::make($password);
        $user->name = $name;
        $user->save();

        // send mail password to user

        // send password back to floor 4th with otp

        // login this account

        // redirect to manage.keetool.xyz

        return view('freetrial::index');
    }
}
