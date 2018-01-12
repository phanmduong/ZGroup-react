<?php

namespace Modules\Order\Http\Controllers;

use App\Register;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ManageApiController;

class DeliveryOrderApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDeliveryOrders()
    {

    }
}
