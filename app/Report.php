<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    //
    protected $table = 'reports';
    protected $fillable = ['report'];
    public function staff(){
        return $this->belongsTo(User::class,'staff_id');
    }
    public function transform(){
        return [
           "id"=> $this->id,
           "staff" => [
               "id" => $this->staff->id,
               "name" => $this->staff->name
           ],
            "tittle" => $this->title,
            "content" => $this->report,
            "created_at" => $this->created_at
        ];
    }
}
