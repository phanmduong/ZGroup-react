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
            "name" => $register->user->name,
            "email" => $register->user->email,
            "avatar_url" => $register->user->avatar_url ?
                $register->user->avatar_url : "http://api.colorme.vn/img/user.png",
            "phone" => $register->user->phone,
            'paid_status' => $register->status == 1,
            'course_avatar_url' => $register->studyClass->course->icon_url,
            'money' => $register->money,
            "class" => [
                "name" => $register->studyClass->name,
                "id" => $register->studyClass->id
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
                "name" => $register->saler->name,
                "color" => $register->saler->color
            ];
        }
        if ($register->marketing_campaign) {
            $data["campaign"] = [
                'name' => $register->marketing_campaign->name,
                "color" => $register->marketing_campaign->color
            ];
        }
        return $data;
    }
}