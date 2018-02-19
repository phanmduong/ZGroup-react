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

    public static $STATUS_COLOR = [
        "pending" => "#51bcda",
        "accept" => "#6bd098",
        "cancel" => "#f5593d"
    ];

    public static $STATUS = [
        "pending" => "Đang chờ",
        "accept" => "Xác nhận",
        "cancel" => "Huỷ"
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class, "bank_account_id");
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
            "img_proof" => $this->img_proof,
            "bank_account" => $this->bankAccount,
            "customer" => $this->user->transformAuth(),
        ];
    }
}
