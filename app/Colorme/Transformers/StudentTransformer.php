<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class StudentTransformer extends Transformer
{
    protected $registerTransformer;

    public function __construct(RegisterGetMoneyTransformer $registerTransformer)
    {
        $this->registerTransformer = $registerTransformer;
    }

    public function transform($student)
    {
        $courses = $student->registers->map(function ($register) {
            $data = [
                'class_name' => $register->studyClass->name,
                'course_name' => $register->studyClass->course->name,
                'avatar_url' => $register->studyClass->course->icon_url,
                'link' => "/course/" . convert_vi_to_en($register->studyClass->course->name)
            ];
            if ($register->saler) {
                $data['saler_name'] = $register->saler->name;
            }
            return $data;
        });
        $filtered_courses = [];
        $filtered_courses_link = [];
        foreach ($courses as $course) {
            if (!in_array($course['link'], $filtered_courses_link)) {
                $filtered_courses[] = $course;
                $filtered_courses_link[] = $course['link'];
            }
        }
        return [
            'id' => $student->id,
            "name" => $student->name,
            "email" => $student->email,
            'phone' => $student->phone,
            'university' => $student->university,
            'work' => $student->work,
            'avatar_url' => $student->avatar_url ? $student->avatar_url : "http://d1j8r0kxyu9tj8.cloudfront.net/webs/user.png",
            'link' => '/profile/' . $student->username,
            'registers' => $filtered_courses
        ];
    }
}