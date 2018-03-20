<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/30/17
 * Time: 14:23
 */

namespace App\Http\Controllers;


use App\StudySession;
use Illuminate\Http\Request;

class ManageStudySessionApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_study_session()
    {
        $sessions = StudySession::orderBy("created_at", 'desc')->get();
        $data = ['study_sessions' => $sessions->map(function ($s) {
            return [
                'id' => $s->id,
                'start_time' => date("G:i", strtotime($s->start_time)),
                'end_time' => date("G:i", strtotime($s->end_time)),
                'weekday' => $s->weekday,
                'selected' => false
            ];
        })];

        return $this->respondSuccessWithStatus($data);
    }

    public function add_study_session(Request $request)
    {

        $data = new StudySession();
        $data->start_time = $request->start_time;
        $data->end_time = $request->end_time;
        $data->weekday = $request->weekday;
        if (is_exist_study_session($data)) {
            return $this->respondErrorWithStatus('Ca học đã tồn tại');
        }

        $start_time = strtotime($request->start_time);
        $end_time = strtotime($request->end_time);
        $weekday = $request->weekday;
        $studySession = new StudySession();
        $studySession->start_time = format_time_to_mysql($start_time);
        $studySession->end_time = format_time_to_mysql($end_time);
        $studySession->weekday = $weekday;
        $studySession->save();

        return $this->respondSuccessWithStatus([
            'study_session' => [
                'id' => $studySession->id,
                'start_time' => date("G:i", strtotime($studySession->start_time)),
                'end_time' => date("G:i", strtotime($studySession->end_time)),
                'weekday' => $studySession->weekday,
            ]
        ]);
    }

    public function delete_study_session(Request $request)
    {
        $studySession = StudySession::where('id', $request->id)->first();
        $studySession->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Xóa thành công'
        ]);
    }

    public function edit_study_session($studySessionId, Request $request)
    {
        $data = new StudySession();
        $data->start_time = $request->start_time;
        $data->end_time = $request->end_time;
        $data->weekday = $request->weekday;
        if (is_exist_study_session($data)) {
            return $this->respondErrorWithStatus('Ca học đã tồn tại');
        }
        $studySession = StudySession::find($studySessionId);
        $start_time = strtotime($request->start_time);
        $end_time = strtotime($request->end_time);
        $weekday = $request->weekday;
        $studySession->start_time = format_time_to_mysql($start_time);
        $studySession->end_time = format_time_to_mysql($end_time);
        $studySession->weekday = $weekday;
        $studySession->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Cập nhật thành công'
        ]);

    }


}