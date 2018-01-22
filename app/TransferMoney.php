<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferMoney extends Model
{
    //
    protected  $table = 'transfer_money';

    protected static $PURPOSE = [
        "deposit" => "Đặt cọc",
        "pay_order" => "Thanh toán tiền hàng đặt",
        "pay_good" => "Mua hàng sẵn"
    ];

    protected static $PURPOSE_COLOR = [
        "deposit" => "#f5593d",
        "pay_order" => "#51bcda",
        "pay_good" => "#cc90cc"
    ];

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
                return [
                    "color" => "#51bcda",
                    "text" => "Đang chờ"
                ];
            default:
                return "";
        }
    }
}
