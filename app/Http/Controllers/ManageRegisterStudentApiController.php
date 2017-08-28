<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/28/17
 * Time: 00:08
 */

namespace App\Http\Controllers;

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
        if ($request->gen_id) {
            $gen = Gen::find($request->gen_id);
        } else {
            $gen = Gen::getCurrentGen();
        }

        $id = $request->id;

        $registers = $gen->registers()->whereIn('user_id', $id);
        foreach ($registers as $regis) {
            $regis->call_status = 2;
            $regis->save();
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
                'updated_at' => format_time_to_mysql(strtotime($item->updated_at)),
                'caller' => [
                    'name' => $item->caller->name,
                    'color' => $item->caller->color
                ],
                'call_status' => call_status_text($item->call_status),
                'note' => $item->note
            ];
        });

        return $this->respondSuccessWithStatus([
            'history_call'=> $history_call
        ]);
    }

}