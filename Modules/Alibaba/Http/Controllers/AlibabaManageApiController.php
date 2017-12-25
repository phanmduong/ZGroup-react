<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 12/16/17
 * Time: 10:34
 */

namespace Modules\Alibaba\Http\Controllers;


use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Register;
use App\Repositories\UserRepository;
use App\TeleCall;
use App\User;
use Illuminate\Http\Request;

class AlibabaManageApiController extends ManageApiController
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
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

        if ($request->caller_id) {
            $saler_id = $request->caller_id;
        } else {
            $saler_id = $this->user->id;
        }

        foreach ($student->registers as $register) {
            $register->call_status = $status;
            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
            if ($status && $status == 1) {
                $register->saler_id = $saler_id;
            }
            $register->save();
        }

        $telecall = TeleCall::find($request->telecall_id);
        $telecall->caller_id = $saler_id;

        $telecall->note = $request->note;
        $telecall->gen_id = Gen::getCurrentGen()->id;
        $telecall->call_status = $status;
        $telecall->save();

        if ($status && $status == 1) {

            $saler = User::find($saler_id);

            $saler = $this->userRepository->staff($saler);

            return $this->respondSuccessWithStatus([
                'message' => 'Thành công',
                'call_status' => call_status_text($status),
                'saler' => $saler
            ]);
        } else {
            return $this->respondSuccessWithStatus([
                'message' => 'Thành công',
                'call_status' => call_status_text($status),
            ]);
        }
    }

    public function editRegister($register_id, Register $request) {
        $register = Register::where('code', $request->code)->first();
        if($register !== null)
            return $this->respondErrorWithStatus([
                'message' => 'Trung code'
            ]);
        $register = Register::find($register_id);
        if($request->money === null || $request->code === null)
            return $this->respondErrorWithStatus([
                'message' => 'Thieu money hoac code'
            ]);
        $register->code = $request->code;
        $register->status === 0 ? $register->money = 0 : $register->money = $request->money;
        $register->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}