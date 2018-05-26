<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;

use App\Order;

class DeliveryOrderTransformer extends Transformer
{
    public function __construct()
    {
    }

    public function transform($deliveryOrder)
    {
        $total = $deliveryOrder->status == 'place_order' ? 0 : ($deliveryOrder->price ? $deliveryOrder->price :0);
        $paid = $deliveryOrder->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
            return $paid + $orderPaidMoney->money;
        }, 0);
        $data = [
            'id' => $deliveryOrder->id,
            'note' => $deliveryOrder->note,
            'label_id' => $deliveryOrder->label_id,
            'code' => $deliveryOrder->code,
            'payment' => $deliveryOrder->payment,
            'created_at' => format_vn_short_datetime(strtotime($deliveryOrder->created_at)),
            'status' => $deliveryOrder->status,
            'total' => $total,
            'paid' => $paid,
            'debt' => $total - $paid,
            'attach_info' => $deliveryOrder->attach_info,
            'quantity' => $deliveryOrder->quantity,
            'delivery_warehouse_status' => $deliveryOrder->delivery_warehouse_status,
            'paid_history' => $deliveryOrder->orderPaidMoneys->map(function ($orderPaidMoney) {
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
        if ($deliveryOrder->staff)
            $data['staff'] = [
                'id' => $deliveryOrder->staff->id,
                'name' => $deliveryOrder->staff->name,
            ];
        if ($deliveryOrder->user) {
            $data['customer'] = [
                'id' => $deliveryOrder->user->id,
                'name' => $deliveryOrder->user->name,
                'address' => $deliveryOrder->user->address,
                'phone' => $deliveryOrder->user->phone,
                'email' => $deliveryOrder->user->email,
                'money' => $deliveryOrder->user->money,
                'deposit' => $deliveryOrder->user->deposit
            ];
        }
        if ($deliveryOrder->ship_infor) {
            $data['ship_infor'] = [
                'name' => $deliveryOrder->ship_infor->name,
                'phone' => $deliveryOrder->ship_infor->phone,
                'province' => $deliveryOrder->ship_infor->province,
                'district' => $deliveryOrder->ship_infor->district,
                'address' => $deliveryOrder->ship_infor->address,
            ];
        }
        return $data;
    }
}