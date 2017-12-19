<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 19=>02
 */

namespace App\Colorme\Transformers;


class ShiftTransformer extends Transformer
{


    public function transform($shift)
    {
        $user = $shift->user;
        if ($user) {
            $user = [
                'id' => $shift->user->id,
                'name' => $shift->user->name,
                'color' => $shift->user->color,
                'avatar_url' => $shift->user->avatar_url ? generate_protocol_url($shift->user->avatar_url) : url('img/user.png')
            ];
        }

        $shift_session = $shift->shift_session()->withTrashed()->first();
        return [
            'id' => $shift->id,
            "name" => $shift_session->name,
            'user' => $user,
            'date' => date_shift(strtotime($shift->date)),
            'week' => $shift->week,
            'gen' => ['name' => $shift->gen->name],
            'base' => ['name' => $shift->base->name, 'address' => $shift->base->address],
            'start_time' => format_time_shift(strtotime($shift_session->start_time)),
            'end_time' => format_time_shift(strtotime($shift_session->end_time))
        ];
    }
}