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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
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

    public function orderPaidMoneys()
    {
        return $this->hasMany(OrderPaidMoney::class, 'order_id');
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
        $data = [
            'id' =>$this->id,
            'code' => $this->code,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'user' => [
                'name' => $this->name,
                'address' => $this->address,
            ],
            'status' => $this->status,
            'total' => $this->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0),
            'debt' => $this->goodOrders->reduce(function ($total, $goodOrder) {
                    return $total + $goodOrder->price * $goodOrder->quantity;
                }, 0) - $this->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                    return $paid + $orderPaidMoney->money;
                }, 0),
        ];
        if ($this->staff)
            $data['staff'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
            ];
        if ($this->warehouse)
            if ($this->warehouse->base)
                $data['base'] = [
                    'name' => $this->warehouse->base->name,
                    'address' => $this->warehouse->base->address,
                ];
        return $data;
    }

    public function detailedTransform()
    {
        $goodOrders = $this->goodOrders;
        $goodOrders = $goodOrders->map(function ($goodOrder) {
            $goodOrderData = [
                'id' => $goodOrder->id,
                'price' => $goodOrder->price,
                'quantity' => $goodOrder->quantity,
                'name' => $goodOrder->good->name,
                'code' => $goodOrder->good->code,
            ];
            if($goodOrder->discount_money)
                $goodOrderData['discount_money'] = $goodOrder->discount_money;
            if($goodOrder->discount_percent)
                $goodOrderData['discount_percent'] = $goodOrder->discount_percent;
            return $goodOrderData;
        });
        $data = [
            'info_order' => [
                'code' => $this->code,
                'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
                'note' => $this->staff_note,
            ],
            'good_orders' => $goodOrders,
        ];
        if ($this->staff)
            $data['info_order']['staff'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
            ];
        if ($this->user)
            $data['info_user'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'phone' => $this->user->phone,
            ];
        return $data;
    }
}
