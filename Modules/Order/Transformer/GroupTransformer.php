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
            "customers" => $group->customers->map(function ($customer) {
                return $customer->transfromCustomer();
            }),
        ];
    }
}