<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShiftSession extends Model
{
    protected $table = "shift_sessions";

    public function shifts()
    {
        return $this->hasMany(Shift::class, "shift_session_id");
    }

}
