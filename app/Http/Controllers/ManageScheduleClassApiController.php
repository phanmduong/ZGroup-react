<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/30/17
 * Time: 14:23
 */

namespace App\Http\Controllers;


use App\Schedule;
use App\StudySession;
use Illuminate\Http\Request;

class ManageScheduleClassApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_schedules()
    {
        $schedules = Schedule::orderBy('created_at', 'desc')->get();
        $data = ['schedules' => $schedules->map(function ($s) {
            return format_data_schedule_class($s);
        })];

        return $this->respondSuccessWithStatus($data);
    }

    public function add_schedule(Request $request)
    {

        $schedule = new Schedule();
        $schedule->name = $request->name;
        $schedule->description = $request->description;
        $schedule->save();

        foreach ($request->study_session_ids as $id) {
            $schedule->studySessions()->attach($id);
        }

        return $this->respondSuccessWithStatus([
            'schedule' => format_data_schedule_class($schedule)
        ]);
    }

    public function delete_schedule(Request $request)
    {
        $schedule = Schedule::where('id', $request->id)->first();
        $schedule->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Xóa thành công'
        ]);
    }

    public function edit_schedule($scheduleClassId, Request $request)
    {
        $schedule = Schedule::find($scheduleClassId);
        $schedule->name = $request->name;
        $schedule->description = $request->description;
        $studySessionIds = $schedule->studySessions()->pluck('id')->toArray();

        foreach ($studySessionIds as $id) {
            if (!in_array($id, $request->study_session_ids)) {
                $schedule->studySessions()->detach($id);
            }
        }

        foreach ($request->study_session_ids as $id) {
            if (!in_array($id, $studySessionIds)) {
                $schedule->studySessions()->attach($id);
            }
        }

        $schedule->save();

        $schedule = format_data_schedule_class($schedule);


        return $this->respondSuccessWithStatus([
            'schedule' => $schedule
        ]);
    }


}