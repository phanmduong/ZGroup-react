<?php

namespace Modules\Course\Http\Controllers;

use App\Attendance;
use App\ClassLesson;
use App\Course;
use App\CourseType;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Lesson;
use App\Link;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CourseTypeApiController extends ManageApiController
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function __construct()
    {

        parent::__construct();

    }

    public function assignTypeInfo(&$type, $request)
    {
        $type->name = $request->name;
        $type->color = $request->color;
        $type->image_url = $request->image_url;
        $type->icon_url = $request->icon_url;
        $type->cover_url = $request->cover_url;
        $type->short_description = $request->short_description;
        $type->description = $request->description;
        $type->save();
    }

    public function addType(Request $request)
    {
        $type = new CourseType();
        $this->assignTypeInfo($type, $request);
        return $this->respondSuccessWithStatus([
            'type' => $type
        ]);
    }

    public function editType($typeId, Request $request)
    {
        $type = new CourseType($typeId);

        if ($type == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }
        $this->assignTypeInfo($type, $request);
        return $this->respondSuccessWithStatus([
            'type' => $type
        ]);
    }

    public function deleteType($typeId)
    {
        $type = new CourseType($typeId);

        if ($type == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        $type->delete();

        return $this->respondSuccess("Xóa thành công");
    }

}
