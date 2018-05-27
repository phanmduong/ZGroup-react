<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShiftSession extends Model
{

    use SoftDeletes;

    protected $table = "shift_sessions";

    protected $dates = ['deleted_at'];

    public function shifts()
    {
        return $this->hasMany(Shift::class, "shift_session_id");
    }

}
