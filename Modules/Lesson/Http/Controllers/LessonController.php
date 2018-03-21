<?php

namespace Modules\Lesson\Http\Controllers;

use App\Colorme\Transformers\TermTransformer;
use App\Course;
use App\Http\Controllers\ManageApiController;
use App\Lesson;
use App\Term;
use Illuminate\Http\Request;

class LessonController extends ManageApiController
{

    protected $termTransformer;

    public function __construct(TermTransformer $termTransformer)
    {
        parent::__construct();
        $this->termTransformer = $termTransformer;
    }

    public function getdetailLesson($lessonId, Request $request)
    {
        $lesson = Lesson::find($lessonId);
        if ($lesson == null)
            return $this->respondErrorWithStatus(["message" => "Buổi học không tồn tại"]);
        return $this->respondSuccessWithStatus([
            "lesson" => $lesson->detailTransform()
        ]);

    }

    public function createLesson($couseId, Request $request)
    {

        $course = Course::find($couseId);

        if ($course == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-existing course'
            ]);
        if ($request->name === null) return $this->respondErrorWithStatus([
            "message" => "Thieu name"
        ]);
        if ($request->order === null) return $this->respondErrorWithStatus([
            'message' => 'Thieu order'
        ]);

        $lesson = new Lesson;
        $lesson->name = $request->name;
        $lesson->description = $request->description;
        $lesson->course_id = $request->course_id;
        $lesson->detail = $request->detail;
        $lesson->order = $request->order;
        $lesson->term_id = $request->term_id;
        $lesson->detail_content = $request->detail_content;
        $lesson->detail_teacher = $request->detail_teacher;
        $lesson->image_url = $request->image_url;
        $lesson->audio_url = $request->audio_url;
        $lesson->video_url = $request->video_url;
        $lesson->save();

        $course->duration = $course->lessons->count();
        $course->save();

        return $this->respondSuccessWithStatus([
            'message' => "Tao buoi hoc thanh cong"
        ]);
    }

    public function editLesson($lessonId, Request $request)
    {
        $lesson = Lesson::find($lessonId);
        if ($lesson == null)
            return $this->respondErrorWithStatus(["message" => "Buổi học không tồn tại"]);
        if (trim($request->name) == null) return $this->respondErrorWithStatus([
            "message" => "Thieu name"
        ]);
        if ($request->course_id === null) return $this->respondErrorWithStatus([
            'message' => "Thieu courseId"
        ]);
        if ($request->order === null) return $this->respondErrorWithStatus([
            'message' => 'Thieu order'
        ]);
        $lesson->name = $request->name;
        $lesson->description = $request->description;
        $lesson->course_id = $request->course_id;
        $lesson->detail = $request->detail;
        $lesson->order = $request->order;
        $lesson->term_id = $request->term_id;
        $lesson->detail_content = $request->detail_content;
        $lesson->detail_teacher = $request->detail_teacher;
        $lesson->image_url = $request->image_url;
        $lesson->audio_url = $request->audio_url;
        $lesson->video_url = $request->video_url;
        $course = Course::find($request->course_id);

        $lesson->save();


        $course->duration = $course->lessons->count();
        $course->save();

        return $this->respondSuccessWithStatus([
            'message' => "Sua buoi hoc thanh cong"
        ]);
    }

    public function deleteLesson($lesson_id, Request $request)
    {
        $lesson = Lesson::find($lesson_id);
        if ($lesson == null)
            return $this->respondErrorWithStatus("Buổi học không tồn tại");
        $lesson->delete();
        $course = $lesson->course;

        $course->duration = $course->lessons->count();
        $course->save();

        return $this->respondSuccessWithStatus([
            'message' => "Xoa thanh cong"
        ]);
    }

    public function getTermsCourse($course_id)
    {
        $course = Course::find($course_id);

        if ($course == null) {
            return $this->respondErrorWithStatus("Môn học không tồn tại");
        }

        $terms = $this->termTransformer->transformCollection($course->terms);

        return $this->respondSuccessWithStatus(
            [
                "terms" => $terms
            ]
        );
    }

    public function getTerm($term_id)
    {
        $term = Term::find($term_id);
        if ($term) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        return $this->respondSuccessWithStatus(
            [
                "term" => $this->termTransformer->transform($term)
            ]
        );
    }

    public function createTerm(Request $request)
    {
        $term = new Term();

        if ($request->course_id == null || $request->course_id == 0) {
            return $this->respondErrorWithStatus("Thiếu môn học");
        }

        $term->name = $request->name;
        $term->description = $request->description;
        $term->short_description = $request->short_description;
        $term->course_id = $request->course_id;
        $term->order = $request->order;
        $term->image_url = $request->image_url;
        $term->video_url = $request->video_url;
        $term->audio_url = $request->audio_url;

        $term->save();

        return $this->respondSuccessWithStatus([
            "term" => $this->termTransformer->transform($term)
        ]);
    }

    public function editTerm($term_id, Request $request)
    {
        $term = Term::find($term_id);

        if ($term == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        if ($request->course_id == null || $request->course_id == 0) {
            return $this->respondErrorWithStatus("Thiếu môn học");
        }

        $term->name = $request->name;
        $term->description = $request->description;
        $term->short_description = $request->short_description;
        $term->course_id = $request->course_id;
        $term->order = $request->order;
        $term->image_url = $request->image_url;
        $term->video_url = $request->video_url;
        $term->audio_url = $request->audio_url;

        $term->save();

        return $this->respondSuccessWithStatus([
            "term" => $this->termTransformer->transform($term)
        ]);
    }

    public function deleteTerm($term_id)
    {
        $term = Term::find($term_id);

        if ($term == null) {
            return $this->respondErrorWithStatus("Không tồn tại");
        }

        $term->lessons->map(function ($lesson) {
            $lesson->term_id = null;
            $lesson->save();
        });

        $term->delete();

        return $this->respondSuccess("Xóa thành công");
    }

    public function duplicateLesson($lessonId, Request $request)
    {
        $lesson = Lesson::find($lessonId);
        if (!$lesson) return $this->respondErrorWithStatus("Không tồn tại lesson");
        $lesson_new = new Lesson;
        $lesson_new->name = $lesson->name;
        $lesson_new->description = $lesson->description;
        $lesson_new->course_id = $lesson->course_id;
        $lesson_new->detail = $lesson->detail;
        $lesson_new->order = $lesson->order;
        $lesson_new->term_id = $lesson->term_id;
        $lesson_new->detail_content = $lesson->detail_content;
        $lesson_new->detail_teacher = $lesson->detail_teacher;
        $lesson_new->image_url = $lesson->image_url;
        $lesson_new->audio_url = $lesson->audio_url;
        $lesson_new->video_url = $lesson->video_url;
        $lesson_new->save();
        $course = Course::find($lesson_new->course_id);
        $course->duration = $course->lessons->count();
        $course->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thành công",
        ]);
    }
    public function duplicateTerm($termId,Request $request){
        $term = Term::find($termId);
        if(!$term) return $this->respondErrorWithStatus("Không tồn tại term");
        $term_new = new Term;
        $term_new->name = $term->name;
        $term_new->description = $term->description;
        $term_new->short_description = $term->short_description;
        $term_new->course_id = $term->course_id;
        $term_new->order = $term->order;
        $term_new->image_url = $term->image_url;
        $term_new->video_url = $term->video_url;
        $term_new->audio_url = $term->audio_url;

        $term_new->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thành công",
        ]);
    }
}
