<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 7/30/16
 * Time: 18:19
 */

namespace App\Colorme\Transformers;


class LessonTransformer extends Transformer
{
    public function transform($student)
    {
        return [
            "name" => $student->name,
            "email" => $student->email,
            'phone' => $student->phone,
            'register' => $student->registers
        ];
    }
}