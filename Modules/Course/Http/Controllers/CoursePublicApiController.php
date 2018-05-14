<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Base\Http\Controllers\PublicApiController;
use Illuminate\Support\Facades\DB;
use App\Gen;
use App\StudyClass;

class CoursePublicApiController extends PublicApiController
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function getCourse($course_id)
    {
        $course = Course::find($course_id);
        return $this->respondSuccessWithStatus([
            "course" => $course->detailedTransform()
        ]);
    }

    public function getAllCourses(Request $request)
    {
        if (!$request->limit)
            $limit = 20;
        else
            $limit = $request->limit;
        $keyword = $request->search;
        $courses = Course::where(function ($query) use ($keyword) {
            $query->where("name", "like", "%$keyword%")->orWhere("price", "like", "%$keyword%");
        })->paginate($limit);
        return $this->respondWithPagination(
            $courses,
            [
                "courses" => $courses->map(function ($course) {
                    return $course->transform();
                })
            ]
        );
    }

    public function getAllCoursesApp(Request $request)
    {
        if (!$request->limit)
            $limit = 20;
        else
            $limit = $request->limit;
        $keyword = $request->search;
        $courses = Course::leftJoin('classes', 'classes.course_id', '=', 'courses.id')
            ->leftJoin('registers', 'registers.class_id', '=', 'classes.id')
            ->groupBy('courses.id')
            ->select('courses.*', DB::raw('count(distinct classes.id) as classes_count'), DB::raw('count(registers.status = 1) as registers_count'));

        $courses = $courses->where(function ($query) use ($keyword) {
            $query->where("courses.name", "like", "%$keyword%")->orWhere("courses.price", "like", "%$keyword%");
        });
        
        $courses = $courses->paginate($limit);

        return $this->respondWithPagination(
            $courses,
            [
                "courses" => $courses->map(function ($course) {
                    $data = $course->transform();
                    $data['classes_count'] = $course->classes_count;
                    $data['registers_count'] = $course->registers_count;
                    return $data;
                })
            ]
        );
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
                    'id' => $class->id,
                    'name' => $class->name,
                    'base' => $class->base ? $class->base->transform() : [],
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
