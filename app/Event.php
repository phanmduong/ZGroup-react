<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = "events";

    public function creator(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function getData()
    {
        return [
            "name" => $this->name,
            "id" => $this->id,
            "created_at"=>$this->created_at,
            "address" => $this->address,
            "detail" => $this->detail,
            "status" => $this->status,
            "cover_url" => $this->cover_url,
            "avatar_url" => $this->avatar_url,
            "slug" => $this->slug,
            "start_time" => $this->start_time,
            "end_time" => $this->end_time,
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "creator" => $this->creator->getData(),
        ];
    }
}

