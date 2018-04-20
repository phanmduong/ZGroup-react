<?php

namespace Modules\Booking\Http\Controllers;

use App\Http\Controllers\ApiPublicController;
use App\RoomServiceRegister;
use App\RoomServiceUserPack;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use App\RoomServiceRegisterRoom;

class BookingController extends ApiPublicController
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

    public function historyRegister()
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user == null) {
            return $this->respondErrorWithStatus('Bạn phải đăng nhập');
        }

        $registers = RoomServiceRegister::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $registers = $registers->map(function ($register) {
            return $register->getData();
        });

        return $this->respondSuccessWithStatus([
            'history_registers' => $registers
        ]);
    }

    public function appRegister($campaignId, Request $request)
    {
        if ($this->user == null) {
            if ($request->email == null) {
                return $this->respondErrorWithStatus('Thiếu email');
            }
            if ($request->phone == null) {
                return $this->respondErrorWithStatus('Thiếu phone');
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
        } else {
            $user = $this->user;
        }

        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->base_id = $request->base_id;
        $register->campaign_id = $campaignId;
        $register->type = 'member';
        $register->save();
        $subject = 'Xác nhận đăng ký thành công';
        $data = ['user' => $user];
        $emailcc = ['graphics@colorme.vn'];
        Mail::send('emails.confirm_register_up', $data, function ($m) use ($request, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Up Coworking Space');
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });

        return $this->respondSuccessWithStatus([
            'message' => 'Đăng kí thành công'
        ]);
    }

    public function appBooking($campaignId, Request $request)
    {
        if ($this->user == null) {
            if ($request->email == null) {
                return $this->respondErrorWithStatus('Thiếu email');
            }
            if ($request->phone == null) {
                return $this->respondErrorWithStatus('Thiếu phone');
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
        } else {
            $user = $this->user;
        }
        if ($request->base_id == null) {
            return $this->respondErrorWithStatus('Thiếu cơ sở');
        }
        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->base_id = $request->base_id;
        $register->start_time = $request->start_time;
        $register->end_time = $request->end_time;
        $register->campaign_id = $campaignId;
        $register->type = 'room';
        $register->save();

        $registerRoom = new RoomServiceRegisterRoom;
        $registerRoom->room_id = $request->room_id;
        $registerRoom->room_service_register_id = $register->id;
        $registerRoom->start_time = $request->start_time;
        $registerRoom->end_time = $request->end_time;
        $registerRoom->save();

        $subject = 'Xác nhận đặt phòng thành công';
        $data = ['user' => $user];
        $emailcc = ['graphics@colorme.vn'];
        Mail::send('emails.confirm_register_up', $data, function ($m) use ($request, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Up Coworking Space');
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });
        return $this->respondSuccessWithStatus([
            'message' => 'Đặt phòng thành công'
        ]);
    }
}
