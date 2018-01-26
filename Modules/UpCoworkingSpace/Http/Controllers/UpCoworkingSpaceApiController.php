<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Http\Controllers\ApiPublicController;
use App\RoomServiceRegister;
use App\RoomServiceUserPack;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UpCoworkingSpaceApiController extends ApiPublicController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allUserPacks()
    {
        $user_packs = RoomServiceUserPack::all();
        $user_packs = $user_packs->map(function ($user_pack) {
            $data = $user_pack->getData();
            $data['subscriptions'] = $user_pack->subscriptions->map(function ($subscription) {
                return $subscription->getData();
            });
            return $data;
        });

        return $this->respondSuccessWithStatus([
            'user_packs' => $user_packs
        ]);
    }

    public function register(Request $request)
    {
        if ($request->email == null) {
            return $this->respondErrorWithStatus("Thiếu email");
        }
        if ($request->phone == null) {
            return $this->respondErrorWithStatus("Thiếu phone");
        }
        if ($request->subscription_id == null) {
            return $this->respondErrorWithStatus("Thiếu subscription");
        }
        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = Hash::make($phone);
        }

        $user->name = $request->name;
        $user->phone = $phone;
        $user->email = $request->email;
        $user->username = $request->email;
        $user->password = Hash::make($phone);
        $user->save();

        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->subscription_id = $request->subscription_id;

        return $this->respondSuccessWithStatus([
            'message' => "Đăng kí thành công"
        ]);
    }
}
