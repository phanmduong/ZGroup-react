<?php

namespace Modules\Course\Http\Controllers;

use App\Base;
use App\Gen;
use App\Http\Controllers\ApiController;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;

class ClassApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function genClasses($genId, Request $request)
    {
        if (Gen::find($genId) != null) {
            $classes = Gen::find($genId)->studyclasses();
        } else {
            $classes = StudyClass::query();
        }

        $classes = $classes->orderBy('name', 'asc')->get();
        return $this->respondSuccessWithStatus([
            'classes' => $classes->map(function ($class) {
                $data = [
                    'id' => $class->id,
                    'name' => $class->name,
                    'activated' => $class->activated,
                    'study_time' => $class->study_time,
                    'type' => $class->type,
                    'base_id' => $class->base_id,
                ];
                if ($class->course)
                    $data['course'] = [
                    'id' => $class->course->id,
                    'icon_url' => $class->course->icon_url,
                    'name' => $class->course->name,
                ];
                if ($class->teach)
                    $data['teacher'] = [
                    'id' => $class->teach ? $class->teach->id : null,
                    'name' => $class->teach ? $class->teach->name : null,
                    'email' => $class->teach ? $class->teach->email : null,
                ];
                if ($class->assist)
                    $data['teaching_assistant'] = [
                    'id' => $class->assist->id,
                    'name' => $class->assist->name,
                    'email' => $class->assist->email,
                ];
                return $data;
            })
        ]);
    }

    public function classLessons($classId, Request $request)
    {
        if (StudyClass::find($classId) == null)
            return $this->respondErrorWithStatus([
            'message' => 'Khong ton tai lop hoc'
        ]);
        $classLessons = StudyClass::find($classId)->classLessons()->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            'class_lessons' => $classLessons->map(function ($classLesson) {
                $attended_students = $classLesson->attendances()->where('status', 1)->count();
                $total_students = $classLesson->attendances()->count();
                return [
                    'id' => $classLesson->id,
                    'name' => $classLesson->name,
                    'order' => $classLesson->lesson ? $classLesson->lesson->order : null,
                    'total_students' => $total_students,
                    'attended_students' => $attended_students,
                ];
            })
        ]);
    }

    public function getAllTeacher(Request $request)
    {
        if ($request->gen_id) {
            $gen = Gen::find($request->gen_id);
        } else {
            $gen = Gen::getCurrentGen();
        }

        $teacher_ids = $gen->studyclasses()->groupBy('teacher_id')->pluck('teacher_id')->toArray();
        $teachers = User::whereIn('id', $teacher_ids)->orderBy('name', 'asc')->get();
        $data["gen"] = [
            "id" => $gen->id,
            "name" => $gen->name,
            "description" => $gen->description,
            "start_time" => $gen->start_time,
            "end_time" => $gen->end_time,
        ];
        $data['teachers'] = $teachers->map(function ($teacher) {
            $classes = $teacher->teach()->orderBy('name', 'asc')->get();
            return [
                "teacher" => [
                    "id" => $teacher->id,
                    "name" => $teacher->name,
                    "email" => $teacher->email,
                ],
                "classes" => $classes->map(function ($class) {
                    $classLessons = $class->classLessons()->orderBy('created_at', 'desc')->get();
                    return [
                        "id" => $class->id,
                        "name" => $class->name,
                        "description" => $class->description,
                        "lesson" => $classLessons->map(function ($classLesson) {
                            $attended_students = $classLesson->attendances()->where('status', 1)->count();
                            $total_students = $classLesson->attendances()->count();
                            return [
                                "id" => $classLesson->id,
                                "attended_student" => $attended_students,
                                "total_students" => $total_students,
                            ];
                        }),
                    ];
                }),
            ];
        });

        return $this->respondSuccessWithStatus([
            "data" => $data,
        ]);
    }

    public function getClasses($courseId, Request $request)
    {
        $request->gen_id = $request->gen_id ? $request->gen_id : Gen::getCurrentGen()->id;
        $classes = StudyClass::where('gen_id', $request->gen_id)->where('course_id', $courseId);
        if ($request->base_id)
            $classes = $classes->where('base_id', $request->base_id);

        $classes = $classes->orderBy('datestart', 'asc')->get();
        return $this->respondSuccessWithStatus([
            'classes' => $classes->map(function ($class) {
                return [
                    'base' => $class->base(),
                    'id' => $class->id,
                    'name' => $class->name,
                    'study_time' => $class->study_time,
                    'date_start' => $class->datestart,
                    'status' => $class->status,
                    'study_time' => $class->study_time,
                    'icon_url' => $class->course ? $class->course->icon_url : '',
                    'teacher' => $class->teach ? $class->teach->transformAuth() : [],
                    'teaching_assistant' => $class->assist ? $class->assist->transformAuth() : [],
                    'course' => $class->course ? $class->course->shortTransform() : []
                ];
            })
        ]);
    }
}
