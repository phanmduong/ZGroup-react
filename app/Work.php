<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Work extends Model
{
    //
    use SoftDeletes;
    protected $table = 'works';

    public function staffs()
    {
        return $this->belongsToMany(User::class, 'work_staff', 'work_id', 'staff_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "type" => $this->type,
            "cost" => $this->cost,
            "deadline" => $this->deadline,
            "bonus_value" => $this->bonus_value,
            "bonus_type" => $this->bonus_type,
            "staffs" => $this->staffs->map(function ($staff) {
                return [
                    "id" => $staff->id,
                    "name" => $staff->name,
                    "avatar_url" => $staff->avatar_url ? $staff->avatar_url : defaultAvatarUrl(),
                ];
            })
        ];
    }
}
