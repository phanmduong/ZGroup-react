<?php

namespace App\Http\Controllers;

use App\GroupMember;
use App\Register;
use App\Services\EmailService;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class MoneyManageApiController extends ApiController
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    /**
     * @param
     * @param Request $request (money,note,register_id,code)
     * @return mixed
     */
    public function pay_register(Request $request)
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

                $this->emailService->send_mail_confirm_receive_student_money($register, ["colorme.idea@gmail.com"]);

                send_sms_confirm_money($register);

            }
        }
        return $this->respondSuccessWithStatus('Đã lưu thành công');

    }

    public function search_registers(Request $request)
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


        $code = next_code();

        $data = [
            'next_code' => $code['next_code'],
            'next_waiting_code' => $code['next_waiting_code'],
            'users' => []
        ];

        // parse user information
        foreach ($users as $user) {
            $data['users'][] = [
                'name' => $user->name,
                'avatar_url' => $user->avatar_url ? $user->avatar_url : url('img/user.png'),
                'phone' => $user->phone,
                'email' => $user->email,
                'registers' => $user->registers()->join("classes", "classes.id", "=", "registers.class_id")
                    ->whereNull("classes.deleted_at")->select("registers.*")->get()->map(function ($regis) {
                        $studyClass = $regis->studyClass()->withTrashed()->first();
                    return [
                        'id' => $regis->id,
                        'course' => $studyClass->course->name,
                        'class' => $studyClass->name,
                        'class_type' => $studyClass->type,
                        'register_time' => format_time_to_mysql(strtotime($regis->created_at)),
                        'code' => $regis->code,
                        'icon_url' => $studyClass->course->icon_url,
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
