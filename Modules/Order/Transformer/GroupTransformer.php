<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 12/14/17
 * Time: 2:59 PM
 */

namespace Modules\Order\Transformer;


use App\Colorme\Transformers\Transformer;

class GroupTransformer extends Transformer
{
    public function transform($group)
    {
        return [
            "id" => $group->id,
            "name" => $group->name,
            "description" => $group->description,
            "color" => $group->color,
            'order_value' => $group->order_value,
            'delivery_value' => $group->delivery_value,
            'coupons_count' => $group->coupons()->count(),
            'currency_value' => $group->currency_value,
            'ship_price' => $group->ship_price,
            "customers" => $group->customers->map(function ($customer) {
                return $customer->transfromCustomer();
            }),
        ];
    }
}