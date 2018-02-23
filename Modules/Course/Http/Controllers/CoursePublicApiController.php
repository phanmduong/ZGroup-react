<?php

namespace Modules\Course\Http\Controllers;

use App\Attendance;
use App\ClassLesson;
use App\Course;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Lesson;
use App\Link;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Base\Http\Controllers\PublicApiController;

class CourseController extends PublicApiController
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
}
