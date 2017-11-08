<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderPaidMoney extends Model
{
    //
    protected $table = 'order_paid_money';

    public function staff()
    {
        return $this->belongsTo('App\User', 'staff_id');
    }

    public function transform()
    {
        $data = [
            "id" => $this->id,
            "money" => $this->money,
            "note" => $this->note,
            "order_id" => $this->order_id,
            "payment" => $this->payment
        ];
        if($this->staff)
            $data['staff'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
            ];
        return $data;
    }
}
