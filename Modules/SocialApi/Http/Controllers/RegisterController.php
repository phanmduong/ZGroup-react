<?php

namespace Modules\SocialApi\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\Register;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class RegisterController extends ApiController
{
    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function register(Request $request)
    {
        if ($request->name == null || $request->email == null || $request->password == null || $request->username == null)
            return $this->respondErrorWithStatus(['message' => "Thiếu trường"]);
        $check_email = User::where("email", $request->email)->first();
        $check_username = User::where("username", $request->username)->first();
        if ($check_email) return $this->respondErrorWithStatus(['message' => "Email đã tồn tại"]);
        if ($check_username) return $this->respondErrorWithStatus(['message' => "Username đã tồn tại"]);
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->save();

        $token = JWTAuth::fromUser($user);

        return $this->respondSuccessWithStatus([
            "token" => $token,
            "user" => $user
        ]);
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
