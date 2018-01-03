<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderPaidMoney extends Model
{
    //
    use SoftDeletes;

    protected $table = 'order_paid_money';

    protected $dates = ['deleted_at'];

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
            "payment" => $this->payment,
            "created_at" => format_full_time_date($this->created_at),
        ];
        if ($this->staff)
            $data['staff'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
            ];
        return $data;
    }
}
