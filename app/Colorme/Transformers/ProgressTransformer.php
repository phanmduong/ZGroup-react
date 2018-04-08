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
            'class_id' => "Lớp " . $register->studyClass->id,
            'description' => $register->studyClass->description,
            'study_time' => $register->studyClass->study_time,
            'icon_url' => $register->studyClass->course->icon_url,
            "room" => $register->studyClass->room->name,
            "base" => $register->studyClass->base->address,
            "time" => $times,
            'attendances' => $attendances
        ];

        if ($register->studyClass->teach) {
            $data['teach'] = [
                'name' => $register->studyClass->teach->name,
                'id' => $register->studyClass->teach->id
            ];
        }

        if ($register->studyClass->assist) {
            $data['assist'] = [
                'name' => $register->studyClass->assist->name,
                'id' => $register->studyClass->assist->id
            ];
        }

        return $data;
    }
}