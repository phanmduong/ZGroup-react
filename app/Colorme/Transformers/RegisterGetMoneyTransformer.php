<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:54
 */

namespace App\Colorme\Transformers;


class RegisterGetMoneyTransformer extends Transformer
{
    public function transform($regis)
    {
        return [
            'id' => $regis->id,
            'course_name' => $regis->studyClass->course->name,
            'class' => "lớp " . $regis->studyClass->name,
            'code' => $regis->code,
            'money' => $regis->money,
            'note' => $regis->note,
            'paid_time' => $regis->paid_time,
            'status' => $regis->status,
            'avatar_url' => $regis->studyClass->course->icon_url,
            'link' => "/course/" . convert_vi_to_en($regis->studyClass->course->name)
        ];
    }
}