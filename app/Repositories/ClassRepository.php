<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 13:13
 */

namespace App\Repositories;


use App\StudyClass;

class ClassRepository
{
    protected $genRepository;
    protected $courseRepository;
    protected $attendancesRepository;

    public function __construct(GenRepository $genRepository, CourseRepository $courseRepository, UserRepository $userRepository, AttendancesRepository $attendancesRepository)
    {
        $this->genRepository = $genRepository;
        $this->courseRepository = $courseRepository;
        $this->userRepository = $userRepository;
        $this->attendancesRepository = $attendancesRepository;
    }

    public function get_class($class)
    {
        $data = [
            'id' => $class->id,
            'name' => $class->name,
            'datestart' => format_date($class->datestart),
            'study_time' => $class->study_time,
            'status' => $class->status,
            'activated' => $class->activated,
            'total_register' => $class->registers()->count(),
            'regis_target' => $class->regis_target,
        ];

        $teacher = $this->userRepository->user($class->teach);
        $teacher_assistant = $this->userRepository->user($class->assist);
        $gen = $this->genRepository->gen($class->gen);
        $course = $this->courseRepository->course($class->course);

        if ($gen)
            $data['gen'] = $gen;

        if ($course)
            $data['course'] = $course;

        if ($teacher)
            $data['teacher'] = $teacher;

        if ($teacher_assistant)
            $data['teacher_assistant'] = $teacher_assistant;

        if ($class->registers()->count() <= 0) {
            $data['is_delete'] = true;
        } else {
            $data['is_delete'] = false;
        }

        return $data;
    }

    public function change_status($class_id)
    {
        if ($class_id != null) {
            $class = StudyClass::find($class_id);
            $class->status = ($class->status == 1) ? 0 : 1;
            $class->save();
            return $class;
        }
    }

    public function get_student($class)
    {
        if ($class) {

            $registers = $class->registers->map(function ($register) {
                return [
                    'id' => $register->id,
                    'student' => $this->userRepository->student($register->user),
                    'total_attendances' => $this->attendancesRepository->get_total_attendances($register),
                    'attendances'=>$this->attendancesRepository->get_attendances($register)
                ];
            });

            return $registers;
        }
    }
}