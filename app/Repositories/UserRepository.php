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
            'rate' => $student->rate,
            'created_at' => format_vn_short_datetime(strtotime($student->created_at)),
            'avatar_url' => generate_protocol_url($student->avatar_url),
            'dob' => $student->dob,
            'facebook' => $student->facebook,
            'university' => $student->university,
            'how_know' => $student->how_know,
            'status' => $student->status,
            'note' => $student->note,
        ];
    }

    public function staffs()
    {
        return User::where('role', '>', 0)->get()->map(function ($staff) {
            return $this->staff($staff);
        });
    }

    public function staff($staff)
    {
        if ($staff) {
            return [
                'id' => $staff->id,
                'name' => $staff->name,
                'phone' => $staff->phone,
                'email' => $staff->email,
                'color' => $staff->color,
                'avatar_url' => generate_protocol_url($staff->avatar_url),
            ];
        }
    }
}