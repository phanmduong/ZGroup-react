<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\CourseTransformer;
use App\Course;
use App\Lesson;
use App\Link;

class ResourceApiController extends ApiController
{
    protected $courseTransformer;

    public function __construct(CourseTransformer $courseTransformer)
    {
        parent::__construct();
        $this->courseTransformer = $courseTransformer;
    }

    public function lesson($lesson_id)
    {
        $lesson = Lesson::find($lesson_id);

        return $this->respond([
            "name" => $lesson->name,
            "detail" => $lesson->detail_content,
            "order" => $lesson->order,
            "id" => $lesson->id,
            "image_url" => $lesson->image_url,
        ]);
    }

    public function links($linkId)
    {
        $courses = Course::all();
        $course = $courses->filter(function ($c) use ($linkId) {
            return convert_vi_to_en($c->name) == $linkId;
        })->first();
        $links = $course->links->map(function ($item) {
            return [
                'name' => $item->link_name,
                'description' => $item->link_description,
                'url' => (strpos($item->link_url, "http") !== false) ? $item->link_url : '//' . $item->link_url
            ];
        });
        return $this->respond($links);
    }

    public function paid_courses()
    {
        if ($this->user->role == 0) {
            $courses = $this->user->registers()->where('status', 1)->get()->map(function ($register) {
                return [
                    "id" => $register->studyClass->course->id,
                    "name" => $register->studyClass->course->name,
                    "linkId" => convert_vi_to_en($register->studyClass->course->name),
                    "icon_url" => $register->studyClass->course->icon_url,
                    "duration" => $register->studyClass->course->duration,
                    "image_url" => $register->studyClass->course->image_url,
                    "lessons" => $register->studyClass->course->lessons()->orderBy('order')->get()->map(function ($lesson) {
                        return [
                            "order" => $lesson->order,
                            "id" => $lesson->id,
                            "name" => $lesson->name
                        ];
                    })
                ];
            });
            return $this->respond($courses->unique('id')->values());
        } else {
            return $this->respond(Course::where('status', 1)->get()->map(function ($course) {
                return [
                    "id" => $course->id,
                    "name" => $course->name,
                    "linkId" => convert_vi_to_en($course->name),
                    "icon_url" => $course->icon_url,
                    "duration" => $course->duration,
                    "image_url" => $course->image_url,
                    "lessons" => $course->lessons()->orderBy('order')->get()->map(function ($lesson) {
                        return [
                            "order" => $lesson->order,
                            "id" => $lesson->id,
                            "name" => $lesson->name
                        ];
                    })
                ];
            }));
        }
    }
}
