<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;

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

    public function check_in()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'checkin_id');
    }

    public function check_out()
    {
        return $this->belongsTo(CheckInCheckOut::class, 'checkout_id');
    }

    public function transform()
    {
        $user = $this->user;
        if ($user) {
            $user = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'color' => $this->user->color,
                'avatar_url' => $this->user->avatar_url ? generate_protocol_url($this->user->avatar_url) : url('img/user.png')
            ];
        }

        $shift_session = $this->shift_session()->withTrashed()->first();
        return [
            'id' => $this->id,
            "name" => $shift_session->name,
            'user' => $user,
            'date' => date_shift(strtotime($this->date)),
            'week' => $this->week,
            'gen' => ['name' => $this->gen->name],
            'base' => ['name' => $this->base->name, 'address' => $this->base->address],
            'start_time' => format_time_shift(strtotime($shift_session->start_time)),
            'end_time' => format_time_shift(strtotime($shift_session->end_time))
        ];
    }
}
