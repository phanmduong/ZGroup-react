<?php

/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/5/17
 * Time: 20:57
 */

namespace App\Http\Controllers;


use App\GroupMember;
use App\Providers\AppServiceProvider;
use App\Register;
use App\Services\EmailService;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageCollectMoneyApiController extends ManageApiController
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    public function search_registers(Request $request)
    {
        $search = $request->search;
        $limit = 20;

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
        })->orderBy('created_at')->paginate($limit);


        $code = next_code();

        $data = [
            'next_code' => $code['next_code'],
            'next_waiting_code' => $code['next_waiting_code'],
            'users' => []
        ];

        // parse user information
        foreach ($users as $user) {
            $data['users'][] = [
                'id' => $user->id,
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
                            'class_name' => $studyClass->name,
                            'class_type' => $studyClass->type,
                            'register_time' => format_vn_date(strtotime($regis->created_at)),
                            'code' => $regis->code,
                            'icon_url' => $studyClass->course->icon_url,
                            'money' => $regis->money,
                            'received_id_card' => $regis->received_id_card,
                            'note' => $regis->note,
                            'coupon' => $regis->coupon,
                            'paid_time' => format_vn_date(strtotime($regis->paid_time)),
                            'is_paid' => $regis->status
                        ];
                    })
            ];
        }

        return $this->respondWithPagination($users, $data);
    }

    public function pay_money(Request $request)
    {
        if ($request->register_id == null || $request->money == null ||
            $request->code == null) {
            return $this->responseBadRequest('Not enough parameters!');
        }
        $register_id = $request->register_id;
        $money = str_replace(array('.', ','), '', $request->money);
        $code = $request->code;

        $register = Register::find($register_id);

        if ($register->status == 1) {
            return $this->responseBadRequest('Học viên này đã đóng tiền rồi');
        }

        $register->money = $money;

        $register->paid_time = format_time_to_mysql(time());
        $register->received_id_card = ($request->received_id_card) ? $request->received_id_card : 0;
        $register->note = $request->note;
        $register->staff_id = $this->user->id;
        $regis_by_code = Register::where('code', $code)->first();


        if ($regis_by_code != null) {
            return $this->responseBadRequest('code is already existed');
        } else {
            $register->code = $code;
            $register->status = 1;


            $transaction = new Transaction();
            $transaction->money = $money;
            $transaction->sender_id = $this->user->id;
            $transaction->receiver_id = $register->id;
            $transaction->sender_money = $this->user->money;
            $transaction->note = "Học viên " . $register->user->name . " - Lớp " . $register->studyClass->name;
            $transaction->status = 1;
            $transaction->type = 1;

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
            $register->save();
            $transaction->save();


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

            $this->emailService->send_mail_confirm_receive_student_money($register, [AppServiceProvider::$config['email']]);
            send_sms_confirm_money($register);
        }
        $return_data = array(
            'register' => [
                'id' => $register->id,
                'money' => $register->money,
                'code' => $register->code,
                'note' => $register->note,
                'received_id_card' => $register->received_id_card,
                'paid_time' => format_vn_date(strtotime($register->paid_time)),
                'course' => $register->studyClass->course->name,
                'class_name' => $register->studyClass->name,
                'register_time' => format_vn_date(strtotime($register->created_at)),
                'icon_url' => $register->studyClass->course->icon_url,
                'is_paid' => $register->status
            ]
        );


        $code = next_code();

        $return_data["next_code"] = $code['next_code'];
        $return_data["next_waiting_code"] = $code['next_waiting_code'];

        return $this->respondSuccessWithStatus($return_data);
    }

    public function history_collect_money(Request $request)
    {
        $search = $request->search;
        $limit = 40;

        if ($search) {
            $registers = Register::where('registers.status', 1)->join('users', 'users.id', '=', 'registers.user_id')
                ->where(function ($query) use ($search) {
                    $query->where('users.name', 'like', '%' . $search . '%')
                        ->orwhere('users.phone', 'like', '%' . $search . '%')
                        ->orwhere('users.email', 'like', '%' . $search . '%')
                        ->orwhere('registers.code', 'like', '%' . $search . '%')
                        ->orWhere('registers.note', 'like', '%' . $search . '%');
                })
                ->select('registers.*', 'users.name', 'users.email', 'users.phone');
        } else {
            $registers = Register::where('status', 1);
            if ($request->staff_id)
                $registers = $registers->where('staff_id', $request->staff_id);
        }
        
        $registers = $registers->orderBy('paid_time', 'desc')->paginate($limit);

        $data = [
            'registers' => $registers->map(function ($register) {
                $studyClass = $register->studyClass()->withTrashed()->first();
                $register_data = [
                    'id' => $register->id,
                    'student' => [
                        'id' => $register->user_id,
                        'name' => $register->user->name,
                        'email' => $register->user->email,
                        'phone' => $register->user->phone,
                    ],
                    'money' => $register->money,
                    'code' => $register->code,
                    'note' => $register->note,
                    'paid_status' => $register->status == 1,
                    'paid_time' => format_date_to_mysql($register->paid_time),
                    'paid_time_full' => format_date_full_option($register->paid_time),
                    'course_money' => $studyClass->course->price,
                    'class' => [
                        'id' => $studyClass->id,
                        'name' => $studyClass->name,
                        'icon_url' => $studyClass->course->icon_url
                    ]
                ];
                if ($register->staff)
                    $register_data['collector'] = [
                    'id' => $register->staff->id,
                    'name' => $register->staff->name,
                    'color' => $register->staff->color,
                ];
                return $register_data;
            })
        ];
        return $this->respondWithPagination($registers, $data);
    }

}