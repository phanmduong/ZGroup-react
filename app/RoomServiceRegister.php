<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RoomServiceRegister extends Model
{
    protected $table = 'room_service_registers';

    public function campaign()
    {
        return $this->belongsTo(MarketingCampaign::class, 'campaign_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subscription()
    {
        return $this->belongsTo(RoomServiceSubscription::class, 'subscription_id');
    }

    public function staff()
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function saler()
    {
        return $this->belongsTo(User::class, 'saler_id');
    }

    public function teleCalls()
    {
        return $this->hasMany(TeleCall::class, 'register_id');
    }

    public function historyPayments()
    {
        return $this->hasMany(Payment::class, 'register_id');
    }

    public function base()
    {
        return $this->belongsTo(Base::class, 'base_id');
    }

    public function seats()
    {
        return $this->belongsToMany(Seat::class, 'room_service_register_seat', 'room_service_register_id', 'seat_id');
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_service_register_room', 'room_service_register_id', 'room_id');
    }

    public function roomServiceRegisterRoom()
    {
        return $this->hasMany(RoomServiceRegisterRoom::class, 'room_service_register_id');
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'code' => $this->code,
            'money' => $this->money,
            'status' => $this->status,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'note' => $this->note,
            'extra_time' => $this->extra_time,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at))
        ];
        if ($this->user)
            $data['user'] = [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'phone' => $this->user->phone,
            'email' => $this->user->email,
            'address' => $this->user->address,
        ];
        if ($this->staff)
            $data['staff'] = [
            'id' => $this->staff->id,
            'name' => $this->staff->name,
            'color' => $this->staff->color,
        ];
        if ($this->saler)
            $data['saler'] = [
            'id' => $this->saler->id,
            'name' => $this->saler->name,
            'color' => $this->saler->color,
        ];
        if ($this->campaign)
            $data['campaign'] = [
            'id' => $this->campaign->id,
            'name' => $this->campaign->name,
            'color' => $this->campaign->color,
        ];
        if ($this->teleCalls) {
            $teleCalls = $this->teleCalls;
            $data["teleCalls"] = $teleCalls->map(function ($teleCall) {
                return $teleCall->transform();
            });
        }
        if ($this->historyPayments) {
            $historyPayments = $this->historyPayments;
            $data["historyPayments"] = $historyPayments->map(function ($payment) {
                return $payment->transform_for_up();
            });
            $data['time_spent'] = $historyPayments->reduce(function($total, $payment){
                return $total + $payment->time;
            }, 0);
        }

        if ($this->subscription)
            $data['subscription'] = $this->subscription->getData();

        if ($this->base) {
            $base = $this->base;
            $data['base'] = [
                "base" => $base->transform(),
                "district" => $base->district ? $base->district->transform() : [],
                "province" => $base->district ? $base->district->province->transform() : []
            ];
        }
        if ($this->roomServiceRegisterRoom)
            $data['room_history'] = $this->roomServiceRegisterRoom->map(function ($obj) {
                return $obj->getData();
            });
        return $data;
    }

    
}
