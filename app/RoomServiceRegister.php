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
    public function teleCalls(){
        return $this->hasMany(TeleCall::class,'register_id');
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
        if ($this->subscription)
            $data['subscription'] = $this->subscription->getData();

        if ($this->campaign)
            $data['campaign'] = [
                'id' => $this->campaign->id,
                'name' => $this->campaign->name,
                'color' => $this->campaign->color,
                ];
        if($this->teleCalls)
            $data['teleCall'] = [
                "id" => $this->teleCalls,
                "caller" => [
                    "id" => $this->teleCalls->caller->id,
                    "name" => $this->teleCalls->caller->name,
                    "color" => $this->teleCalls->caller->color,
                    "avatar_url" => $this->teleCalls->caller->avatar_url,
                ],
                "listener" => [
                    "id" => $this->teleCalls->student->id,
                    "name" => $this->teleCalls->student->name,
                    "color" => $this->teleCalls->student->color,
                    "avatar_url" => $this->teleCalls->student->avatar_url,
                ],
                "call_status" => $this->teleCalls->call_status,
                "note" => $this->teleCalls->note,
                "created_at" => $this->teleCalls->created_at,
            ];
        return $data;
    }

}
