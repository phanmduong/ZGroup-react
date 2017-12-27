<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;

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

    public function check_in()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'checkin_id');
    }

    public function check_out()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'checkout_id');
    }

}
