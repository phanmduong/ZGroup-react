<?php

namespace Modules\NhatQuangShop\Http\Controllers;


use App\Http\Controllers\PublicApiController;
use App\User;
use Google_Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use phpseclib\Crypt\Hash;


class NhatQuangAuthApiController extends PublicApiController
{

    public function __construct()
    {
    }

    public function login($subfix, Request $request)
    {
        $email = $request->email;
        $password = $request->password;


        if (Auth::attempt(['email' => $email, 'password' => $password])) {

            $user = User::where("email", $email)->first();
            return [
                "status" => 1,
                "user" => $user->transformAuth()
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Sai email hoặc mật khẩu."
            ];
        }
    }

    public function googleTokenSignin(Request $request)
    {
        $id_token = $request->id_token;
        $client = new Google_Client(['client_id' => config("app.google_client_id")]);
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {
            $user = User::where("email", $payload['email'])->first();
            if ($user == null) {
                $user = new User();
                $user->password = "oauth";
            }
            $user->name = $payload['family_name'] . " " . $payload['given_name'];
            $user->email = $payload['email'];
            $user->avatar_url = $payload['picture'];
            $user->save();

            Auth::login($user);

            return [
                "status" => 1,
                "user" => $user->transformAuth()
            ];
        } else {
            // Invalid ID token
            return [
                "status" => 0,
                "message" => "Invalid ID token"
            ];
        }
    }

    public function facebookTokenSignin(Request $request)
    {
        $accessToken = $request->access_token;
    }

}
