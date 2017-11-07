<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderPaidMoney extends Model
{
    //
    protected $table = 'order_paid_money';
    public function transform(){
        $user= User::find($this->staff_id);
        return[
            "id"=>$this->id,
            "money" => $this->money,
            "note"=> $this->note,
            "staff" =>[
                "id" => $user->id,
                "name"=>$user->name
            ],
            "order_id" =>$this->order_id
        ];
    }
}
