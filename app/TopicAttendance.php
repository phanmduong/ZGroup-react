<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TopicAttendance extends Model
{
    protected $table = "topic_attendances";

    public function studyClass()
    {
        return $this->belongsTo('App\StudyClass', 'class_id');
    }

    public function topic() {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function creator()
    {
        return $this->belongsTo('App\User', 'creator_id');
    }

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }

}
