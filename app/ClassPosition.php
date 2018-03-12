<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassPosition extends Model
{
    protected $table = "class_position";

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function position()
    {
        return $this->belongsTo(Position::class, "position_id");
    }

    public function studyClass()
    {
        return $this->belongsTo(StudyClass::class, "class_id");
    }
}
