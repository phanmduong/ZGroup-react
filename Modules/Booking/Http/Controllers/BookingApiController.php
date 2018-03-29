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

class BookingApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function userRegister()
    {
        $user = $this->user;
        $register = RoomServiceRegister::where('user_id', $user->id)->where('start_time', '<>', null)
            ->where('end_time', '<>', null)
            ->where('end_time', '>', date('Y-m-d H:i:s'))->first();
        return $this->respondSuccessWithStatus([
            'register' => $register->getData,
        ]);
    }

}