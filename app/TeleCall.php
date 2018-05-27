<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeleCall extends Model
{
    protected $table = 'tele_calls';

    public function caller()
    {
        return $this->belongsTo('App\User', 'caller_id');
    }

    public function gen()
    {
        return $this->belongsTo('App\Gen', 'gen_id');
    }

    public function scopeGetCallHistory($scope, $caller_id)
    {
        $telecalls = TeleCall::where('caller_id', $caller_id)->select('')->get();
    }

    public function student()
    {
        return $this->belongsTo('App\User', 'student_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "caller" => [
                "id" => $this->caller->id,
                "name" => $this->caller->name,
                "color" => $this->caller->color,
                "avatar_url" => $this->caller->avatar_url,
            ],
            "listener" => [
                "id" => $this->student->id,
                "name" => $this->student->name,
                "color" => $this->student->color,
                "avatar_url" => $this->student->avatar_url,
            ],
            "call_status" => $this->call_status,
            "note" => $this->note,
            "created_at" => format_vn_short_datetime(strtotime($this->created_at)),
        ];
    }
}
