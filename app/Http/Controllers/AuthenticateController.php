<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateController extends Controller
{
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

        if ($request->token_browser) {
            add_browser_notification($user->id, $request->token_browser);
        }

        if ($user->phone != null && $user->phone != "" && $user->homeland != null && $user->homeland != "" &&
            $user->age != null && $user->age != "" && $user->name != null && $user->name != "" &&
            $user->address != null && $user->address != "" && $user->color != null && $user->color != "" ) $user->first_login = 1;
        // all good so return the token

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
