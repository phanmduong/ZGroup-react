<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $table = 'shifts';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function shift_session()
    {
        return $this->belongsTo('App\ShiftSession', 'shift_session_id');
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
