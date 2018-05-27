<?php

namespace Modules\SocialApi\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends ApiController
{
    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function login(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if ($user == null)
            return $this->respondErrorWithStatus(['message' => "sai email rui"]);
        if (Hash::check($request->password, $user->password)) {
            $token = JWTAuth::fromUser($user);
            return $this->respondSuccessWithStatus([
                "token" => $token,
                "user" => $user
            ]);
        }
        return $this->respondErrorWithStatus(['message' => "Sai password"]);
    }

    public function index()
    {
        return view('socialapi::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('socialapi::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('socialapi::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('socialapi::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
