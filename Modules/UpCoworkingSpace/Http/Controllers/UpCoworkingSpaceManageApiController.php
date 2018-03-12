<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Http\Controllers\ApiPublicController;
use App\Http\Controllers\ManageApiController;
use App\RoomServiceRegister;
use App\RoomServiceSubscription;
use App\RoomServiceSubscriptionKind;
use App\RoomServiceUserPack;
use App\TeleCall;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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
        if ($limit == -1) {
            $registers = RoomServiceRegister::where('type', 'seat')->get();
            return $this->respondSuccessWithStatus([
                'room_service_registers' => $registers->map(function ($register) {
                    return $register->getData();
                })
            ]);
        }
        if ($search)
            $registers = RoomServiceRegister::where('type', 'seat')->join('users', 'users.id', '=', 'room_service_registers.user_id')
            ->select('room_service_registers.*')->where(function ($query) use ($search) {
                $query->where("users.name", "like", "%$search%")->orWhere("users.email", "like", "%$search%")->orWhere("users.phone", "like", "%$search%");
            });
        else $registers = RoomServiceRegister::where('type', 'seat');

        if ($request->base_id)
            $registers = $registers->where('base_id', $request->base_id);
        if ($request->staff_id)
            $registers = $registers->where('staff_id', $request->staff_id);
        if ($request->saler_id)
            $registers = $registers->where('saler_id', $request->saler_id);
        if ($request->campaign_id)
            $registers = $registers->where('campaign_id', $request->campaign_id);
        if ($request->status)
            $registers = $registers->where('status', $request->status);
        if ($request->start_time && $request->end_time)
            $registers = $registers->whereBetween('created_at', array($request->start_time, $request->end_time));
        $registers = $registers->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($registers, [
            'room_service_registers' => $registers->map(function ($register) {
                return $register->getData();
            })
        ]);
    }

    public function getRoombôkingokings(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $search = $request->search;

        if ($limit == -1) {
            $registers = RoomServiceRegister::where('type', 'room')->get();
            return $this->respondSuccessWithStatus([
                'room_service_registers' => $registers->map(function ($register) {
                    return $register->getRoomBookingData();
                })
            ]);
        }

        $registers = RoomServiceRegister::where('room_service_registers.type', 'room');
        $registers = $registers->join('users', 'users.id', '=', 'room_service_registers.user_id')
            ->select('room_service_registers.*')->where(function ($query) use ($search) {
                $query->where("users.name", "like", "%$search%")->orWhere("users.email", "like", "%$search%")->orWhere("users.phone", "like", "%$search%");
            });

        if ($request->base_id)
            $registers = $registers->where('base_id', $request->base_id);
        if ($request->staff_id)
            $registers = $registers->where('staff_id', $request->staff_id);
        if ($request->saler_id)
            $registers = $registers->where('saler_id', $request->saler_id);
        if ($request->campaign_id)
            $registers = $registers->where('campaign_id', $request->campaign_id);
        if ($request->status)
            $registers = $registers->where('status', $request->status);
        if ($request->start_time && $request->end_time)
            $registers = $registers->whereBetween('room_service_registers.created_at', array($request->start_time, $request->end_time));
        $registers = $registers->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($registers, [
            'room_service_registers' => $registers->map(function ($register) {
                return $register->getRoomBookingData();
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

    public function getSubscriptions($userPackId, Request $request)
    {
        $subscriptions = RoomServiceSubscription::where('user_pack_id', $userPackId);

        $subscriptions = $subscriptions->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            'subscriptions' => $subscriptions->map(function ($subscription) {
                return $subscription->transform();
            })
        ]);
    }

    public function getUserPack($userPackId, Request $request)
    {
        $userPack = RoomServiceUserPack::find($userPackId);
        return $this->respondSuccessWithStatus([
            "userPack" => $userPack->getData()
        ]);
    }

    public function createSubscriptions($userPackId, Request $request)
    {
        if ($request->subscription_kind_id == null || $request->subscription_kind_id == 0)
            return $this->respondErrorWithStatus('Thiếu subscription_kind_id');
        $subscription = new RoomServiceSubscription;
        $subscription->user_pack_id = $userPackId;
        $subscription->description = $request->description;
        $subscription->price = $request->price;
        $subscription->subscription_kind_id = $request->subscription_kind_id;
        $subscription->save();
        return $this->respondSuccess('Tạo gói thành viên thành công');
    }

    public function editSubscriptions($userPackId, $subcriptionId, Request $request)
    {
        if ($request->subscription_kind_id == null || $request->subscription_kind_id == 0)
            return $this->respondErrorWithStatus('Thiếu subscription_kind_id');
        $subscription = RoomServiceSubscription::find($subcriptionId);
        $subscription->user_pack_id = $userPackId;
        $subscription->description = $request->description;
        $subscription->price = $request->price;
        $subscription->subscription_kind_id = $request->subscription_kind_id;

        $subscription->save();

        return $this->respondSuccess('Sửa gói thành viên thành công');
    }

    public function getSubscriptionKinds(Request $request)
    {
        $search = $request->search;

        $subscriptionKinds = RoomServiceSubscriptionKind::query();
        $subscriptionKinds = $subscriptionKinds->where('name', 'like', '%' . $search . '%');
        $subscriptionKinds = $subscriptionKinds->orderBy('created_at', 'desc')->get();
        return $this->respondErrorWithStatus([
            'subscription_kinds' => $subscriptionKinds->map(function ($subscriptionKind) {
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

    public function createUserPack(Request $request)
    {
        if ($request->name === null || trim($request->name) == "" ||
            $request->avatar_url === null || trim($request->avatar_url) == "")
            return $this->respondErrorWithStatus("Thiếu trường");
        $userPack = new RoomServiceUserPack;
        $userPack->name = $request->name;
        $userPack->avatar_url = $request->avatar_url;
        $userPack->detail = $request->detail;
        $userPack->save();
        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công"
        ]);
    }

    public function editUserPack($userPackId, Request $request)
    {
        $userPack = RoomServiceUserPack::find($userPackId);
        if (!$userPack) return $this->respondErrorWithStatus("Không tồn tại");
        if ($request->name === null || trim($request->name) == "" ||
            $request->avatar_url === null || trim($request->avatar_url) == "")
            return $this->respondErrorWithStatus("Thiếu trường");
        $userPack->name = $request->name;
        $userPack->avatar_url = $request->avatar_url;
        $userPack->detail = $request->detail;
        $userPack->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công"
        ]);
    }

    public function changeStatusUserPack($userPackId, Request $request)
    {
        $userPack = RoomServiceUserPack::find($userPackId);
        if (!$userPack) return $this->respondErrorWithStatus("Không tồn tại");
        $userPack->status = 1 - $userPack->status;
        $userPack->save();
        return $this->respondSuccessWithStatus([
            "message" => "Đổi thành công"
        ]);
    }

    public function saveCall(Request $request)
    {
        $teleCall = new TeleCall;
        $teleCall->caller_id = $this->user->id;
        $teleCall->gen_id = 0;
        $teleCall->call_status = $request->call_status;
        $teleCall->student_id = $request->listener_id;
        $teleCall->note = $request->note;
        $teleCall->register_id = $request->register_id;
        $teleCall->save();
        return $this->respondSuccessWithStatus([
            "message" => "Lưu thành công",
            "teleCall" => $teleCall->transform(),
        ]);
    }

    public function getAllSalers(Request $request)
    {
        $saler_ids = DB::table('room_service_registers')->select('saler_id')->distinct()->get();

        $saler_idss = [];

        foreach ($saler_ids as $saler_id) {
            array_push($saler_idss, $saler_id->saler_id);
        }

        $salers = User::query();
        $salers = $salers->whereIn('id', $saler_idss)->get();

        return $this->respondSuccessWithStatus([
            'salers' => $salers
        ]);
    }

    public function booking(Request $request)
    {
        $data = ['email' => $request->email, 'phone' => $request->phone, 'name' => $request->name, 'message_str' => $request->message];
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
        $user->address = $request->address;
        $user->save();

        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->campaign_id = $request->campaign_id ? $request->campaign_id : 0;
        $register->saler_id = $request->saler_id ? $request->saler_id : 0;
        $register->base_id = $request->base_id ? $request->base_id : 0;
        $register->type = 'room';
        $register->save();
        
        // Mail::send('emails.contact_us_trong_dong', $data, function ($m) use ($request) {
        //     $m->from('no-reply@colorme.vn', 'Up Coworking Space');
        //     $subject = 'Xác nhận thông tin';
        //     $m->to($request->email, $request->name)->subject($subject);
        // });

        return $this->respondSuccess(['Thêm đăng ký thành công']);
    }
}
