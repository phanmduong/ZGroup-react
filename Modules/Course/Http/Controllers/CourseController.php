<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class CourseController extends ManageApiController
{
    public function __construct()
    {

        parent::__construct();

    }
    public function getCourse(Request $request){
        $keyword = $request->search;
        $courses= Course::where(function ($query) use ($keyword){
            $query->where("name","like","%$keyword%")->orWhere("price","like","%$keyword%");
        })->orderBy("created_at","desc")->paginate(20);
        return $this->respondWithPagination(
            $courses,
            [
                "courses" => $courses->map(function ($course) {
                    return $course->transform();
                })
            ]
        );
    }
    public function deleteCourse($course_id,Request $request){
        $course= Course::find($course_id);
        if($course==null){
            return $this->respondErrorWithStatus("Khóa học không tồn tại");
        }
        $classes= $course->classes();
        $course->delete();
        foreach($classes as $class){
            $class->delete();
        }
        return $this->respondSuccessWithStatus([
            'message'=>" Xóa thành công"
        ]);
    }

}
