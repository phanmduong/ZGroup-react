<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 8/27/17
 * Time: 2:58 PM
 */

namespace App\Repositories;


use App\Card;
use App\User;

class UserRepository
{
    public function loadStaffs($filter, $take = 20, $skip = 0)
    {
        $members = User::where("role", ">=", 1)
            ->where(function ($query) use ($filter) {
                $query->where("name", "like", "%$filter%")
                    ->orWhere("email", "like", "%$filter%");
            })
            ->take($take)
            ->skip($skip)
            ->get();
        return $members;
    }

    public function user($user)
    {
        if ($user)
            return [
                'id' => $user->id,
                'name' => $user->name,
                'color' => $user->color
            ];
    }

    public function student($student)
    {
        if ($student)
            return [
                'id' => $student->id,
                'name' => $student->name,
                'phone' => $student->phone,
                'email' => $student->email,
            ];
    }
}