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
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

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
                    'status' => $attendance->status,
                    'homework_status' => $attendance->hw_status,
                    'note' => $attendance->note ? $attendance->note : ""
                ];
            });
            return $data;
        }
    }


    public function get_attendances_class_lessons($class_lessons)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) {
                $data_class_lesson = [
                    'order' => $class_lesson->lesson->order,
                    'total_attendance' => $class_lesson->attendances()->where('status', 1)->count(),
                    'is_change' => is_class_lesson_change($class_lesson),
                    'class_lesson_time' => $class_lesson->time,
                    'class_lesson_id' => $class_lesson->id,
                ];
                return $data_class_lesson;
            });
            return $data;
        }
    }

    public function attendances_teacher_class_lesson($class_lessons)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) {

                return $this->attendance_teacher_class_lesson($class_lesson);
            });
            return $data;
        }
    }

    public function attendance_teacher_class_lesson($class_lesson)
    {
        $attendance = $class_lesson->teachingLesson()->first();
        $data_attendance = [
            'class_lesson_id' => $class_lesson->id,
            'order' => $class_lesson->lesson ? $class_lesson->lesson->order : 0,
            'start_teaching_time' => $class_lesson->start_time,
            'end_teaching_time' => $class_lesson->end_time,
            'is_change' => is_class_lesson_change($class_lesson)
        ];

        if ($attendance) {
            $data_attendance['staff'] = $this->userRepository->staff($attendance->teacher);
        }

        if ($attendance && $attendance->teacher_check_in) {
            $data_attendance['attendance']['check_in_time'] = format_time_shift(strtotime($attendance->teacher_check_in->created_at));
        }

        if ($attendance && $attendance->teacher_check_out) {
            $data_attendance['attendance']['check_out_time'] = format_time_shift(strtotime($attendance->teacher_check_out->created_at));
        }

        return $data_attendance;
    }

    public function attendances_ta_class_lesson($class_lessons)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) {
                return $this->attendance_ta_class_lesson($class_lesson);
            });
            return $data;
        }
    }

    public function attendance_ta_class_lesson($class_lesson)
    {
        $attendance = $class_lesson->teachingLesson()->first();
        $data_attendance = [
            'class_lesson_id' => $class_lesson->id,
            'order' => $class_lesson->lesson ? $class_lesson->lesson->order : 0,
            'start_teaching_time' => $class_lesson->start_time,
            'end_teaching_time' => $class_lesson->end_time,
            'is_change' => is_class_lesson_change($class_lesson)
        ];

        if ($attendance) {
            $data_attendance['staff'] = $this->userRepository->staff($attendance->teaching_assistant);
        }

        if ($attendance && $attendance->ta_check_in) {
            $data_attendance['attendance']['check_in_time'] = format_time_shift(strtotime($attendance->ta_check_in->created_at));
        }

        if ($attendance && $attendance->ta_check_out) {
            $data_attendance['attendance']['check_out_time'] = format_time_shift(strtotime($attendance->ta_check_out->created_at));
        }
        return $data_attendance;
    }
}