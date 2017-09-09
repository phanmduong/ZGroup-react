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
                ];
            });
            return $data;
        }
    }
}