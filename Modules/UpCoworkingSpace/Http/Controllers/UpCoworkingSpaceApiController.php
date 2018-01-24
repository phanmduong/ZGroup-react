<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Http\Controllers\ApiPublicController;
use App\RoomServiceUserPack;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            $data = $user_pack->transform();
            $data['subscriptions'] = $user_pack->subscriptions->map(function ($subscription) {
                return $subscription->transform();
            });
            return $data;
        });

        return $this->respondSuccessWithStatus([
            'user_packs' => $user_packs
        ]);
    }
}
