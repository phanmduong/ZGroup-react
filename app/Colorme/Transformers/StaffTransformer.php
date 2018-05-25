<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class StaffTransformer extends Transformer
{

    public function __construct()
    {
    }

    public function transform($staff)
    {
        return [
            'id' => $staff->id,
            'avatar_url' => $staff->avatar_url ? $staff->avatar_url : url('/img/user.png'),
            "name" => $staff->name,
            "email" => $staff->email,
            'phone' => $staff->phone
        ];
    }
}