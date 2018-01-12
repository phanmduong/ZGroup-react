<?php

namespace Modules\Order\Http\Controllers;

use App\Colorme\Transformers\DeliveryOrderTransformer;
use App\Register;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ManageApiController;

class DeliveryOrderApiController extends ManageApiController
{
    public function __construct(DeliveryOrderTransformer $deliveryOrderTransformer)
    {
        parent::__construct();

        $this->deliveryOrderTransformer = $deliveryOrderTransformer;
    }

    public function getDeliveryOrders(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $deliveryOrders = Order::where('type', 'delivery');
        //queries

        if ($limit == -1) {
            $deliveryOrders = $deliveryOrders->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'delivery_orders' => $this->deliveryOrderTransformer->transformCollection($deliveryOrders)
            ]);
        }
        $deliveryOrders->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination(
            $deliveryOrders
            ,
            [
                'delivery_orders' => $this->deliveryOrderTransformer->transformCollection($deliveryOrders)
            ]);
    }

//    public function
}
