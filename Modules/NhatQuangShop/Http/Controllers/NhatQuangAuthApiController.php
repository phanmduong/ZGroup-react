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
        $inputToken = $request->input_token;
        $data = $request->data;
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://graph.facebook.com/oauth/access_token?client_id=" . config("app.facebook_app_id") . "&client_secret=" . config("app.facebook_app_secret") . "&grant_type=client_credentials",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "Content-Length: " . strlen($data),
            ),
        ));
        $responseJson = curl_exec($curl);
        $response = json_decode($responseJson);
        $accessToken = $response->access_token;
        curl_close($curl);

        dd($accessToken);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://graph.facebook.com/debug_token?input_token=" . $inputToken . "&access_token=" . $accessToken,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json",
                "Content-Length: " . strlen($data),
            ),
        ));
        $responseJson = curl_exec($curl);
        $response = json_decode($responseJson);
        if ($response->data) {
            return [
                "status" => 1
            ];
        } else {
            return [
                "status" => 0
            ];
        }
    }
}
