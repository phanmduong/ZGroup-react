<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


use App\TeleCall;

class RegisterTransformer extends Transformer
{

    public function __construct()
    {
    }

    public function transform($register)
    {
        $data = [
            "id" => $register->id,
            "gen_id" => $register->gen_id,
            "code" => $register->code,
            "name" => $register->user->name,
            "student_id" => $register->user->id,
            "email" => $register->user->email,
            "university" => $register->user->university,
            "avatar_url" => $register->user->avatar_url ?
                $register->user->avatar_url : "http://api.colorme.vn/img/user.png",
            "phone" => $register->user->phone,
            'paid_status' => $register->status == 1,
            'time_to_reach' => $register->time_to_reach,
            'course_avatar_url' => $register->studyClass->course->icon_url,
            'course_money' => $register->studyClass->course->price,
            'money' => $register->money,
            'study_time' => $register->study_time,
            "class" => [
                "name" => $register->studyClass->name,
                "id" => $register->studyClass->id,
                "study_time" => $register->studyClass->study_time,
                "description" => $register->studyClass->description,
                "room" => $register->studyClass->room->name,
                "base" => $register->studyClass->base->address
            ],
            "created_at" => format_time_to_mysql(strtotime($register->created_at))
        ];
        if ($register->call_status == 0) {
            $count = TeleCall::where('student_id', $register->user_id)->count();
            if ($count == 0) {
                $register->call_status = 4;
            }
        }
        $data['call_status'] = call_status_text($register->call_status);
        if ($register->saler) {
            $data["saler"] = [
                'id' => $register->saler->id,
                "name" => $register->saler->name,
                "color" => $register->saler->color
            ];
        }
        if ($register->marketing_campaign) {
            $data["campaign"] = [
                'id' => $register->marketing_campaign->id,
                'name' => $register->marketing_campaign->name,
                "color" => $register->marketing_campaign->color
            ];
        }
        return $data;
    }
}