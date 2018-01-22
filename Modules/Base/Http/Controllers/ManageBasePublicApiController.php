<?php

namespace Modules\Base\Http\Controllers;

use App\Base;
use App\Http\Controllers\PublicApiController;
use Illuminate\Http\Request;

class ManageBasePublicApiController extends PublicApiController
{
    public function baseRooms($baseId, Request $request)
    {
        $base = Base::find($baseId);
        $rooms = $base->rooms;
        return $this->respondSuccessWithStatus([
            'rooms' => $rooms->map(function ($room){
                $data = $room->getData();
                $data['available_seats'] = $room->seats;
                return $data;
            })
        ]);
    }
}