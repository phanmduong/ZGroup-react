<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdvancePayment extends Model
{
    //
    protected $table='advanced_payments';
    
    public function staff(){
        return $this->belongsTo(User::class,'staff_id');
    }
    
    public function companyPay(){
        return $this->belongsTo(Company::class,'company_pay_id');
    }
    
    public function companyReceive(){
        return $this->belongsTo(Company::class,'company_receive_id');
    }

    public function transform(){
        return[
            'id' => $this->id,
            'staff' => $this->staff ? [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
                'avatar_url' => $this->staff->avatar_url,
                'phone' => $this->staff->phone,
            ] : [],
            'company_pay' => $this->companyPay ? [
                'id' => $this->companyPay->id,
                'name' => $this->companyPay->name,
            ] : [],
            'company_receive' => $this->companyReceive ? [
                'id' => $this->companyReceive->id,
                'name' => $this->companyReceive->name,
            ] : [],
            'command_code' => $this->command_code,
            'money_payment' => $this->money_payment,
            'reason' => $this->reason,
            'money_received' => $this->money_received,
            'money_used' => $this->money_used,
            'type' => $this->type,
            'status' => $this->status,
            'date_complete' => $this->date_complete,
            'created_at' => $this->created_at,
        ];
    }
}
