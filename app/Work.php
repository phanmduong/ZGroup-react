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

    public function payer(){
        return $this->belongsTo(User::class,'payer_id');
    }
    public function currency(){
        return $this->belongsTo(Currency::class,'currency_id');
    }
    public function transform()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "type" => $this->type,
            "cost" => $this->cost,
            "status"=> $this->status,
            "deadline" => $this->deadline,
            "bonus_value" => $this->bonus_value,
            "hired_status" => $this->hired_status,
            "currency" => $this->currency ? $this->currency->transform() : [],
            "payer" =>$this->payer ? [
                "id" => $this->payer->id,
                "name" => $this->payer->name,
                "avatar_url" => $this->payer->avatar_url,
            ] : [],
            "staffs" => $this->staffs->map(function ($staff) {
                return [
                    "id" => $staff->id,
                    "name" => $staff->name,
                    "avatar_url" => $staff->avatar_url ? $staff->avatar_url : defaultAvatarUrl(),
                    "status" => WorkStaff::where('work_id',$this->id)->where('staff_id',$staff->id)->first()->status,
                ];
            })
        ];
    }
    public function DetailTransform(){
        return[
            "id" => $this->id,
            "name" => $this->name,
            "type" => $this->type,
            "cost" => $this->cost,
            "status"=> $this->status,
            "deadline" => $this->deadline,
            "bonus_value" => $this->bonus_value,
            "hired_status" => $this->hired_status,
            "currency" => $this->currency ? $this->currency->transform() : [],
            "payer" =>$this->payer ? [
                "id" => $this->payer->id,
                "name" => $this->payer->name,
                "avatar_url" => $this->payer->avatar_url,
            ] : [],
            "staffs" => $this->staffs->map(function ($staff) {
                $work_staff = WorkStaff::where('work_id',$this->id)->where('staff_id',$staff->id)->first();
                return [
                    "id" => $staff->id,
                    "name" => $staff->name,
                    "avatar_url" => $staff->avatar_url ? $staff->avatar_url : defaultAvatarUrl(),
                    "status" => $work_staff->status,
                    'cost' => $work_staff->cost,
                    'rate_star' => $work_staff->rate_star,
                    'rate_description' => $work_staff->rate_description,
                    'penalty' => $work_staff->penalty,
                ];
            })
        ];
    }
}
