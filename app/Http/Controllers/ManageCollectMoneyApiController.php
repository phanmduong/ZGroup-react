<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/5/17
 * Time: 20:57
 */

namespace App\Http\Controllers;


use App\Register;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageCollectMoneyApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
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


        // compute the code and waiting code
        $code = Register::orderBy('code', 'desc')->first()->code;
        $waiting_code = Register::where('code', 'like', 'CCM%')->orderBy('code', 'desc')->first()->code;
        $nextNumber = explode("M", $code)[1] + 1;
        if ($waiting_code) {
            $waiting_code = explode("M", $waiting_code)[1] + 1;
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
                'id' => $user->id,
                'name' => $user->name,
                'avatar_url' => $user->avatar_url ? $user->avatar_url : url('img/user.png'),
                'phone' => $user->phone,
                'email' => $user->email,
                'registers' => $user->registers->map(function ($regis) {
                    return [
                        'id' => $regis->id,
                        'course' => $regis->studyClass->course->name,
                        'class_name' => $regis->studyClass->name,
                        'register_time' => format_vn_date(strtotime($regis->created_at)),
                        'code' => $regis->code,
                        'icon_url' => $regis->studyClass->course->icon_url,
                        'money' => $regis->money,
                        'received_id_card' => $regis->received_id_card,
                        'note' => $regis->note,
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
            $request->code == null
        ) {
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
            send_mail_confirm_receive_studeny_money($register, ["colorme.idea@gmail.com"]);
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


        $code = Register::orderBy('code', 'desc')->first()->code;

        $nextNumber = explode("M", $code)[1] + 1;
        $return_data["next_code"] = 'CM' . $nextNumber;

        $waiting_code = Register::where('code', 'like', 'CCM%')->orderBy('code', 'desc')->first()->code;
        $waiting_code = explode("M", $waiting_code)[1] + 1;
        $return_data["next_waiting_code"] = 'CCM' . $waiting_code;


        return $this->respondSuccessWithStatus($return_data);
    }

}