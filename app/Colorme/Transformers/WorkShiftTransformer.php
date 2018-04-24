<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


use App\Repositories\UserRepository;

class WorkShiftTransformer extends Transformer
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function transform($shift)
    {

        $users = $shift->users->map(function ($user) {
            return $this->userRepository->staff($user);
        });

        $date = new \DateTime();
        $date->modify('-1000 hours');
        $datetime = strtotime($date->format('Y-m-d H:i:s'));

        $shift_session = $shift->work_shift_session()->withTrashed()->first();
        return [
            'id' => $shift->id,
            "name" => $shift_session->name,
            'date' => date_shift(strtotime($shift->date)),
            'week' => $shift->week,
            'users' => $users,
            'order' => $shift->order,
            'disable' => strtotime($shift->created_at) < $datetime,
            'gen' => ['name' => $shift->gen->name],
            'base' => ['name' => $shift->base->name, 'address' => $shift->base->address],
            'start_time' => format_time_shift(strtotime($shift_session->start_time)),
            'end_time' => format_time_shift(strtotime($shift_session->end_time))
        ];
    }
}