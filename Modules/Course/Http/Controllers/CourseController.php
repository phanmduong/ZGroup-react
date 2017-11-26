<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use App\Http\Controllers\ManageApiController;
use App\Lesson;
use App\Link;
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
        if ($request->id)
            $course = Course::find($request->id);
        else
            $course = new Course;
        if ($request->name == null)
            return $this->respondErrorWithStatus(["message" => "Thiếu name"]);
        $course->name = $request->name;
        $course->duration = $request->duration;
        $course->price = $request->price;
        $course->description = $request->description;
        $course->linkmac = $request->linkmac;
        $course->linkwindow = $request->linkwindow;
        $course->mac_how_install = $request->mac_how_install;
        $course->window_how_install = $request->window_how_install;
        $course->cover_url = $request->cover_url;
        $course->cover_url = $request->cover_url;
        $course->color = $request->color;
        $course->image_url = $request->image_url;
        $course->icon_url = $request->icon_url;
        $course->detail = $request->detail;
        $course->save();
        return $this->respondSuccessWithStatus([
            "message" => "Tạo/sửa thành công",
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

    public function getAll()
    {
        $courses = Course::all();

        return $this->respondSuccessWithStatus([
            "courses" => $courses->map(function ($course) {
                return $course->transform();
            })
        ]);
    }


    public function deleteCourse($course_id, Request $request)
    {
        $course = Course::find($course_id);
        if ($course == null) {
            return $this->respondErrorWithStatus(['message' => "Khóa học không tồn tại"]);
        }
        $classes = $course->classes();
        $course->delete();
        foreach ($classes as $class) {
            $class->delete();
        }
        return $this->respondSuccessWithStatus([
            'message' => " Xóa thành công"
        ]);
    }

    public function detailedLink($link_id)
    {
        $link = Link::find($link_id);
        return $this->respondSuccessWithStatus([
            "link" => $link->detailedTransform()
        ]);
    }

    public function createLink(Request $request)
    {
        $link = new Link;
        if ($request->link_url == null || $request->link_name == null || $request->course_id == null)
            return $this->respondErrorWithStatus(["message" => "Thiếu course_id or link_url or link_name"]);
        $link->link_name = $request->link_name;
        $link->link_url = $request->link_url;
        $link->link_description = $request->link_description;
        $link->course_id = $request->course_id;
        if ($request->link_icon != null) {

            $link_icon = uploadFileToS3($request, 'link_icon', 200, $link->link_icon);
            $link->link_icon = $link_icon;
            $link->link_icon_url = $this->s3_url . $link_icon;
        } else {
            if ($link->link_icon_url === null) {
                $link->link_icon_url = 'https://placehold.it/800x600';
            }
        }
        $link->save();
        return $this->respondSuccessWithStatus([
            'link' => $link
        ]);
    }

    public function editLink($linkId, Request $request)
    {
        $link = Link::find($linkId);
        if (!$link) return $this->respondErrorWithStatus("không tồn tại link");
        if ($request->link_url == null || $request->link_name == null || $request->course_id == null)
            return $this->respondErrorWithStatus(["message" => "Thiếu course_id or link_url or link_name"]);
        $link->link_name = $request->link_name;
        $link->link_url = $request->link_url;
        $link->link_description = $request->link_description;
        $link->course_id = $request->course_id;
        if ($request->link_icon != null) {

            $link_icon = uploadFileToS3($request, 'link_icon', 200, $link->link_icon);
            $link->link_icon = $link_icon;
            $link->link_icon_url = $this->s3_url . $link_icon;
        } else {
            if ($link->link_icon_url === null) {
                $link->link_icon_url = 'https://placehold.it/800x600';
            }
        }
        $link->save();
        return $this->respondSuccessWithStatus([
            'link' => $link
        ]);
    }

    public function deleteLink($link_id, Request $request)
    {
        $link = Link::find($link_id);
        $link->delete();
        return $this->respondSuccessWithStatus([
            'message' => "Xóa thành công"
        ]);
    }

    public function addLesson($courseId, Request $request)
    {
        if (Course::find($courseId) == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-existing course'
            ]);
        if ($request->name == null || $request->description == null)
            return $this->respondErrorWithStatus([
                'message' => 'missing name || description'
            ]);
        $lesson = new Lesson;
        $lesson->course_id = $courseId;
        $lesson->name = $request->name;
        $lesson->description = $request->description;
        $lesson->detail = $request->detail;
        $lesson->order = $request->order;
        $lesson->detail_content = $request->detail_content;
        $lesson->detail_teacher = $request->detail_teacher;
        $lesson->save();
        return $this->respondSuccessWithStatus([
            'lesson' => [
                'name' => $lesson->name,
                'course_id' => $lesson->course_id,
                'description' => $lesson->description,
                'detail' => $lesson->detail,
                'order' => $lesson->order,
                'detail_content' => $lesson->detail_content,
                'detail_teacher' => $lesson->detail_teacher
            ]
        ]);
    }

    public function editLesson($lessonId, Request $request)
    {
        if (Lesson::find($lessonId) == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-existing lesson'
            ]);
        if ($request->name == null || $request->description == null)
            return $this->respondErrorWithStatus([
                'message' => 'missing name || description'
            ]);
        $lesson = Lesson::find($lessonId);
        $lesson->name = $request->name;
        $lesson->description = $request->description;
        $lesson->detail = $request->detail;
        $lesson->order = $request->order;
        $lesson->detail_content = $request->detail_content;
        $lesson->detail_teacher = $request->detail_teacher;
        $lesson->save();
        return $this->respondSuccessWithStatus([
            'lesson' => [
                'name' => $lesson->name,
                'course_id' => $lesson->course_id,
                'description' => $lesson->description,
                'detail' => $lesson->detail,
                'order' => $lesson->order,
                'detail_content' => $lesson->detail_content,
                'detail_teacher' => $lesson->detail_teacher
            ]
        ]);
    }
}
