<?php

namespace Modules\Booking\Http\Controllers;

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
use App\Room;
use Carbon\Carbon;
use App\RoomServiceRegisterRoom;

class ManageBookingController extends ManageApiController
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
            $registers = RoomServiceRegister::where('type', 'member')->get();
            return $this->respondSuccessWithStatus([
                'room_service_registers' => $registers->map(function ($register) {
                    return $register->getData();
                })
            ]);
        }
        if ($search)
            $registers = RoomServiceRegister::where('type', 'member')->join('users', 'users.id', '=', 'room_service_registers.user_id')
            ->select('room_service_registers.*')->where(function ($query) use ($search) {
                $query->where("users.name", "like", "%$search%")->orWhere("users.email", "like", "%$search%")->orWhere("users.phone", "like", "%$search%");
            });
        else $registers = RoomServiceRegister::where('type', 'member');

        if ($request->base_id)
            $registers = $registers->where('room_service_registers.base_id', $request->base_id);
        if ($request->staff_id)
            $registers = $registers->where('room_service_registers.staff_id', $request->staff_id);
        if ($request->saler_id)
            $registers = $registers->where('room_service_registers.saler_id', $request->saler_id);
        if ($request->campaign_id)
            $registers = $registers->where('room_service_registers.campaign_id', $request->campaign_id);
        if ($request->status)
            $registers = $registers->where('room_service_registers.status', $request->status);
        if ($request->start_time && $request->end_time)
            $registers = $registers->whereBetween('room_service_registers.created_at', array($request->start_time, $request->end_time));
        $registers = $registers->orderBy('room_service_registers.created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($registers, [
            'room_service_registers' => $registers->map(function ($register) {
                return $register->getData();
            })
        ]);
    }

    public function getRoomBookings(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $search = $request->search;

        if ($limit == -1) {
            $registers = RoomServiceRegister::where('type', 'room')->get();
            return $this->respondSuccessWithStatus([
                'room_service_registers' => $registers->map(function ($register) {
                    return $register->getData();
                })
            ]);
        }

        $registers = RoomServiceRegister::where('room_service_registers.type', 'room');
        $registers = $registers->join('users', 'users.id', '=', 'room_service_registers.user_id')
            ->select('room_service_registers.*')->where(function ($query) use ($search) {
                $query->where("users.name", "like", "%$search%")->orWhere("users.email", "like", "%$search%")->orWhere("users.phone", "like", "%$search%");
            });

        if ($request->base_id)
            $registers = $registers->where('room_service_registers.gitbase_id', $request->base_id);
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
                $data = $register->getData();
                $register = RoomServiceRegister::where('user_id', $register->id)->where('type', 'member')->where('start_time', '<>', null)
                    ->where('end_time', '<>', null)
                    ->where('end_time', '>', date('Y-m-d H:i:s'))->first();
                $data['is_member'] = ($register != null);
                $data['extra_time'] = $register ? $register->extra_time : 0;
                return $data;
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
        $subscription->extra_time = $request->extra_time;
        $subscription->booking_discount = $request->booking_discount;
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
        $subscription->extra_time = $request->extra_time;
        $subscription->booking_discount = $request->booking_discount;
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
        $register->user_id = $this->user->id;
        $register->campaign_id = $request->campaign_id ? $request->campaign_id : 0;
        $register->saler_id = $this->user->id;
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
    public function registerRoom(Request $request)
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
        $register->saler_id = $this->user->id;
        //$register->base_id = $request->base_id ? $request->base_id : 0;
        $register->type = 'room';
        $register->start_time = $request->start_time;
        $register->end_time = $request->end_time;
        $register->save();

        return $this->respondSuccess(['Thêm đăng ký thành công']);
    }

    public function assignSubscription($registerId, Request $request)
    {
        $register = RoomServiceRegister::find($registerId);
        if ($register == null)
            return $this->respondErrorWithStatus('Không tồn tại đăng ký');
        $register->subscription_id = $request->subscription_id;
        $register->start_time = $request->start_time;
        $register->end_time = $request->end_time;
        $register->extra_time = $request->extra_time;
        $register->note = $request->note;
        $register->save();
        return $this->respondSuccessWithStatus(["register" => $register->getData()]);
    }

    public function validateDate($date, $format = 'Y-m-d H:i:s')
    {
        $d = Carbon::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }

    public function assignTime($registerId, Request $request)
    {
        if ($register = RoomServiceRegister::find($registerId));
        if ($register == null)
            return $this->respondErrorWithStatus('Không tồn tại đặt phòng');
        if ($this->validateDate($request->start_time) == false || $this->validateDate($request->end_time) == false)
            return $this->respondErrorWithStatus('Nhập ngày tháng đúng định dạng Y-m-d H:i:s');
            
        $registerRoom = RoomServiceRegisterRoom::where('room_service_register_id', $register->id)->first();

        $registerRoom->start_time = $request->start_time;
        $registerRoom->end_time = $request->end_time;

        $registerRoom->save();
        return $this->respondSuccess('Thêm thành công');
    }

    public function conferenceRooms(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $conferenceRooms = Room::join('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->where('room_types.type_name', 'conference')->select('rooms.*')
            ->where('rooms.name', 'like', "%$request->search%")
            ->paginate($limit);

        return $this->respondWithPagination($conferenceRooms, [
            'rooms' => $conferenceRooms->map(function ($conferenceRoom) {
                return $conferenceRoom->getData();
            })
        ]);
    }
}
