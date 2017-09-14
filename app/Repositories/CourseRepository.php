<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/8/17
 * Time: 23:36
 */

namespace App\Repositories;


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
}