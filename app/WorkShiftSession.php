<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkShiftSession extends Model
{

    use SoftDeletes;

    protected $table = "work_shift_sessions";

    protected $dates = ['deleted_at'];

    public function work_shifts()
    {
        return $this->hasMany(WorkShift::class, "work_shift_session_id");
    }

}
