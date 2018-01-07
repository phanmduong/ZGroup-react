<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferMoney extends Model
{
    //

    public function user(){
        return $this->belongsTo(User, 'user_id');
    }
}
