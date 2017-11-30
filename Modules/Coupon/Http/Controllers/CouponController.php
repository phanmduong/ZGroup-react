<?php

namespace Modules\Coupon\Http\Controllers;

use App\Coupon;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class CouponController extends ManageApiController
{
    public function createCoupon(Request $request)
    {
        $name = trim($request->name);
        $description = $request->description;
        $discount_type = $request->discount_type; //percentage, fix
        $discount_value = $request->discount_value;
        $type = $request->type; //code, program
        $quantity = $request->quantity; //dùng column rate trong bảng để chứa quantity vì lúc migrate éo đc -.-
        $used_for = trim($request->used_for); //all, order, good, category, customer
        $order_value = $request->order_value;
        $good_id = $request->good_id;
        $customer_id = $request->customer_id;
        $category_id = $request->category_id;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $coupon = new Coupon;

        if ($name == null || $discount_type == null || $discount_value == null || $type == null || $used_for == null ||
            ($used_for == 'order' && $order_value == null) ||
            ($used_for == 'good' && $good_id == null) ||
            ($used_for == 'category' && $category_id == null) ||
            ($used_for == 'customer' && $customer_id == null))
            return $this->respondErrorWithStatus([
                'message' => 'missing params'
            ]);
        $coupon->name = $name;
        $coupon->description = $description;
        $coupon->discount_type = $discount_type;
        $coupon->discount_value = $discount_value;
        $coupon->used_for = $used_for;
        $coupon->type = $type;
        $coupon->order_value = $order_value;
        $coupon->good_id = $good_id;
        $coupon->customer_id = $customer_id;
        $coupon->category_id = $category_id;
        $coupon->start_time = $start_time;
        $coupon->end_time = $end_time;
        $coupon->rate = $quantity;
        $coupon->save();

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deleteCoupon($couponId)
    {
        $coupon = Coupon::find($couponId);
        if ($coupon == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-existing coupon'
            ]);
        $coupon->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function allCoupons(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $used_for = $request->used_for;
        $discount_type = $request->discount_type;
        $type = $request->type;

        $coupons = Coupon::query();
        $coupons = $coupons->where(function ($query) use ($keyword) {
            $query->where('name', 'like', '%' . $keyword . '%')->orWhere('description', 'like', '%' . $keyword . '%');
        });
        if ($used_for)
            $coupons = $coupons->where('used_for', $used_for);
        if ($discount_type)
            $coupons = $coupons->where('discount_type', $discount_type);
        if ($type)
            $coupons = $coupons->where('type', $type);


        $coupons = $coupons->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($coupons,
            [
                'coupons' => $coupons->map(function ($coupon) {
                    $data = $coupon->getData();
                    if ($coupon->used_for == 'order')
                        $data['order'] = [
                            'value' => $coupon->order_value,
                        ];
                    if ($coupon->used_for == 'good')
                        $data['good'] = [
                            'id' => $coupon->good_id,
                            'name' => $coupon->good->name,
                        ];
                    if ($coupon->used_for == 'customer')
                        $data['customer'] = [
                            'id' => $coupon->customer_id,
                            'name' => $coupon->user->name
                        ];
                    if ($coupon->used_for == 'category')
                        $data['category'] = [
                            'id' => $coupon->category_id,
                            'name' => $coupon->goodCategory->name
                        ];
                    return $data;
                })
            ]);
    }

    public function detailedCoupon($couponId, Request $request)
    {
        $coupon = Coupon::find($couponId);
        if ($coupon == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại coupon'
            ]);
        $data = $coupon->getData();
        if ($coupon->used_for == 'order')
            $data['order'] = [
                'value' => $coupon->order_value,
            ];
        if ($coupon->used_for == 'good')
            $data['good'] = $coupon->good;
        if ($coupon->used_for == 'customer')
            $data['customer'] = $coupon->user;
        if ($coupon->used_for == 'category')
            $data['category'] = $coupon->category;
    }

    public function editCoupon($couponId, Request $request)
    {
        $name = trim($request->name);
        $description = $request->description;
        $discount_type = $request->discount_type; //percentage, fix
        $discount_value = $request->discount_value;
        $type = $request->type; //code, program
        $quantity = $request->quantity; //dùng column rate trong bảng để chứa quantity vì lúc migrate éo đc -.-
        $used_for = trim($request->used_for); //all, order, good, category, customer
        $order_value = $request->order_value;
        $good_id = $request->good_id;
        $customer_id = $request->customer_id;
        $category_id = $request->category_id;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $coupon = Coupon::find($couponId);
        if ($coupon == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại coupon'
            ]);
        if ($name == null || $discount_type == null || $discount_value == null || $type == null || $used_for == null ||
            ($used_for == 'order' && $order_value == null) ||
            ($used_for == 'good' && $good_id == null) ||
            ($used_for == 'category' && $category_id == null) ||
            ($used_for == 'customer' && $customer_id == null))
            return $this->respondErrorWithStatus([
                'message' => 'missing params'
            ]);
        $coupon->name = $name;
        $coupon->description = $description;
        $coupon->discount_type = $discount_type;
        $coupon->discount_value = $discount_value;
        $coupon->used_for = $used_for;
        $coupon->type = $type;
        $coupon->order_value = $order_value;
        $coupon->good_id = $good_id;
        $coupon->customer_id = $customer_id;
        $coupon->category_id = $category_id;
        $coupon->start_time = $start_time;
        $coupon->end_time = $end_time;
        $coupon->rate = $quantity;
        $coupon->save();

        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}
