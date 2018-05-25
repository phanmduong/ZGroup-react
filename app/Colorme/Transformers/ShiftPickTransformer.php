<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class ShiftPickTransformer extends Transformer
{
    protected $registerTransformer;

    public function __construct(RegisterGetMoneyTransformer $registerTransformer)
    {
        $this->registerTransformer = $registerTransformer;
    }

    public function transform($shift_pick)
    {
        $shift = $shift_pick->shift;
        return [
            "user" => [
                'name' => $shift_pick->user->name
            ],
            'status' => $shift_pick->status,
            'shift' => [
                "name" => $shift->shift_session->name,
                'date' => $shift->date,
                'start_time' => format_time_shift(strtotime($shift->shift_session->start_time)),
                'end_time' => format_time_shift(strtotime($shift->shift_session->end_time))
            ],
            'created_at' => format_date_full_option($shift_pick->created_at)
        ];
    }
}