<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/1/17
 * Time: 17:02
 */

namespace App\Http\Controllers;


use App\User;

class ManageStudentApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function get_info_student($studentId)
    {
        $student = User::find($studentId);
        return $this->respondSuccessWithStatus([
            'student' => $student
        ]);
    }

    public function get_registers($studentId)
    {
        $student = User::find($studentId);

        $registers = $student->registers()->orderBy('created_at', 'desc')->get();

        $registers = $registers->map(function ($register) {
            $data = [];
            $class = $register->studyClass()->first();

            $data['class'] = [
                'id' => $class->id,
                'name' => $class->name,
                'avatar_url' => $class->course->icon_url,
                "study_time" => $class->study_time,
                "description" => $class->description,
                "room" => $class->room->name,
                "base" => $class->base->address
            ];

            if ($register->saler) {
                $data['saler'] = [
                    'id' => $register->saler->id,
                    'name' => $register->saler->name,
                    'color' => $register->saler->color
                ];
            }

            if ($register->marketing_campaign) {
                $data["campaign"] = [
                    'id' => $register->marketing_campaign->id,
                    'name' => $register->marketing_campaign->name,
                    "color" => $register->marketing_campaign->color
                ];
            }

            return $data;
        });
        return $this->respondSuccessWithStatus([
            'registers' => $registers
        ]);
    }

    public function history_calls($studentId)
    {
        $student = User::find($studentId);

        $history_calls = $student->is_called->map(function ($item) {
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
            'history_calls' => $history_calls,
        ]);
    }
}