<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferMoney extends Model
{
    //
    protected $table = 'transfer_money';
    public function user(){
        return $this->belongsTo(User, 'user_id');
    }
}
