<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Base;
use App\District;
use App\Http\Controllers\ApiPublicController;
use App\Province;
use App\RoomServiceRegister;
use App\RoomServiceSubscription;
use App\RoomServiceUserPack;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;


class UpCoworkingSpaceApiController extends ApiPublicController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allUserPacks()
    {
        $user_packs = RoomServiceUserPack::join('room_service_subscriptions', 'room_service_subscriptions.user_pack_id', '=', 'room_service_user_packs.id')
            ->select('room_service_user_packs.*', DB::raw('count(room_service_subscriptions.id) as subscription_count'))
            ->groupBy('user_pack_id')->having('subscription_count', '>', 0)
            ->orderBy('room_service_user_packs.created_at', 'desc')->get();
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
        $user->save();

        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->subscription_id = $request->subscription_id;
        $register->base_id = $request->base_id;
        $register->save();
//        dd(Base::find($request->base_id));
        $subject = "Xác nhận đăng ký thành công";
//        $data = ["base" => Base::find($request->base_id)->transform,
//            "subscription" => RoomServiceSubscription::find($request->subscription_id), "user" => $user];
        $data = ["user" => $user];
        $emailcc = ["graphics@colorme.vn"];
        Mail::send('emails.confirm_register_up', $data, function ($m) use ($request, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Graphics');
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });

        return $this->respondSuccessWithStatus([
            'message' => "Đăng kí thành công"
        ]);
    }

    public function province()
    {
        $provinceIds = Base::join("district", DB::raw("CONVERT(district.districtid USING utf32)"), "=", DB::raw("CONVERT(bases.district_id USING utf32)"))
            ->select("district.provinceid as province_id")->pluck("province_id")->toArray();
        $provinceIds = collect(array_unique($provinceIds));
        return [
            "provinces" => $provinceIds->map(function ($provinceId) {
                $province = Province::find($provinceId);
                return $province->transform();
            })->values()
        ];
    }

    public function basesInProvince($provinceId, Request $request)
    {
        $districtIds = District::join("province", "province.provinceid", "=", "district.provinceid")
            ->where("province.provinceid", $provinceId)->select("district.*")->pluck("districtid");
        $bases = Base::whereIn("district_id", $districtIds);
        $bases = $bases->where('name', 'like', '%' . trim($request->search) . '%');
        $bases = $bases->get();
        return [
            "bases" => $bases->map(function ($base) {
                return $base->transform();
            })
        ];
    }

    public function historyRegister()
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user == null) {
            return $this->respondErrorWithStatus("Bạn phải đăng nhập");
        }

        $registers = RoomServiceRegister::where('user_id', $user->id)->get();

        $registers = $registers->map(function ($register) {
            return $register->getData();
        });

        return $this->respondSuccessWithStatus([
            'history_registers' => $registers
        ]);


    }
}
