<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    public function good()
    {
        return $this->belongsTo('App\Good', 'good_id');
    }

    public function staff()
    {
        return $this->belongsTo('App\User', 'staff_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function goodOrders()
    {
        return $this->hasMany(GoodOrder::class, 'order_id');
    }

    public function orderPaidMoneys() {
        return $this->hasMany(OrderPaidMoney::class,'order_id');
    }

    public function goods()
    {
        return $this->belongsToMany(Good::class,
            "good_order",
            "order_id",
            "good_id")->withPivot("quantity", "price");
    }

    public function transform()
    {
        return [
            'code' => $this->code,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'user' => [
                'name' => $this->name,
                'address' => $this->address,
            ],
            'base' => [
                'name' => $this->warehouse ? ($this->warehouse->base ? $this->warehouse->base->name : null) : null,
                'address' => $this->warehouse ? ($this->warehouse->base ? $this->warehouse->base->address : null) : null,
            ],
            'staff' => [
                'id' => $this->staff ? $this->staff->id : null,
                'name' => $this->staff ? $this->staff->name :null,
            ],
            'status' => $this->status,
            'total' => $this->goodOrders->reduce(function ($total, $goodOrder){
                    return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0),
            'debt' => $this->goodOrders->reduce(function ($total, $goodOrder){
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0)  -  $this->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney){
                return $paid + $orderPaidMoney->money;
                }, 0),
        ];
    }
}
