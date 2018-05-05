<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 06/12/2017
 * Time: 12:04
 */

namespace Modules\Order\Http\Controllers;


use App\CustomerGroup;
use App\Http\Controllers\ManageApiController;
use App\InfoCustomerGroup;
use Illuminate\Http\Request;
use Modules\Order\Transformer\GroupTransformer;

class CustomerGroupApiController extends ManageApiController
{

    protected $groupTransformer;

    public function __construct(GroupTransformer $groupTransformer)
    {
        parent::__construct();
        $this->groupTransformer = $groupTransformer;
    }

    public function createGroup(Request $request)
    {
        if ($request->name === null) return $this->respondErrorWithStatus("Thiếu tên nhóm");

        $group = new InfoCustomerGroup;
        $group->name = $request->name;
        $group->description = $request->description;
        $group->color = $request->color;
        $group->order_value = $request->order_value;
        $group->delivery_value = $request->delivery_value;
        $group->currency_value = $request->currency_value ? $request->currency_value : 0;
        $group->ship_price = $request->ship_price ? $request->ship_price : 0;
        $group->save();

        if ($request->stringId != null) {
            $id_lists = explode(';', $request->stringId);
        }
        if ($request->stringId) {
            foreach ($id_lists as $customerId) {
                $group->customers()->attach($customerId);
            }
        }
        return $this->respondSuccessWithStatus([
            "customer_group" => $this->groupTransformer->transform($group),
        ]);

    }

    public function changeGroup($groupId, Request $request)
    {
        $group = InfoCustomerGroup::find($groupId);
        if (!$group) return $this->respondErrorWithStatus("Khong ton tai nhom");

        if ($request->name === null) return $this->respondErrorWithStatus("Chua co ten");
        $group->name = $request->name;
        $group->description = $request->description;
        $group->color = $request->color;
        $group->order_value = $request->order_value;
        $group->delivery_value = $request->delivery_value;
        $group->currency_value = $request->currency_value ? $request->currency_value : 0;
        $group->ship_price = $request->ship_price ? $request->ship_price : 0;

        $group->save();

        if ($request->stringId != null) {
            $group->customers()->detach();
            $id_lists = explode(';', $request->stringId);
            foreach ($id_lists as $customerId) {
                $group->customers()->attach($customerId);
            }

        } else if ($request->stringId == "") $group->customers()->detach();

        return $this->respondSuccessWithStatus([
            "message" => "Sua thanh cong",
            "customer_group" => $this->groupTransformer->transform($group),
        ]);
    }

    public function getAllGroup(Request $request)
    {
        $keyword = $request->search;
        $limit = $request->limit && $request->limit != -1 ? $request->limit : 20;
        $groups = InfoCustomerGroup::orderBy("created_at", "desc")->where(function ($query) use ($keyword) {
            $query->where("name", "like", "%" . $keyword . "%");
        })->paginate($limit);


        return $this->respondWithPagination($groups, [
            "customer_groups" => $this->groupTransformer->transformCollection($groups)
        ]);
    }


    public function deleteGroup($groupId)
    {
        $customer_group = InfoCustomerGroup::find($groupId);
        if (!$customer_group) return $this->respondErrorWithStatus("Nhóm khách hàng không tồn tại");
        if ($customer_group->customers()->first() != null) return $this->respondErrorWithStatus("Không được xoá nhóm khách hàng vẫn còn chứa khách hàng");
        $customer_group->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xoá thành công"
        ]);

    }

    public function getCustomerOfGroup($groupId, Request $request)
    {
        $group = InfoCustomerGroup::find($groupId);
        if (!$group) return $this->respondErrorWithStatus("Nhóm khách hàng không tồn tại");
        $limit = $request->limit ? $request->limit : 20;
        $customers = $group->customers()->paginate($limit);
        return $this->respondWithPagination($customers, [
            'name' => $group->name,
            'description' => $group->description,
            'color' => $group->color,
            'order_value' => $group->order_value,
            'delivery_value' => $group->delivery_value,
            'currency_value' => $group->currency_value,
            'ship_price' => $group->ship_price,
            "customers" => $customers->map(function ($customer) {
                return $customer->transfromCustomer();
            }),
        ]);
    }
    public function getCouponsOfGroup($groupId,Request $request){
        $group = InfoCustomerGroup::find($groupId);
        if(!$group) return $this->respondErrorWithStatus("Không tồn tại nhóm khách hàng");
        $coupons = $group->coupons()->orderBy('created_at','desc')->get();

        return $this->respondSuccessWithStatus([
            'coupons' => $coupons->map(function ($coupon) {
                $data = $coupon->getData();
                if ($coupon->used_for == 'order')
                    $data['order_value'] = $coupon->order_value;
                if ($coupon->used_for == 'good')
                    $data['good'] = [
                        'id' => $coupon->good ? $coupon->good->id : null,
                        'name' => $coupon->good ? $coupon->good->name : null,
                    ];
                if ($coupon->used_for == 'customer')
                    $data['customer'] = [
                        'id' => $coupon->user ? $coupon->user->id : null,
                        'name' => $coupon->user ? $coupon->user->name : null
                    ];
                if ($coupon->used_for == 'category')
                    $data['category'] = [
                        'id' => $coupon->goodCategory ? $coupon->goodCategory->id : null,
                        'name' => $coupon->goodCategory ? $coupon->goodCategory->name : null
                    ];
                if ($coupon->used_for == 'customer-group')
                    $data['customer_group'] = [
                        'id' => $coupon->customerGroup ? $coupon->customerGroup->id : null,
                        'name' => $coupon->customerGroup ? $coupon->customerGroup->name : null
                    ];
                return $data;
            })
        ]);
    }
}