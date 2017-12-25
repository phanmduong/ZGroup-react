<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class WorkShiftSessionTransformer extends Transformer
{

    public function __construct()
    {
    }

    public function transform($work_shift_session)
    {
        return [
            'id' => $work_shift_session->id,
            'name' => $work_shift_session->name,
            'start_time' => $work_shift_session->start_time,
            'end_time' => $work_shift_session->end_time,
            'active' => $work_shift_session->active,
        ];
    }
}