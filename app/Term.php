<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Entities\Wifi;

class Term extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function course()
    {
        return $this->belongsTo(Course::class, "course_id");
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, "lesson_id");
    }

}
