<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShiftPick extends Model
{
    protected $table = 'shift_picks';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function shift()
    {
        return $this->belongsTo('App\Shift', 'shift_id');
    }
}
