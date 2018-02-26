<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

    public function base()
    {
        return $this->belongsTo(Base::class, 'base_id');
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'code' => $this->code,
            'money' => $this->money,
            'status' => $this->status,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at))
        ];
        if ($this->user)
            $data['user'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'phone' => $this->user->phone,
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
        if ($this->subscription)
            $data['subscription'] = $this->subscription->getData();

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
        if ($this->base) {
            $base = $this->base;
            $data['base'] = [
              "base" => $base->transform(),
              "district" => $base->district->transform(),
              "province" => $base->district->province->transform()
            ];
        }

        return $data;
    }

}
