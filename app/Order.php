<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    public static $STATUS_COLOR = [
        "place_order" => "#51bcda",
        "sent_price" => "#6bd098",
        "confirm_order" => "#f5593d",
        "ordered"       => "#659bf2",
        "arrived"       => "#6af265",
        "ship"          => "#f2da65",
        "completed"     => "#65b5f2",
        "cancel"        => "#c1140b",
    ];

    public static $STATUS = [
      "place_order" => "Đơn mới",
        "sent_price" => "Đã báo giá",
        "confirm_order" => "Đã Xác nhận",
        "ordered"       =>  "Đã đặt hàng",
        "arrived"       =>  "Đã có VN",
        "ship"          => "giao hàng",
        "completed"     => "hoàn thành",
        "cancel"        => "Huỷ"

    ];
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

    public function importedGoods()
    {
        return $this->hasMany(ImportedGoods::class, 'order_import_id');
    }

    public function goods()
    {
        return $this->belongsToMany(Good::class,
            "good_order",
            "order_id",
            "good_id")->withPivot("quantity", "price");
    }


    public function ship_infor()
    {
        return $this->belongsTo(ShipInfor::class, 'ship_infor_id');
    }

    public function bank_count()
    {
        return $this->belongsTo(BankAccount::class, 'bank_count_id');
    }

    public function transform()
    {
        $goodOrders = $this->goodOrders->map(function ($goodOrder) {
            $goodOrderData = [
                'id' => $goodOrder->id,
                'price' => $goodOrder->price,
                'quantity' => $goodOrder->quantity,
                'name' => $goodOrder->good->name,
                'code' => $goodOrder->good->code,
            ];
            if ($goodOrder->discount_money)
                $goodOrderData['discount_money'] = $goodOrder->discount_money;
            if ($goodOrder->discount_percent)
                $goodOrderData['discount_percent'] = $goodOrder->discount_percent;
            return $goodOrderData;
        });
        $data = [
            'id' => $this->id,
            'note' => $this->note,
            'label_id' => $this->label_id,
            'code' => $this->code,
            'payment' => $this->payment,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'status' => $this->status,
            'total' => $this->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0),
            'paid' => $this->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0),
            'debt' => $this->goodOrders->reduce(function ($total, $goodOrder) {
                    return $total + $goodOrder->price * $goodOrder->quantity;
                }, 0) - $this->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                    return $paid + $orderPaidMoney->money;
                }, 0),
        ];
        if ($goodOrders)
            $data['good_orders'] = $goodOrders;
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
        if ($this->user) {
            $data['customer'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'address' => $this->user->address,
                'phone' => $this->user->phone,
                'email' => $this->user->email,
            ];
        }
        if ($this->ship_infor) {
            $data['ship_infor'] = [
                'name' => $this->ship_infor->name,
                'phone' => $this->ship_infor->phone,
                'province' => $this->ship_infor->province,
                'district' => $this->ship_infor->district,
                'address' => $this->ship_infor->address,
            ];
        }
        return $data;
    }

    public function detailedTransform()
    {
        $data = [
            'id' => $this->id,
            'code' => $this->code,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'note' => $this->note,
            'payment' => $this->payment,
            'status' => $this->status,
            'good_orders' => $this->goodOrders->map(function ($goodOrder) {
                $goodOrderData = [
                    'good_id' => $goodOrder->good_id,
                    'price' => $goodOrder->price,
                    'quantity' => $goodOrder->quantity,
                    'name' => $goodOrder->good->name,
                    'code' => $goodOrder->good->code,
                ];
                if ($goodOrder->discount_money)
                    $goodOrderData['discount_money'] = $goodOrder->discount_money;
                if ($goodOrder->discount_percent)
                    $goodOrderData['discount_percent'] = $goodOrder->discount_percent;
                return $goodOrderData;
            }),
            'paid_history' => $this->orderPaidMoneys->map(function ($orderPaidMoney) {
                return [
                    "id" => $orderPaidMoney->id,
                    "money" => $orderPaidMoney->money,
                    "note" => $orderPaidMoney->note,
                    "order_id" => $orderPaidMoney->order_id,
                    "payment" => $orderPaidMoney->payment,
                    "created_at" => $orderPaidMoney->created_at->format('Y-m-d')
                ];
            })
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
        if ($this->user) {
            $data['customer'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'address' => $this->user->address,
                'phone' => $this->user->phone,
                'email' => $this->user->email,
            ];
        } else {
            $data['customer'] = [
                'name' => $this->name,
                'address' => $this->address,
                'phone' => $this->phone,
                'email' => $this->email,
            ];
        }
        if ($this->ship_infor) {
            $data['ship_infor'] = [
                'name' => $this->ship_infor->name,
                'phone' => $this->ship_infor->phone,
                'province' => $this->ship_infor->province,
                'district' => $this->ship_infor->district,
                'address' => $this->ship_infor->address,
            ];
        }
        $data['total'] = $this->goodOrders->reduce(function ($total, $goodOrder) {
            return $total + $goodOrder->price * $goodOrder->quantity;
        }, 0);
        $data  ['paid'] = $this->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
            return $paid + $orderPaidMoney->money;
        }, 0);
        $data['debt'] = $this->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0) - $this->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);
        return $data;
    }

    public function returnOrderData()
    {
        $data = [];
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
        if ($this->user) {
            $data['customer'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'address' => $this->user->address,
                'phone' => $this->user->phone,
                'email' => $this->user->email,
            ];
        }
        $data['good_orders'] = $this->goodOrders->map(function ($goodOrder) {
            $goodOrderData = [
                'good_id' => $goodOrder->good_id,
                'price' => $goodOrder->price,
                'quantity' => $goodOrder->quantity,
                'name' => $goodOrder->good->name,
                'code' => $goodOrder->good->code,
            ];
            if ($goodOrder->discount_money)
                $goodOrderData['discount_money'] = $goodOrder->discount_money;
            if ($goodOrder->discount_percent)
                $goodOrderData['discount_percent'] = $goodOrder->discount_percent;
            return $goodOrderData;
        });
        return $data;
    }

    public function getDeliveryData()
    {
        $data = [
            'id' => $this->id,
            'note' => $this->note,
            'code' => $this->code,
            'attach_info' => $this->attach_info,
            'status' => $this->status,
            'price' => $this->price,
            'quantity' => $this->quantity
        ];
        if ($this->user) {
            $data['customer'] = [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'address' => $this->user->address,
                'phone' => $this->user->phone,
                'email' => $this->user->email,
            ];
        }
        if ($this->staff)
            $data['staff'] = [
                'id' => $this->staff->id,
                'name' => $this->staff->name,
            ];
        return $data;
    }
}
