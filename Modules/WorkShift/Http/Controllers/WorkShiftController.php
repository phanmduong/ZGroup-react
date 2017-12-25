<?php

namespace Modules\WorkShift\Http\Controllers;

use App\Colorme\Transformers\WorkShiftSessionTransformer;
use App\Http\Controllers\ManageApiController;
use App\WorkShiftSession;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class WorkShiftController extends ManageApiController
{
    protected $workShiftSessionTransformer;

    public function __construct(WorkShiftSessionTransformer $workShiftSessionTransformer)
    {
        parent::__construct();
        $this->workShiftSessionTransformer = $workShiftSessionTransformer;
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

    public function allWorkSession()
    {

        $work_shifts_sessions = WorkShiftSession::all();

        $work_shifts_sessions = $this->workShiftSessionTransformer->transformCollection($work_shifts_sessions);

        return $this->respondSuccessWithStatus([
            'work_shift_sessions' => $work_shifts_sessions
        ]);
    }
}
