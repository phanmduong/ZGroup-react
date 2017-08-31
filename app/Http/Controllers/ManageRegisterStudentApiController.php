<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/28/17
 * Time: 00:08
 */

namespace App\Http\Controllers;

use App\Register;
use App\TeleCall;
use App\User;
use App\Gen;
use Illuminate\Http\Request;

class ManageRegisterStudentApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function history_call_student(Request $request)
    {
        $id = $request->id;

        if ($request->register_id) {
            $register = Register::find($request->register_id);
            $register->call_status = 2;
            $register->save();
        }

        $student = User::find($id);


        $telecall = new TeleCall;
        $telecall->caller_id = $this->user->id;
        $telecall->student_id = $student->id;
        $telecall->note = null;
        $telecall->call_status = 2;
        $telecall->gen_id = Gen::getCurrentGen()->id;
        $telecall->save();

        $history_call = $student->is_called->map(function ($item) {
            return [
                'id' => $item->id,
                'updated_at' => format_date_full_option($item->updated_at),
                'caller' => [
                    'name' => $item->caller ? $item->caller->name : 'Không có',
                    'color' => $item->caller ? $item->caller->color : ''
                ],
                'call_status' => call_status_text($item->call_status),
                'note' => $item->note
            ];
        });

        return $this->respondSuccessWithStatus([
            'history_call' => $history_call,
            'telecall_id' => $telecall->id
        ]);
    }

    public function change_call_status(Request $request)
    {
        $student_id = $request->student_id;

        $status = $request->status;
        $student = User::find($student_id);

        if ($request->gen_id) {
            $gen = Gen::find($request->gen_id);
        } else {
            $gen = Gen::getCurrentGen();
        }

//        $registers = $gen->registers()->where('user_id', $student_id)->get();
//        foreach ($registers as $register) {
//
//            $register->call_status = $status;
//            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
//            $register->save();
//        }
        foreach ($student->registers as $register) {
            $register->call_status = $status;
            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
            $register->save();
        }

        $telecall = TeleCall::find($request->telecall_id);
        if ($request->caller_id) {
            $telecall->caller_id = $request->caller_id;
        } else {
            $telecall->caller_id = $this->user->id;
        }

        $telecall->note = $request->note;
        $telecall->gen_id = Gen::getCurrentGen()->id;
        $telecall->call_status = $status;
        $telecall->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Thành công',
            'call_status' => call_status_text($status)
        ]);
    }

    public function delete_register(Request $request)
    {
        $register = Register::find($request->register_id);

        if ($register->status != 1) {
            $class = $register->studyClass;
            if ($class->registers()->count() < $class->target) {
                $class->status = 1;
                $class->save();
            }

            send_mail_delete_register($register, $this->user);
            $register->delete();
            return $this->respondSuccessWithStatus([
                'message' => 'Xóa thành công'
            ]);

        }

        return $this->respondSuccessWithStatus([
            'message' => 'Không thể xóa đăng kí này.'
        ]);
    }


}