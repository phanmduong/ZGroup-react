<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdvancePayment extends Model
{
    //
    protected $table='advance_payments';
    public function staff(){
        return $this->belongsTo(User::class,'staff_id');
    }

    public function transform(){
        return[
            'id' => $this->id,
            'staff' => $this->staff ? [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
                'avatar_url' => $this->avatar_url,
            ] : [],
            'command_code' => $this->command_code,
            'money_payment' => $this->money_payment,
            'reason' => $this->reason,
            'money_received' => $this->money_received,
            'money_used' => $this->money_used,
            'type' => $this->type,
            'status' => $this->status,
            'date_complete' => $this->date_complete,
        ];
    }
}
