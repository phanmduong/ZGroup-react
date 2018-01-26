<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Http\Controllers\ApiPublicController;
use App\Http\Controllers\ManageApiController;
use App\RoomServiceRegister;
use App\RoomServiceUserPack;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UpCoworkingSpaceManageApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getRegisters(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $registers = RoomServiceRegister::query();

        if ($request->user_id)
            $registers = $registers->where('user_id', $request->user_id);
        if ($request->staff_id)
            $registers = $registers->where('staff_id', $request->staff_id);
        if ($request->status)
            $registers = $registers->where('status', $request->status);

        $registers = $registers->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($registers, [
            'room_service_registers' => $registers->map(function ($register) {
                return $register->getData();
            })
        ]);
    }

    public function getUserPacks(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $userPacks = RoomServiceUserPack::query();

        if ($limit == -1) {
            $userPacks = $userPacks->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'user_packs' => $userPacks->map(function ($userPack) {
                    return $userPack->getData();
                })
            ]);
        }

        $userPacks = $userPacks->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($userPacks, [
            'user_packs' => $userPacks->map(function ($userPack) {
                return $userPack->getData();
            })
        ]);
    }
}
