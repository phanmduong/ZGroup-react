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

    public function get_attendances($register)
    {
        if ($register) {
            $data = $register->attendances->map(function ($attendance) {
                return [
                    'id' => $attendance->id,
                    'status' => $attendance->status
                ];
            });
            return $data;
        }
    }

    public function get_attendances_class_lessons($class_lessons)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) {
                return [
                    'order' => $class_lesson->order,
                    'total_attendance' => $class_lesson->attendances()->where('status', 1)->count()
                ];
            });
            return $data;
        }
    }

    public function attendances_teacher_class_lesson($class_lessons, $teacher_id)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) use ($teacher_id) {
                $attendance = $class_lesson->teachingLesson()->where('teacher_id', $teacher_id)->first();
                $data_attendance = [
                    'order' => $class_lesson->order,
                    'start_teaching_time' => $class_lesson->start_time,
                    'end_teaching_time' => $class_lesson->end_time,
                ];

                if ($attendance && $attendance->teacher_check_in) {
                    $data_attendance['attendance']['check_in_time'] = format_time_only_mysql(strtotime($attendance->teacher_check_in->created_at));
                }

                if ($attendance && $attendance->teacher_check_out) {
                    $data_attendance['attendance']['check_out_time'] = format_time_only_mysql(strtotime($attendance->teacher_check_out->created_at));
                }
                return $data_attendance;
            });
            return $data;
        }
    }

    public function attendances_ta_class_lesson($class_lessons, $ta_id)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) use ($ta_id) {
                $attendance = $class_lesson->teachingLesson()->where('teaching_assistant_id', $ta_id)->first();
                $data_attendance = [
                    'order' => $class_lesson->order,
                    'start_teaching_time' => $class_lesson->start_time,
                    'end_teaching_time' => $class_lesson->end_time,
                ];

                if ($attendance && $attendance->ta_check_in) {
                    $data_attendance['attendance']['check_in_time'] = format_time_only_mysql(strtotime($attendance->ta_check_in->created_at));
                }

                if ($attendance && $attendance->ta_check_out) {
                    $data_attendance['attendance']['check_out_time'] = format_time_only_mysql(strtotime($attendance->ta_check_out->created_at));
                }
                return $data_attendance;
            });
            return $data;
        }
    }
}