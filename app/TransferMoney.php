<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferMoney extends Model
{
    //
    protected $table = 'transfer_money';

    public static $PURPOSE = [
        "deposit" => "Đặt cọc",
        "pay_order" => "Thanh toán tiền hàng đặt",
        "pay_good" => "Mua hàng sẵn"
    ];

    public static $PURPOSE_COLOR = [
        "deposit" => "#6bd098",
        "pay_order" => "#f5593d",
        "pay_good" => "#51bcda"
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

    public function transform()
    {
        return [
            "id" => $this->id,
            "money" => $this->money,
            "transfer_day" => $this->transfer_day,
            "note" => $this->note,
            "purpose" => $this->purpose,
            "status" => $this->status,
            "bank_account" => $this->bankAccount,
            "customer" => $this->user->transformAuth()
        ];
    }
}
