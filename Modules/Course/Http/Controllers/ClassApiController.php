<?php

namespace Modules\Course\Http\Controllers;

use App\Gen;
use App\Http\Controllers\ApiController;
use App\StudyClass;
use Illuminate\Http\Request;

class ClassApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function genClasses($genId, Request $request)
    {
        if (Gen::find($genId) == null)
            return $this->respondErrorWithStatus([
                'message' => 'Khong ton tai khoa hoc'
            ]);
        $classes = Gen::find($genId)->studyclasses()->orderBy('name', 'asc')->get();
        return $this->respondSuccessWithStatus([
            'classes' => $classes->map(function ($class) {
                $data = [
                    'id' => $class->id,
                    'name' => $class->name,
                    'activated' => $class->activated,
                    'study_time' => $class->study_time,
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

}
