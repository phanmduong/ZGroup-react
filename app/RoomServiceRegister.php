<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomServiceRegister extends Model
{
    protected $table = 'room_service_registers';

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

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'code' => $this->code,
            'money' => $this->money,
            'status' => $this->status,
        ];
        if ($this->user)
            $data['user'] = [
                'id' => $this->user->id,
                'name' => $this->user->name
            ];
        if ($this->staff)
            $data['user'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name
            ];
        if ($this->subscription)
            $data['subscription'] = $this->subscription->getData();
        return $data;
    }
}
