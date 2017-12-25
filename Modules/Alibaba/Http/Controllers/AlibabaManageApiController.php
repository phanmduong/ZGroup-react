<?php

namespace Modules\Alibaba\Http\Controllers;


use App\Colorme\Transformers\RegisterTransformer;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Register;
use App\Repositories\UserRepository;
use App\StudyClass;
use App\TeleCall;
use App\User;
use Illuminate\Http\Request;

class AlibabaManageApiController extends ManageApiController
{
    protected $userRepository, $registerTransformer;

    public function __construct(UserRepository $userRepository, RegisterTransformer $registerTransformer)
    {
        parent::__construct();
        $this->registerTransformer = $registerTransformer;
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

    public function editRegister($register_id, Request $request)
    {
        $register = Register::where('code', $request->code)->first();
        if ($register !== null)
            return $this->respondErrorWithStatus([
                'message' => 'Trung code'
            ]);
        $register = Register::find($register_id);
        if ($request->money === null || $request->code === null)
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

    public function registerList(Request $request)
    {
        if ($request->gen_id) {
            $gen = Gen::find($request->gen_id);
        } else {
            $gen = Gen::getCurrentGen();
        }

        if ($request->limit) {
            $limit = $request->limit;
        } else {
            $limit = 20;
        }

        $search = $request->search;

        if ($search) {
            $users_id = User::where('email', 'like', '%' . $search . '%')
                ->orWhere('phone', 'like', '%' . $search . '%')
                ->orWhere('name', 'like', '%' . $search . '%')->get()->pluck('id')->toArray();
            $registers = $gen->registers()->whereIn('user_id', $users_id);
        } else {
            $registers = $gen->registers();
        }

        if ($request->class_id != null) {
            $registers = $registers->where('class_id', $request->class_id);
        }

        if ($request->type != null) {
            $classes = StudyClass::where('type', $request->type)->get()->pluck('id')->toArray();
            $registers = $registers->whereIn('class_id', $classes);
        }
        if ($request->status != null) {
            $registers = $registers->where('status', $request->status);
        }
        if ($request->saler_id != null) {
            if ($request->saler_id == -1) {
                $registers = $registers->whereNull('saler_id')->orWhere('saler_id', 0);
            } else {
                $registers = $registers->where('saler_id', $request->saler_id);
            }

        }

        if ($request->campaign_id != null) {
            if ($request->campaign_id == -1) {
                $registers = $registers->whereNull('campaign_id')->orWhere('campaign_id', 0);
            } else {
                $registers = $registers->where('campaign_id', $request->campaign_id);
            }

        }


        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));
        if ($request->start_time != null) {
            $registers = $registers->whereBetween('created_at', array($request->start_time, $endTime));
        }
        if ($limit == -1)
            $registers = $registers->orderBy('created_at', 'desc')->get();
        else
            $registers = $registers->orderBy('created_at', 'desc')->paginate($limit);

        $registers->map(function ($register) {

        });
        foreach ($registers as &$register) {
            $register->study_time = 1;
            $user = $register->user;
            foreach ($user->registers()->where('id', '!=', $register->id)->get() as $r) {
                if ($r->studyClass->course_id == $register->studyClass->course_id) {
                    $register->study_time += 1;
                }
            }
            if ($register->call_status == 0) {
                if ($register->time_to_reach == 0) {
                    $register->call_status = 4;
                    $register->time_to_reach = $register->time_to_call != '0000-00-00 00:00:00' ?
                        ceil(diffDate(date('Y-m-d H:i:s'), $register->time_to_call)) : 0;
                }
            } else {
                if ($register->call_status == 2) {
                    $register->time_to_reach = null;
                }
            }
            $register->is_delete = is_delete_register($this->user, $register);
        }
        if ($limit == -1) {
            $registers = $this->registerTransformer->transformCollection($registers);
            $registers = $registers->map(function ($register){
                $data = $register;
                $data['editable'] = true;
            });
            return $this->respondSuccessWithStatus([
                'registers' => $registers,
                'gen' => [
                    'id' => $gen->id
                ]
            ]);
        }
        $registers = $this->registerTransformer->transformCollection($registers);
        $registers = $registers->map(function ($register){
            $data = $register;
            $data['editable'] = true;
        });
        return $this->respondWithPagination($registers, [
            'registers' => $registers,
            'gen' => [
                'id' => $gen->id
            ]
        ]);
    }
}