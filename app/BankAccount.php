<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BankAccount extends Model
{
    //
    protected $table = 'bank_account';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
