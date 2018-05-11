<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sms extends Model
{
    protected $table = "sms";

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function getHistories()
    {
        $registers = $this->user->registers()->where('status', 1)->get();

        return [
            'id' => $this->id,
            'content' => $this->content,
            'sent_quantity'=> $this->user,
            'sent_time' => format_vn_short_datetime(strtotime($this->created_at)),
            'user' => [
                'id' => $this->user->id,
                'avatar_url' => $this->user->avatar_url,
                'phone' => $this->user->phone,
                'name' => $this->user->name,
                'paid_money' => $registers->map(function ($register) {
                    $course = $register->studyClass->course;
                    return [
                        'id' => $course->id,
                        'name' => $course->name,
                        'image_url' => $course->icon_url,
                    ];
                }),
            ],
        ];
    }
}
