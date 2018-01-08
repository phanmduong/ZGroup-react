<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BankCount extends Model
{
    //
    protected $table = 'bank_account';
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function order(){
        return $this->hasMany(Order::class, 'bank_count_id');
    }
}
