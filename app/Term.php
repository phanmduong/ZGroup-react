<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        return $this->hasMany(Lesson::class, "term_id");
    }

}
