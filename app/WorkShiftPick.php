<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkShiftPick extends Model
{
    protected $table = 'work_shift_picks';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function work_shift()
    {
        return $this->belongsTo(WorkShift::class, 'work_shift_id');
    }
}
