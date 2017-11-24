<?php

namespace Modules\Coupon\Http\Controllers;

use App\Coupon;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class CouponController extends ManageApiController
{
    public function createCoupon(Request $request)
    {
        $coupon = new Coupon;
    }
}
