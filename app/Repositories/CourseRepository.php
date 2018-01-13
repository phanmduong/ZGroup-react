<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/8/17
 * Time: 23:36
 */

namespace App\Repositories;


use App\Course;

class CourseRepository
{
    public function course($course)
    {
        if ($course)
            return [
                'id' => $course->id,
                'name' => $course->name,
                'icon_url' => $course->icon_url,
            ];
    }

    public function courses($courses)
    {
        if ($courses) {
            return $courses->map(function ($course) {
                return $this->course($course);
            });
        }
    }

    public function paid_courses($user)
    {
        if ($user && $user->role == 0) {
            $courses = $user->registers()->where('status', 1)->whereNotNull('class_id')->get()->map(function ($register) {
                $data = [
                    "id" => $register->studyClass->course->id,
                    "name" => $register->studyClass->course->name,
                    "linkId" => convert_vi_to_en($register->studyClass->course->name),
                    "icon_url" => $register->studyClass->course->icon_url,
                    "duration" => $register->studyClass->course->duration,
                    "image_url" => $register->studyClass->course->image_url,
                    "first_lesson" => $register->studyClass->course->lessons()->orderBy('order')->first()
                ];
                return $data;
            });
        } else {
            $courses = Course::where('status', 1)->get()->map(function ($course) {
                $data = [
                    "id" => $course->id,
                    "name" => $course->name,
                    "linkId" => convert_vi_to_en($course->name),
                    "icon_url" => $course->icon_url,
                    "duration" => $course->duration,
                    "image_url" => $course->image_url,
                    "first_lesson" => $course->lessons()->orderBy('order')->first()
                ];
                return $data;
            });
        }
        return $courses;
    }
}