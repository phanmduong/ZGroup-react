<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/8/17
 * Time: 23:35
 */

namespace App\Repositories;


class GenRepository
{
    public function gen($gen)
    {
        if ($gen)
            return [
                'id' => $gen->id,
                'name' => $gen->name
            ];
    }

    public function gens($gens)
    {
        if ($gens)
            return $gens->map(function ($gen) {
                return $this->gen($gen);
            });
    }
}