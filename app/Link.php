<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    //
    protected $table = 'links';
//    protected $primaryKey = 'id';

    public $timestamps = false;

    public function course(){
        return $this->belongsTo('App\Course', 'course_id');
    }
}
