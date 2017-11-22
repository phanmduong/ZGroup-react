<?php

namespace App\Http\Controllers;

use App\GroupMember;
use App\Register;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class MoneyManageApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param
     * @param Request $request (money,note,register_id,code)
     * @return mixed
     */
    public function pay_register( Request $request)
    {
        $register_id = $request->register_id;
        $register = Register::find($register_id);
        if ($register->status == 1) {
            return $this->respondErrorWithStatus("Học viên này đã đóng tiền rồi");
        } else {
            $regis_by_code = Register::where('code', $request->code)->first();
            if ($regis_by_code) {
                return $this->respondErrorWithStatus("Mã học viên này đã tồn tại");
            } else {
                $money = str_replace(array('.', ','), '', $request->money);
                $register->status = 1;
                $register->money = $money;
                $register->paid_time = format_time_to_mysql(time());
                $register->note = $request->note;
                $register->staff_id = $this->user->id;
                $register->code = $request->code;
                $register->save();

                $transaction = new Transaction();
                $transaction->money = $money;
                $transaction->sender_id = $this->user->id;
                $transaction->receiver_id = $register->id;
                $transaction->sender_money = $this->user->money;
                $transaction->note = "Học viên " . $register->user->name . " - Lớp " . $register->studyClass->name;
                $transaction->status = 1;
                $transaction->type = 1;
                $transaction->save();

                DB::insert(DB::raw("
                insert into attendances(`register_id`,`checker_id`,class_lesson_id)
                (select registers.id,-1,class_lesson.id
                from class_lesson
                join registers on registers.class_id = class_lesson.class_id
                where registers.id = $register->id
                )
                "));

                $current_money = $this->user->money;
                $this->user->money = $current_money + $money;
                $this->user->save();

                if ($register->studyClass->group) {
                    $groupMember = new GroupMember();
                    $groupMember->group_id = $register->studyClass->group->id;
                    $groupMember->user_id = $register->user_id;
                    $groupMember->join_date = format_time_to_mysql(time());
                    $groupMember->acceptor_id = $this->user->id;
                    $groupMember->position = "member";
                    $groupMember->state = "joined";
                    $groupMember->save();
                }

                send_mail_confirm_receive_studeny_money($register, ["colorme.idea@gmail.com"]);
                send_sms_confirm_money($register);

            }
        }
        return $this->respondSuccessWithStatus('Đã lưu thành công');

    }

    public function search_registers( Request $request)
    {
        $search = $request->search;

        // search all unpaid users
        $users = User::whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('registers')
                ->where('status', 0)
                ->whereRaw('registers.user_id = users.id');
        })->where(function ($query) use ($search) {
            $query->where('email', 'like', '%' . $search . '%')
                ->orWhere('phone', 'like', '%' . $search . '%')
                ->orWhere('name', 'like', '%' . $search . '%');
        })->take(20)->get();


        // compute the code and waiting code
        $code = Register::orderBy('code', 'desc')->first();
        $code = $code ? $code->code : "";
        $waiting_code = Register::where('code', 'like', 'CCM%')->orderBy('code', 'desc')->first();
        $waiting_code = $waiting_code ? $waiting_code->code : "";
        $nextNumber = empty($code) ? "" : explode("M", $code)[1] + 1;
        if ($waiting_code) {
            $waiting_code = empty($waiting_code) ? "" : explode("M", $waiting_code)[1] + 1;
        } else {
            $waiting_code = $nextNumber;
        }
        $data = [
            'next_code' => 'CM' . $nextNumber,
            'next_waiting_code' => 'CCM' . $waiting_code,
            'users' => []
        ];

        // parse user information
        foreach ($users as $user) {
            $data['users'][] = [
                'name' => $user->name,
                'avatar_url' => $user->avatar_url ? $user->avatar_url : url('img/user.png'),
                'phone' => $user->phone,
                'email' => $user->email,
                'registers' => $user->registers->map(function ($regis) {
                    return [
                        'id' => $regis->id,
                        'course' => $regis->studyClass->course->name,
                        'class' => $regis->studyClass->name,
                        'register_time' => format_time_to_mysql(strtotime($regis->created_at)),
                        'code' => $regis->code,
                        'icon_url' => $regis->studyClass->course->icon_url,
                        'money' => $regis->money,
                        'received_id_card' => $regis->received_id_card,
                        'note' => $regis->note,
                        'paid_time' => format_time_to_mysql(strtotime($regis->paid_time)),
                        'is_paid' => $regis->status
                    ];
                })
            ];
        }

        return $this->respondSuccessWithStatus($data);
    }
}
