<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CourseController extends ManageApiController
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function getCourse($course_id)
    {
        $course = Course::find($course_id);
        return $request->respondSuccessWithStatus([
            "course" => $course->detailedTransform()
        ]);
    }

    public function createOrEditCourse(Request $request)
    {
        //$course = Course::firstOrNew(['id' => $request->id]);
        if($request->id)
            $course = Course::find($request->id);
        else
            $course = new Course;
        if($course->name == null)
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

    public function index()
    {
        return view('course::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('course::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('course::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('course::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
