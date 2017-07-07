<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class AttendanceTransformer extends Transformer
{
    protected $lessonTransformer;

    public function __construct(LessonTransformer $lessonTransformer)
    {
        $this->lessonTransformer = $lessonTransformer;
    }

    public function transform($attendance)
    {
        $classLesson = $attendance->classLesson;
        $lesson = null;
        if ($classLesson) {
            $lesson = $this->lessonTransformer->transform($attendance->classLesson->lesson);
        }

        return [
            "id" => $attendance->id,
            "status" => $attendance->status,
            "hw_status" => $attendance->hw_status,
            "lesson" => $lesson
        ];
    }
}