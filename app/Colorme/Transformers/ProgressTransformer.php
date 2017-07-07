<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class ProgressTransformer extends Transformer
{

    public function __construct()
    {
    }

    public function transform($register)
    {
        $course_ids = $register->studyClass->course->classes()->where('name', 'like', '%.%')->pluck('id');
        $items = $register->user->registers()->where('status', 1)->whereIn('class_id', $course_ids)->orderBy('created_at')->get();
        $times = 0;

        foreach ($items as $item) {
            $times += 1;
            if ($item->id == $register->id) {
                break;
            }
        }

        $attendances = $register->attendances->map(function ($attendance) use ($register) {
//            if (time() > $attendance->classLesson->time) {
//                $status = 1;
//                if ($attendance->status == 0) {
//                    $status = -100;
//                }
//                return [
//                    'order' => $attendance->classLesson->lesson->order,
//                    'status' => $status
//                ];
//            } else {
            return [
                'order' => $attendance->classLesson->lesson->order,
                'status' => $attendance->status
            ];
//            }
        })->sortBy('order')->values()->all();

        $data = [
            'id' => $register->id,
            'code' => $register->code,
            'name' => "Lớp " . $register->studyClass->name,
            'description' => $register->studyClass->description,
            'study_time' => $register->studyClass->study_time,
            'icon_url' => $register->studyClass->course->icon_url,
            "time" => $times,
            'attendances' => $attendances
        ];
        return $data;
    }
}