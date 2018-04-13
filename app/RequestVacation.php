<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestVacation extends Model
{
    //
    protected $table = 'request_vacations';

    public function staff(){
        return $this->belongsTo(User::class,'staff_id');
    }

    public function transform(){
        return [
            "id" => $this->id,
            "staff" => $this->staff ? [
                "id" => $this->staff->id,
                "name" => $this->staff->name,
                "avatar_url" => $this->staff->avatar_url,
                "phone" => $this->staff->phone,
            ] : [],
            'command_code' => $this->command_code,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'reason' => $this->reason,
            "request_date" => $this->request_date,
            "status" => $this->status,
            "type" => $this->type,
            'created_at' => $this->created_at,
        ];
    }
}
