<?php

namespace Modules\Booking\Http\Controllers;

use App\Base;
use App\District;
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
use App\Product;
use Symfony\Component\EventDispatcher\Event;
use App\Http\Controllers\ApiController;
use App\RoomServiceRegisterRoom;

class BookingApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function userRegister()
    {
        $user = $this->user;
        $register = RoomServiceRegister::where('user_id', $user->id)->where('type', 'member')->where('start_time', '<>', null)
            ->where('end_time', '<>', null)
            ->where('end_time', '>', date('Y-m-d H:i:s'))->first();
        return $this->respondSuccessWithStatus([
            'register' => $register ? $register->getData() : [],
        ]);
    }

    public function appBooking($campaignId, Request $request)
    {
        if($request->start_time == null || $request->end_time == null)
            return $this->respondErrorWithStatus('Thiếu thời gian');
        if ($this->user == null) {
            if ($request->email == null) {
                return $this->respondErrorWithStatus("Thiếu email");
            }
            if ($request->phone == null) {
                return $this->respondErrorWithStatus("Thiếu phone");
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
        } else $user = $this->user;
        if ($request->base_id == null)
            return $this->respondErrorWithStatus('Thiếu cơ sở');
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

        // $subject = "Xác nhận đặt phòng thành công";
        // $data = ["user" => $user];
        // $emailcc = ["graphics@colorme.vn"];
        // Mail::send('emails.confirm_register_up', $data, function ($m) use ($request, $subject, $emailcc) {
        //     $m->from('no-reply@colorme.vn', 'Up Coworking Space');
        //     $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        // });

        return $this->respondSuccessWithStatus([
            'message' => "Đặt phòng thành công"
        ]);
    }
}