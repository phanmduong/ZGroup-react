<?php

namespace Modules\NhatQuangShop\Http\Controllers;

use App\Services\RecaptchaService;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Modules\NhatQuangShop\Repositories\BookRepository;

class NhatQuangShopManageApiController extends Controller
{
    private $bookRepository;
    protected $data;
    protected $user;

    public function __construct(BookRepository $bookRepository)
    {
        $this->middleware('auth');
        $this->bookRepository = $bookRepository;
        $this->data = array();

        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function updateUserInfo(Request $request)
    {
        $captcha = $request->captcha;

        $captchaService = new RecaptchaService();
        if (!$captchaService->verify($captcha)) {
            return [
                "status" => 0,
                "message" => "Verify captcha failed"
            ];
        }

        if ($request->password == null || $request->phone == null || $request->email == null) {
            return [
                "status" => 0,
                "message" => "Bạn vui lòng nhập đầy đủ thông tin"
            ];
        }

        $password = trim($request->password);
        $phone = trim($request->phone);
        $email = trim($request->email);

        $user = User::where("phone", $phone)->where("id", "!=", $this->user->id)->first();


        if ($user == null) {
            // user voi so phone nay chua ton tai
            $emailUser = User::where("email", $email)->where("id", "!=", $this->user->id)->first();

            if ($emailUser) {
                return [
                    "status" => 0,
                    "message" => "Email này đã có người sử dụng"
                ];
            }

            $this->user->phone = $phone;
            $this->user->email = $email;
            $this->user->password = Hash::make($password);
            $this->user->first_login = 1;
            $this->user->save();
            return [
                "status" => 1,
                "user" => $this->user->transformAuth()
            ];
        } else {
            // user voi so phone nay da ton tai


            if ($this->user->facebook_id) {
                $emailUser = User::where("email", $email)->where("id", "!=", $this->user->id)->where("id", "!=", $user->id)->first();
                if ($emailUser) {
                    return [
                        "status" => 0,
                        "message" => "Email này đã có người sử dụng"
                    ];
                }
                // login using facebook
                $user->facebook_id = $this->user->facebook_id;
                $user->name = $this->user->name;
                $user->email = $email;
                $user->phone = $phone;

            } else {
                // login using google
                $user->email = $this->user->email;
            }

            $this->user->delete();
            $user->first_login = 1;
            $user->save();
            Auth::login($user);
            return [
                "status" => 1,
                "user" => $user->transformAuth()
            ];

        }
    }
}
