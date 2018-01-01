<?php

namespace Modules\NhatQuangShop\Http\Controllers;


use App\District;
use App\Good;
use App\Http\Controllers\PublicApiController;
use App\Province;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;

class NhatQuangAuthApiController extends PublicApiController
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function login($subfix, Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        if (Auth::attempt(['email' => $email, 'password' => $password])) {

            $user = User::where("email", $email)->first();
            return [
                "status" => 1,
                "user" => [
                    "id" => $user->id,
                    "avatar_url" => $user->avatar_url,
                    "name" => $user->name
                ]
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Sai email hoặc mật khẩu."
            ];
        }
    }
}
