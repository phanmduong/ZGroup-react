<?php

namespace Modules\CheckInCheckOut\Entities;

use App\Base;
use App\Shift;
use App\TeachingLesson;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CheckInCheckOut extends Model
{
    protected $fillable = [];
    use SoftDeletes;
    protected $table = "checkin_checkout";

    public function base()
    {
        return $this->belongsTo(Base::class, "base_id");
    }

    public function wifi()
    {
        return $this->belongsTo(Wifi::class, "wifi_id");
    }

    public function teacherTeachingLesson()
    {
        return $this->belongsTo(TeachingLesson::class, "teacher_teaching_lesson_id");
    }

    public function taTeachingLesson()
    {
        return $this->belongsTo(TeachingLesson::class, "teaching_assistant_teaching_lesson_id");
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class, "shift_id");
    }
}
