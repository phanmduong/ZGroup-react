<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkShiftUser extends Model
{
    protected $table = 'work_shift_user';

    public function workShift()
    {
        return $this->belongsTo(WorkShift::class, "work_shift_id");
    }

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
