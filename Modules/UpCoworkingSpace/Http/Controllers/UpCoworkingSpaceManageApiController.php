<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Http\Controllers\ApiPublicController;
use App\Http\Controllers\ManageApiController;
use App\RoomServiceRegister;
use App\RoomServiceSubscription;
use App\RoomServiceSubscriptionKind;
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
        $search = $request->search;

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

    public function getSubscription($userPackId, Request $request)
    {
        $subscriptions = RoomServiceSubscription::where('user_pack_id', $userPackId);

        $subscriptions = $subscriptions->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            'subscriptions' => $subscriptions->map(function ($subscription) {
                return $subscription->getData();
            })
        ]);
    }

    public function createSubscription($userPackId, Request $request)
    {
        $subscription = new RoomServiceSubscription;

        $subscription->description = $request->description;
        $subscription->price = $request->price;
        $subscription->subscription_kind_id = $request->subscription_kind_id;

        $subscription->save();

        return $this->respondSuccess('Tạo gói thành viên thành công');
    }

    public function getSubscriptionKinds(Request $request)
    {
        $search = $request->search;

        $subscriptionKinds = RoomServiceSubscriptionKind::query();
        $subscriptionKinds = $subscriptionKinds->where('name', 'like', '%' . $search . '%');
        $subscriptionKinds = $subscriptionKinds->orderBy('created_at', 'desc')->get();
        return $this->respondErrorWithStatus([
            'subscription_kinds' => $subscriptionKinds->map(function($subscriptionKind){
                return $subscriptionKind->getData();
            })
        ]);
    }

    public function createSubscriptionKind(Request $request)
    {
        if ($request->name == null || trim($request->name) == '')
            return $this->respondErrorWithStatus('Thiếu tên');

        $subscriptionKind = new RoomServiceSubscriptionKind;

        $subscriptionKind->name = $request->name;
        $subscriptionKind->hours = $request->hours;

        $subscriptionKind->save();

        return $this->respondSuccess('Tạo thành công');
    }
}
