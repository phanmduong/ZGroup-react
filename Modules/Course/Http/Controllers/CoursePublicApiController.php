<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Base\Http\Controllers\PublicApiController;
use Illuminate\Support\Facades\DB;

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
}
