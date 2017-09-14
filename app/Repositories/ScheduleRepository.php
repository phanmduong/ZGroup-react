<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/12/17
 * Time: 21:22
 */

namespace App\Repositories;


class ScheduleRepository
{
    public function schedules($schedules)
    {
        if ($schedules) {
            return $schedules->map(function ($schedule) {
                return $this->schedule($schedule);
            });
        }
    }

    public function schedule($schedule)
    {
        if ($schedule) {
            return [
                'id' => $schedule->id,
                'name' => $schedule->name,
            ];
        }
    }
}