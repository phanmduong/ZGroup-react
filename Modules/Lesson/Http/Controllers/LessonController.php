<?php

namespace Modules\Lesson\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Lesson;
use Illuminate\Http\Request;

class LessonController extends ManageApiController
{
    public function __construct()
    {
       parent::__construct()  ;
    }

    public function getdetailLesson($lessonId,Request $request){
        $lesson= Lesson::find($lessonId);
        if($lesson == null)
            return $this->respondErrorWithStatus(["message"=>"Buổi học không tồn tại"]);
        return $this->respondSuccessWithStatus([
            "lesson" => $lesson->detailTransform()
        ]);

    }

    public function createLesson($couseId, Request $request){
        if(Course::find($couseId) == null)
             return $this->respondErrorWithStatus([
                 'message' => 'non-existing course'
             ]);
        if($request->name == null) return $this->respondErrorWithStatus([
            "message"=> "Thieu name"
        ]);
        if($request->order == null) return $this->respondErrorWithStatus([
            'message'=>'Thieu order'
        ]);

        $lesson = new Lesson;
        $lesson->name = $request->name;
        $lesson->description = $request->description;
        $lesson->course_id= $request->course_id;
        $lesson->detail= $request->detail;
        $lesson->order = $request->order;
        $lesson->detail_content= $request->detail_content;
        $lesson->detail_teacher=$request->detail_teacher;
        $lesson->save();
        return $this->respondSuccessWithStatus([
            'message'=> "Tao buoi hoc thanh cong"
        ]);
    }

    public function editLesson($lessonId,Request $request){
        $lesson= Lesson::find($lessonId);
        if($lesson == null)
            return $this->respondErrorWithStatus(["message"=>"Buổi học không tồn tại"]);
        if($request->name == null) return $this->respondErrorWithStatus([
            "message"=> "Thieu name"
        ]);
        if($request->course_id==null) return $this->respondErrorWithStatus([
            'message'=>"Thieu courseId"
        ]);
        if($request->order == null) return $this->respondErrorWithStatus([
            'message'=>'Thieu order'
        ]);
        $lesson->name= $request->name;
        $lesson->description = $request->description;
        $lesson->course_id= $request->course_id;
        $lesson->detail= $request->detail;
        $lesson->order = $request->order;
        $lesson->detail_content= $request->detail_content;
        $lesson->detail_teacher=$request->detail_teacher;
        $lesson->save();
        return $this->respondSuccessWithStatus([
            'message'=> "Sua buoi hoc thanh cong"
        ]);
    }

    public function deleteLesson($lesson_id,Request $request){
        $lesson= Lesson::find($lesson_id);
        if($lesson == null)
            return $this->respondErrorWithStatus("Buổi học không tồn tại");
        $lesson->delete();
        return $this->respondSuccessWithStatus([
            'message'=> "Xoa thanh cong"
        ]);
    }
}
