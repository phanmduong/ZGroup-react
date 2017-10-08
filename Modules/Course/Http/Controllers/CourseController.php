<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CourseController extends ManageApiController
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

    public function createOrEdit(Request $request)
    {
        if($request->id)
            $course = Course::find($request->id);
        else
            $course = new Course;
        if($request->name == null)
            return $this->respondErrorWithStatus(["message" => "Thiếu name"]);
        $course->name = $request->name;
        $course->duration = $request->duration;
        $course->price = $request->price;
        $course->description = $request->price;
        $course->linkmac = $request->linkmac;
        $course->linkwindow = $request->linkwindow;
        $course->mac_how_install = $request->mac_how_install;
        $course->window_how_install = $request->window_how_install;
        $course->cover_url = $request->cover_url;
        $course->color = $request->color;
        $course->image_url = $request->image_url;
        $course->icon_url = $request->icon_url;
        $course->detail = $request->detail;
        $course->save();
        return $this->respondSuccessWithStatus(["message" => "Tạo/sửa thành công"]);
    }

    public function getAllCourses(Request $request){
        $keyword = $request->search;
        $courses= Course::where(function ($query) use ($keyword){
            $query->where("name","like","%$keyword%")->orWhere("price","like","%$keyword%");
        })->paginate(20);
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
            return $this->respondErrorWithStatus(['message'=>"Khóa học không tồn tại"]);
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
