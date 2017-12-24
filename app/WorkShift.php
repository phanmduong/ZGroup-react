<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkShift extends Model
{
    protected $table = 'work_shifts';

    public function work_shift_session()
    {
        return $this->belongsTo(WorkShiftSession::class, 'work_shift_session_id');
    }

    public function base()
    {
        return $this->belongsTo('App\Base', 'base_id');
    }

    public function gen()
    {
        return $this->belongsTo('App\Gen', 'gen_id');
    }
}
