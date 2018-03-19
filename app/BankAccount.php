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

    public function getData()
    {
        return [
            "id" => $this->id,
            "bank_name" => $this->bank_name,
            "bank_account_name" => $this->bank_account_name,
            "account_number" => $this->account_number,
            "owner_name" => $this->owner_name,
            "branch" => $this->branch,
            "display" => $this->display
        ];
    }
}
