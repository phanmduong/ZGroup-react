<?php

namespace Modules\Course\Http\Controllers;

use App\Course;
use App\CoursePixel;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class PixelApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createPixel($courseId, Request $request)
    {
        if(($request->name == null && trim($request->name) == '') || ($request->code == null && trim($request->code) == ''))
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu name hoặc code'
            ]);
        $coursePixel = new CoursePixel;
        $coursePixel->course_id = $courseId;
        $coursePixel->name = $request->name;
        $coursePixel->code = $request->code;
        $coursePixel->staff_id = $this->user->id;
        $coursePixel->save();

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editPixel($pixelId, Request $request)
    {
        if($request->course_id || ($request->name == null && trim($request->name) == '') || ($request->code == null && trim($request->code) == ''))
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu course id hoặc name hoặc code'
            ]);
        $coursePixel = CoursePixel::find($pixelId);
        if($coursePixel == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại pixel'
            ]);
        $coursePixel->name = $request->name;
        $coursePixel->code = $request->code;
        $coursePixel->staff_id = $this->user->id;
        $coursePixel->save();

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deletePixel($pixelId, Request $request)
    {
        $coursePixel = CoursePixel::find($pixelId);
        if($coursePixel == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại pixel'
            ]);
        $coursePixel->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}