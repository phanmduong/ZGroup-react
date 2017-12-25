<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class WorkShiftTransformer extends Transformer
{

    public function transform($shift)
    {

        $shift_session = $shift->work_shift_session()->withTrashed()->first();
        return [
            'id' => $shift->id,
            "name" => $shift_session->name,
            'date' => date_shift(strtotime($shift->date)),
            'week' => $shift->week,
            'order' => $shift->order,
            'gen' => ['name' => $shift->gen->name],
            'base' => ['name' => $shift->base->name, 'address' => $shift->base->address],
            'start_time' => format_time_shift(strtotime($shift_session->start_time)),
            'end_time' => format_time_shift(strtotime($shift_session->end_time))
        ];
    }
}