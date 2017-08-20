<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class BoardTransformer extends Transformer
{
    protected $lessonTransformer;

    public function __construct(LessonTransformer $lessonTransformer)
    {
        $this->lessonTransformer = $lessonTransformer;
    }

    public function transform($board)
    {
        return [
            'id' => $board->id,
            'title' => $board->title,
            'order' => $board->order,
            'creator' => [
                "id" => $board->creator->id,
                "name" => $board->creator->name
            ],
            'editor' => [
                "id" => $board->editor->id,
                "name" => $board->editor->name
            ],
            'created_at' => format_time_main($board->created_at),
            'updated_at' => format_time_main($board->updated_at)
        ];
    }
}