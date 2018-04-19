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
                $data_attendance = [
                    'class_lesson_id' => $class_lesson->id,
                    'order' => $class_lesson->lesson ? $class_lesson->lesson->order : 0,
                    'start_teaching_time' => $class_lesson->start_time,
                    'end_teaching_time' => $class_lesson->end_time,
                    'is_change' => is_class_lesson_change($class_lesson)
                ];

                $attendance = $class_lesson->teachingLesson()->whereNull('class_position_id')->first();

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
            });
            return $data;
        }
    }

    public function attendance_teacher_class_lesson($class_lesson)
    {

        $data_attendances = array();

        $data_attendance = [
            'class_lesson_id' => $class_lesson->id,
            'order' => $class_lesson->lesson ? $class_lesson->lesson->order : 0,
            'start_teaching_time' => $class_lesson->start_time,
            'end_teaching_time' => $class_lesson->end_time,
            'is_change' => is_class_lesson_change($class_lesson)
        ];

        $attendance = $class_lesson->teachingLesson()->whereNull('class_position_id')->first();

        if ($attendance) {
            $data_attendance['staff'] = $this->userRepository->staff($attendance->teacher);
        }
        $timenow = new \DateTime();
        $timenow = $timenow->getTimestamp();
        $data_attendance['attendance']['checkin_status'] = "none";
                $data_attendance['attendance']['checkout_status'] = "none";
                $time_start = strtotime($class_lesson->start_time . ' ' .$class_lesson->time);
                $time_end = strtotime($class_lesson->end_time . ' ' .$class_lesson->time);
                if ($timenow > $time_start){
                    $data_attendance['attendance']['checkin_status'] = "absent";
                }
                if ($timenow > $time_end){
                    $data_attendance['attendance']['checkout_status'] = "absent";
                }
                if ($attendance && $attendance->teacher_check_in) {
                    $data_attendance['attendance']['check_in_time'] = format_time_shift(strtotime($attendance->teacher_check_in->created_at));
                    $time_checkin = strtotime($data_attendance['attendance']['check_in_time'] . ' ' .$class_lesson->time);
                    if ($time_checkin <= $time_start){
                        $data_attendance['attendance']['checkin_status'] = "accept";
                    } else {
                        $data_attendance['attendance']['checkin_status'] = "no-accept";
                    }
                }

                if ($attendance && $attendance->teacher_check_out) {
                    $data_attendance['attendance']['check_out_time'] = format_time_shift(strtotime($attendance->teacher_check_out->created_at));
                    $time_checkout = strtotime($data_attendance['attendance']['check_out_time'] . ' ' .$class_lesson->time);
                    if ($time_checkout >= $time_start){
                        $data_attendance['attendance']['checkout_status'] = "accept";
                    } else {
                        $data_attendance['attendance']['checkout_status'] = "no-accept";
                    }
                }

        $data_attendances[] = $data_attendance;

        $attendances = $class_lesson->teachingLesson()->whereNotNull('class_position_id')
            ->join('class_position', 'class_position.id', '=', 'teaching_lessons.class_position_id')
            ->where('class_position.position_id', 1)->get();

//        dd($attendances);
        foreach ($attendances as $atten) {
            $data = [
                'class_lesson_id' => $class_lesson->id,
                'order' => $class_lesson->lesson->order,
                'start_teaching_time' => $class_lesson->start_time,
                'end_teaching_time' => $class_lesson->end_time,
                'is_change' => is_class_lesson_change($class_lesson)
            ];

            if ($atten->staff) {
                $data['staff'] = $this->userRepository->staff($atten->staff);
            }

            if ($atten->check_in) {
                $data['attendance']['check_in_time'] = format_time_shift(strtotime($atten->check_in->created_at));
            }

            if ($atten->check_out) {
                $data['attendance']['check_out_time'] = format_time_shift(strtotime($atten->check_out->created_at));
            }
            $data_attendances[] = $data;

        }

        return $data_attendances;
    }

    public function attendances_ta_class_lesson($class_lessons)
    {
        if ($class_lessons) {
            $data = $class_lessons->map(function ($class_lesson) {
                $data_attendance = [
                    'class_lesson_id' => $class_lesson->id,
                    'order' => $class_lesson->lesson ? $class_lesson->lesson->order : 0,
                    'start_teaching_time' => $class_lesson->start_time,
                    'end_teaching_time' => $class_lesson->end_time,
                    'is_change' => is_class_lesson_change($class_lesson)
                ];

                $attendance = $class_lesson->teachingLesson()->whereNull('class_position_id')->first();

                if ($attendance) {
                    $data_attendance['staff'] = $this->userRepository->staff($attendance->teaching_assistant);
                }

                if ($attendance && $attendance->teacher_check_in) {
                    $data_attendance['attendance']['check_in_time'] = format_time_shift(strtotime($attendance->teacher_check_in->created_at));
                }

                if ($attendance && $attendance->teacher_check_out) {
                    $data_attendance['attendance']['check_out_time'] = format_time_shift(strtotime($attendance->teacher_check_out->created_at));
                }
                return $data_attendance;
            });
            return $data;
        }
    }

    public function attendance_ta_class_lesson($class_lesson)
    {
        $data_attendances = array();

        $data_attendance = [
            'class_lesson_id' => $class_lesson->id,
            'order' => $class_lesson->lesson ? $class_lesson->lesson->order : 0,
            'start_teaching_time' => $class_lesson->start_time,
            'end_teaching_time' => $class_lesson->end_time,
            'is_change' => is_class_lesson_change($class_lesson)
        ];

        $attendance = $class_lesson->teachingLesson()->whereNull('class_position_id')->first();

        if ($attendance) {
            $data_attendance['staff'] = $this->userRepository->staff($attendance->teaching_assistant);
        }

        $timenow = new \DateTime();
        $timenow = $timenow->getTimestamp();
        $data_attendance['attendance']['checkin_status'] = "none";
                $data_attendance['attendance']['checkout_status'] = "none";
                $time_start = strtotime($class_lesson->start_time . ' ' .$class_lesson->time);
                $time_end = strtotime($class_lesson->end_time . ' ' .$class_lesson->time);
                if ($timenow > $time_start){
                    $data_attendance['attendance']['checkin_status'] = "absent";
                }
                if ($timenow > $time_end){
                    $data_attendance['attendance']['checkout_status'] = "absent";
                }

        if ($attendance && $attendance->ta_check_in) {
            $data_attendance['attendance']['check_in_time'] = format_time_shift(strtotime($attendance->ta_check_in->created_at));
            $time_checkin = strtotime($data_attendance['attendance']['check_in_time'] . ' ' .$class_lesson->time);
            if ($time_checkin <= $time_start){
                $data_attendance['attendance']['checkin_status'] = "accept";
            } else {
                $data_attendance['attendance']['checkin_status'] = "no-accept";
            }
        }

        if ($attendance && $attendance->ta_check_out) {
            $data_attendance['attendance']['check_out_time'] = format_time_shift(strtotime($attendance->ta_check_out->created_at));
            $time_checkout = strtotime($data_attendance['attendance']['check_out_time'] . ' ' .$class_lesson->time);
            if ($time_checkout >= $time_start){
                $data_attendance['attendance']['checkout_status'] = "accept";
            } else {
                $data_attendance['attendance']['checkout_status'] = "no-accept";
            }
        }

        $data_attendances[] = $data_attendance;

        $attendances = $class_lesson->teachingLesson()->whereNotNull('class_position_id')
            ->join('class_position', 'class_position.id', '=', 'teaching_lessons.class_position_id')
            ->where('class_position.position_id', 2)->get();

        foreach ($attendances as $atten) {
            $data = [
                'class_lesson_id' => $class_lesson->id,
                'order' => $class_lesson->lesson->order,
                'start_teaching_time' => $class_lesson->start_time,
                'end_teaching_time' => $class_lesson->end_time,
                'is_change' => is_class_lesson_change($class_lesson)
            ];

            if ($atten->staff) {
                $data['staff'] = $this->userRepository->staff($atten->staff);
            }

            if ($atten->check_in) {
                $data['attendance']['check_in_time'] = format_time_shift(strtotime($atten->check_in->created_at));
            }

            if ($atten->check_out) {
                $data['attendance']['check_out_time'] = format_time_shift(strtotime($atten->check_out->created_at));
            }
            $data_attendances[] = $data;

        }

        return $data_attendances;
    }
}