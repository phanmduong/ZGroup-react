<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/11/17
 * Time: 00:59
 */

namespace App\Repositories;


class RegisterRepository
{
    public function register($register)
    {
        return [
            'id' => $register->id,
            'money' => $register->money,
            'code' => $register->code,
            'paid_status' => $register->status == 1,
            'received_id_card' => $register->received_id_card == 1,
            'note' => $register->note
        ];
    }
}