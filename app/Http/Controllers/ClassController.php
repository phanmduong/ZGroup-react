<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 6/18/16
 * Time: 16:55
 */

namespace App\Http\Controllers;


use App\Register;
use App\StudyClass;
use App\TopicAttendance;

class ClassController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 9;
    }

    public function students($classId)
    {
        $class = StudyClass::find($classId);
        $registers = $class->registers;

        $students = array();
        foreach ($registers as $register) {
            $student = $register->user;
            $student->status = $register->status;
            $student->certificate = $register->certificate;
            $student->hw_done = $register->hw_done;
            $student->money = $register->money;
            $student->code = $register->code;
            $student->received_id_card = $register->received_id_card;
            $student->total_attendances = $register->total_attendances;
            $student->score = $class->group->topics->reduce(function ($sum, $topic) use ($student) {
                $topicAttend = TopicAttendance::where('topic_id', $topic->id)->where('user_id', $student->id)->first();
                if ($topicAttend && $topicAttend->product) {
                    return $sum + $topic->weight;
                } else {
                    return $sum;
                }
            }, 0);

            $students[] = $student;
        }

        $this->data['class'] = $class;
        if ($class->group) {
            $this->data['max_score'] = $class->group->topics->reduce(function ($sum, $item) {
                return $sum + $item->weight;
            }, 0);
        } else {
            $this->data['max_score'] = 0;
        }

        $this->data['students'] = $students;

        return view('manage.class.students', $this->data);
    }

    public function compute_certificate($classId)
    {
        $class = StudyClass::find($classId);
        $registers = Register::where('class_id', $classId)->get();
        $count_lessons = $class->course->lessons()->count();

        $topics = $class->group->topics;


        $total_weight = $topics->reduce(function ($carry, $item) {
            return $carry + $item->weight;
        }, 0);

        foreach ($registers as $register) {
            $personal_weight = 0;
            $count_attendances = $register->attendances()->where('status', 1)->count();
            $ratio_attendances = $count_attendances / $count_lessons;
            foreach ($topics as $topic) {

                $topicAttendance = TopicAttendance::where('topic_id', $topic->id)
                    ->where('user_id', $register->user_id)->where('product_id', '!=', 'null')
                    ->first();
                if ($topicAttendance) {
                    $personal_weight += $topic->weight;
                }
            }
            if ($total_weight != 0) {
                $ratio_weight = $personal_weight / $total_weight;
                if ($ratio_weight >= 0.7 && $ratio_attendances >= 0.7) {
                    $register->certificate = "Giỏi";
                } else if ($ratio_weight >= 0.6 && $ratio_attendances >= 0.5) {
                    $register->certificate = "Khá";
                } else {
                    $register->certificate = "Không đạt tiêu chuẩn";
                }
            } else {
                $register->certificate = "Không đạt tiêu chuẩn";
            }
            $register->hw_done = $personal_weight;
            $register->total_attendances = $count_attendances;

            $register->save();
        }
        return redirect("classes/" . $classId . "/students");
    }
}