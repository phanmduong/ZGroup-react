<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferMoney extends Model
{
    //
    protected $table = 'transfer_money';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class, "bank_account_id");
    }

    public function status()
    {
        switch ($this->status) {
            case "pending":
                return "Đang chờ";
            default:
                return "";
        }
    }
}
