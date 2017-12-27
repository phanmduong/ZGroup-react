<?php

namespace Modules\WorkShift\Http\Controllers;

use App\Base;
use App\Colorme\Transformers\WorkShiftSessionTransformer;
use App\Colorme\Transformers\WorkShiftTransformer;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Repositories\UserRepository;
use App\WorkShift;
use App\WorkShiftPick;
use App\WorkShiftSession;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ManageWorkShiftApiController extends ManageApiController
{
    protected $workShiftSessionTransformer;
    protected $workShiftTransformer;
    protected $userRepository;

    public function __construct(WorkShiftSessionTransformer $workShiftSessionTransformer, WorkShiftTransformer $workShiftTransformer,
                                UserRepository $userRepository)
    {
        parent::__construct();
        $this->workShiftSessionTransformer = $workShiftSessionTransformer;
        $this->workShiftTransformer = $workShiftTransformer;
        $this->userRepository = $userRepository;
    }

    public function createWorkSession(Request $request)
    {

        $shift_session = new WorkShiftSession();
        $shift_session->active = $request->active ? $request->active : 0;

        $shift_session->name = $request->name;
        $shift_session->start_time = $request->start_time;
        $shift_session->end_time = $request->end_time;

        $shift_session->save();

        return $this->respondSuccessWithStatus([
            'work_shift_session' => $shift_session
        ]);
    }

    public function editWorkSession($shiftSessionId, Request $request)
    {

        $shift_session = WorkShiftSession::find($shiftSessionId);

        if ($shift_session == null) {
            return $this->respondErrorWithStatus("Ca làm việc không tồn tại");
        }

        $shift_session->active = $request->active ? $request->active : 0;

        $shift_session->name = $request->name;
        $shift_session->start_time = $request->start_time;
        $shift_session->end_time = $request->end_time;

        $shift_session->save();

        return $this->respondSuccessWithStatus([
            'work_shift_session' => $shift_session
        ]);
    }

    public function deleteWorkSession($shiftSessionId)
    {

        $shift_session = WorkShiftSession::find($shiftSessionId);

        if ($shift_session == null) {
            return $this->respondErrorWithStatus("Ca làm việc không tồn tại");
        }

        $shift_session->delete();

        return $this->respondSuccess("Xóa thành công");
    }

    public function allWorkSession()
    {

        $work_shifts_sessions = WorkShiftSession::all();

        $work_shifts_sessions = $this->workShiftSessionTransformer->transformCollection($work_shifts_sessions);

        return $this->respondSuccessWithStatus([
            'work_shift_sessions' => $work_shifts_sessions
        ]);
    }

    public function createWorkShift()
    {
        $date = new \DateTime();
        $date->modify('-1 days');
        $formatted_date_from = $date->format('Y-m-d');
        $date->modify('+6 days');
        $formatted_date_to = $date->format('Y-m-d');
        $dates = createDateRangeArray(strtotime($formatted_date_from), strtotime($formatted_date_to));
        $bases = Base::where('center', 1)->get();
        $current_gen = Gen::getCurrentGen();
        $shiftSessions = WorkShiftSession::where('active', 1)->get();
        $lastShift = WorkShift::where('gen_id', $current_gen->id)->orderBy('week', 'desc')->first();
        $week = $lastShift ? $lastShift->week : 0;

        $lastShift = WorkShift::orderBy('id', 'desc')->first();

        $order = $lastShift ? $lastShift->order : 0;
        foreach ($dates as $date) {
            foreach ($bases as $base) {
                foreach ($shiftSessions as $shiftSession) {
                    $shift = WorkShift::where("base_id", $base->id)->where("gen_id", $current_gen->id)->where("work_shift_session_id", $shiftSession->id)->where("date", $date)->first();
                    if (is_null($shift)) {
                        $shift = new WorkShift();
                        $shift->gen_id = $current_gen->id;
                        $shift->base_id = $base->id;
                        $shift->work_shift_session_id = $shiftSession->id;
                        $shift->week = $week + 1;
                        $shift->order = $order + 1;
                        $shift->date = $date;
                        $shift->save();
                    }
                }
            }
        }

        return $this->respondSuccess("Tạo lịch làm việc thành công");

    }

    public function getCurrentShifts(Request $request)
    {
        $gen_id = $request->gen_id;
        $base_id = $request->base_id;
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }
        if ($base_id) {
            $shifts = $current_gen->work_shifts()->where('base_id', $base_id)->get();
        } else {
            $shifts = $current_gen->work_shifts()->get();
        }


        $weeks = $shifts->pluck('week')->unique()->sortByDesc(function ($week, $key) {
            return $week;
        });

        $return_arr = [];
        foreach ($weeks as $week) {
            $week_shifts = $shifts->where('week', $week);
            $dates = $week_shifts->pluck('date')->unique();
            $return_dates = [];
            foreach ($dates as $date) {
                $temp = [];
                foreach ($shifts as $item) {
                    if ($item->date == $date) {
                        $temp[] = $item;
                    }
                }

                $shiftsData = $this->workShiftTransformer->transformCollection(collect($temp));
                $return_dates[] = [
                    "date" => date_shift(strtotime($date)),
                    "shifts" => $shiftsData
                ];
            }
            $return_arr[] = [
                'dates' => $return_dates,
                'week' => $week
            ];
        }
        return $this->respondSuccessWithStatus(['weeks' => $return_arr]);
    }

    public function registerShift($workShiftId)
    {

        $shift = WorkShift::find($workShiftId);

        if (in_array($this->user->id, $shift->users()->pluck('user_id')->toArray())) {
            return $this->respondSuccess("Bạn đã đăng kí ca làm việc này");
        }

        $shift->users()->attach($this->user->id);
        $shift_pick = new WorkShiftPick();
        $shift_pick->user_id = $this->user->id;
        $shift_pick->work_shift_id = $shift->id;
        $shift_pick->status = 1;
        $shift_pick->save();

        return $this->respondSuccessWithStatus([
            'user' => $this->userRepository->staff($this->user)
        ]);
    }

    public function removeRegisterShift($workShiftId)
    {
        $shift = WorkShift::find($workShiftId);

        if (!in_array($this->user->id, $shift->users()->pluck('user_id')->toArray())) {
            return $this->respondSuccess("Bạn chưa đăng kí ca làm việc này");
        }

        $shift->users()->detach($this->user->id);

        $shift_pick = new WorkShiftPick();
        $shift_pick->user_id = $this->user->id;
        $shift_pick->work_shift_id = $shift->id;
        $shift_pick->status = 0;
        $shift_pick->save();

        return $this->respondSuccessWithStatus([
            'user' => $this->userRepository->staff($this->user)
        ]);
    }

    public function get_history_shift_register()
    {

        $limit = 40;

        $shift_picks = WorkShiftPick::orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            "shift_picks" => $shift_picks->map(function ($shiftPick) {
                $shift_session = $shiftPick->work_shift->work_shift_session()->withTrashed()->first();

                $shiftPickDate = [
                    'shift_pick' => [
                        'id' => $shiftPick->work_shift->id,
                        'week' => $shiftPick->work_shift->week,
                        'status' => $shiftPick->status,
                        'created_at' => format_full_time_date($shiftPick->created_at),
                        'name' => $shift_session->name,
                        'start_time' => $shift_session->start_time,
                        'end_time' => $shift_session->end_time,
                    ]
                ];

                if ($shiftPick->user) {
                    $shiftPickDate['user'] = [
                        'id' => $shiftPick->user->id,
                        'name' => $shiftPick->user->name,
                        'avatar_url' => generate_protocol_url($shiftPick->user->avatar_url),
                    ];
                }

                return $shiftPickDate;
            })
        ];
        return $this->respondWithPagination($shift_picks, $data);
    }
}
