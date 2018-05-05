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
        $class = $register->studyClass()->withTrashed()->first();
        $teleCall = TeleCall::where('student_id', $register->user->id)->where('gen_id', $register->gen_id)->whereNotNull('appointment_payment')->orderBy('created_at')->first();
        $data = [
            "id" => $register->id,
            "gen_id" => $register->gen_id,
            "code" => $register->code,
            "gen_name" => $register->gen->name,
            "name" => $register->user->name,
            "student_id" => $register->user->id,
            "how_know" => $register->user->how_know,
            "email" => $register->user->email,
            "university" => $register->user->university,
            "avatar_url" => $register->user->avatar_url ?
                $register->user->avatar_url : "http://colorme.vn/img/user.png",
            "phone" => $register->user->phone,
            'paid_status' => $register->status == 1,
            'status' => $register->status,
            'time_to_reach' => $register->time_to_reach,
            'course_avatar_url' => $class->course->icon_url,
            'course_money' => $class->course->price,
            'money' => $register->money,
            'coupon' => $register->coupon,
            'study_time' => $register->study_time,
            'note' => $register->note,
            'appointment_payment' => $teleCall ? rebuild_date('d/m', strtotime($teleCall->appointment_payment)) : '',
            'appointment_payment_date' => $teleCall ? format_vn_date(strtotime($teleCall->appointment_payment)) : '',
            "class" => [
                "name" => $class->name,
                "id" => $class->id,
                "study_time" => $class->study_time,
                "description" => $class->description,
                "type" => $class->type,
            ],
            "created_at" => format_time_to_mysql(strtotime($register->created_at)),
            "is_delete" => $register->is_delete
        ];

        if ($class->room) {
            $data['class']['room'] = $class->room->name;
        }

        if ($class->base) {
            $data['class']['base'] = $class->base->address;
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