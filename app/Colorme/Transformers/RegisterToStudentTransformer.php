<?php

namespace App\Colorme\Transformers;

use App\TopicAttendance;

/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 7/30/16
 * Time: 18:03
 */
class RegisterToStudentTransformer extends Transformer
{
    protected $attendanceTransformer;

    public function __construct(AttendanceTransformer $attendanceTransformer)
    {
        $this->attendanceTransformer = $attendanceTransformer;
    }

    public function transform($register)
    {
        $student = $register->user;

        $data = [
            "code" => $register->code,
            "name" => $student->name,
            "email" => $student->email,
            "avatar_url" => $student->avatar_url ? $student->avatar_url : url('img/user.png'),
            "phone" => $student->phone,
            "money" => $register->money,
            "status" => $register->status,
            "received_id_card" => $register->received_id_card,
            "url" => url('profile/' . get_first_part_of_email($student->email)),
            'products_count' => $student->products()->count(),
            "attendances" => $this->attendanceTransformer->transformCollection($register->attendances)
        ];


        $class = $register->studyClass;
        if ($class->group) {
            $data['max_score'] = $class->group->topics->reduce(function ($sum, $item) {
                return $sum + $item->weight;
            }, 0);
        } else {
            $data['max_score'] = 0;
        }

        $data['score'] = $class->group->topics->reduce(function ($sum, $topic) use ($student) {
            $topicAttend = TopicAttendance::where('topic_id', $topic->id)->where('user_id', $student->id)->first();
            if ($topicAttend && $topicAttend->product) {
                return $sum + $topic->weight;
            } else {
                return $sum;
            }
        }, 0);

        return $data;
    }
}