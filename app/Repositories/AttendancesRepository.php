<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 21:07
 */

namespace App\Repositories;


class AttendancesRepository
{
    public function get_total_attendances($register)
    {
        if ($register) {
            return $register->attendances->where('status', 1)->count();
        }
    }

    public function get_attendances($register){
        if ($register){
            $data = $register->attendances->map(function ($attendance){
                return [
                    'id' => $attendance->id,
                    'status' => $attendance->status
                ];
            });
            return $data;
        }
    }

    public function get_attendances_class_lessons($class_lessons){
        if ($class_lessons){
            $data = $class_lessons->map(function ($class_lesson){
                    return [
                        'order'=>$class_lesson->order,
                        'total_attendance'=> $class_lesson->attendances()->where('status',1)->count()
                    ];
            });
            return $data;
        }
    }
}