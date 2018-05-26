<?php

namespace App\Http\Controllers;

use App\Schedule;
use App\StudySession;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageClassController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function studySession()
    {
        $this->data['current_tab'] = 51;
        $this->data['user_id'] = $this->user->id;
        return view('manage.studysession.index', $this->data);
    }

    public function schedule()
    {
        $this->data['user_id'] = $this->user->id;
        $this->data['current_tab'] = 50;
        return view('manage.studysession.index', $this->data);
    }

    public function deleteSchedule($id)
    {
        Schedule::find($id)->delete();
        return ['status' => 1];
    }

    public function deleteStudySession($id){
        StudySession::find($id)->delete();
        return ['status' => 1];
    }

    public function schedules()
    {
        $schedules = Schedule::orderBy('created_at', 'desc')->get();
        return [
            'status' => 1,
            'schedules' => $schedules->map(function ($s) {
                $sessionsStr = "";
                foreach ($s->studySessions as $session) {
                    $sessionsStr .= $session->weekday . ": " . date("G:i", strtotime($session->start_time)) . "-" . date("G:i", strtotime($session->end_time)) . "<br/>";
                }
                return [
                    'id' => $s->id,
                    'name' => $s->name,
                    'description' => $s->description,
                    'sessions_str' => $sessionsStr
                ];
            })];
    }

    public function createSchedule(Request $request)
    {
        $schedule = new Schedule();
        $schedule->name = $request->name;
        $schedule->description = $request->description;
        $schedule->save();

        $studySessionIds = explode(",", $request->study_session_ids);
        foreach ($studySessionIds as $id) {
            $schedule->studySessions()->attach($id);
        }
        return ['id' => $schedule->id, 'status' => 1];
    }

    public function getStudySessions()
    {
        $sessions = StudySession::orderBy("created_at", 'desc')->get();
        return ['study_sessions' => $sessions->map(function ($s) {
            return [
                'id' => $s->id,
                'start_time' => date("G:i", strtotime($s->start_time)),
                'end_time' => date("G:i", strtotime($s->end_time)),
                'weekday' => $s->weekday,
                'selected' => false
            ];
        })];
    }

    public function createStudySession(Request $request)
    {
        $start_time = strtotime($request->start_time);
        $end_time = strtotime($request->end_time);
        $weekday = $request->weekday;
        $studySession = new StudySession();
        $studySession->start_time = format_time_to_mysql($start_time);
        $studySession->end_time = format_time_to_mysql($end_time);
        $studySession->weekday = $weekday;
        $studySession->save();
        return ['status' => 1, 'id' => $studySession->id];
    }

}
