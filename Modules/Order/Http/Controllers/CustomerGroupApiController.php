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
use App\Info;
use App\InfoCustomerGroup;
use App\Order;
use Illuminate\Http\Request;

class CustomerGroupApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function createGroup(Request $request)
    {
        if ($request->name === null) return $this->respondErrorWithStatus("Chua co ten");

        $group = new InfoCustomerGroup;
        $group->name = $request->name;
        $group->description = $request->description;
        $group->save();

        if ($request->stringId != null) {
            $id_lists = explode(';', $request->stringId);
        }
        if ($request->stringId) {
            foreach ($id_lists as $id_list) {
                $cusomer_group = new CustomerGroup;
                $cusomer_group->customer_group_id = $group->id;
                $cusomer_group->customer_id = $id_list;
                $cusomer_group->save();
            }
        }
        $customers = $group->customers;
        return $this->respondSuccessWithStatus([
            "message" => "tao thanh cong",
            "customer_group" => [
                "id" => $group->id,
                "customerCount" => $customers->count(),
                "name" => $group->name,
                "description" => $group->description,
                "customers" => $customers->map(function ($customer) {
                    $orders = Order::where("user_id", $customer->id)->get();
                    if (count($orders) > 0) $canDelete = "false"; else $canDelete = "true";
                    $totalMoney = 0;
                    $totalPaidMoney = 0;
                    $lastOrder = 0;
                    foreach ($orders as $order) {
                        $goodOrders = $order->goodOrders()->get();
                        foreach ($goodOrders as $goodOrder) {
                            $totalMoney += $goodOrder->quantity * $goodOrder->price;
                        }
                        $lastOrder = $order->created_at;
                    }
                    foreach ($orders as $order) {
                        $orderPaidMoneys = $order->orderPaidMoneys()->get();
                        foreach ($orderPaidMoneys as $orderPaidMoney) {
                            $totalPaidMoney += $orderPaidMoney->money;
                        }
                    }
                    return [
                        'id' => $customer->id,
                        'name' => $customer->name,
                        'phone' => $customer->phone,
                        'email' => $customer->email,
                        'address' => $customer->address,
                        'birthday' => $customer->dob,
                        'gender' => $customer->gender,
                        'avatar_url' => $customer->avatar_url ? $customer->avatar_url : "http://api.colorme.vn/img/user.png",
                        'last_order' => $lastOrder ? format_vn_short_datetime(strtotime($lastOrder)) : "Chưa có",
                        'total_money' => $totalMoney,
                        'total_paid_money' => $totalPaidMoney,
                        'debt' => $totalMoney - $totalPaidMoney,
                        'can_delete' => $canDelete
                    ];
                })],
        ]);

    }

    public function changeGroup(Request $request)
    {
        $group = InfoCustomerGroup::find($request->customer_group_id);
        if (!$group) return $this->respondErrorWithStatus("Khong ton tai nhom");

        if ($request->name === null) return $this->respondErrorWithStatus("Chua co ten");
        $group->name = $request->name;
        $group->description = $request->description;
        $group->save();

        if ($request->stringId != null) {
            $group->customers()->detach();
            $id_lists = explode(';', $request->stringId);
            foreach ($id_lists as $id_list) {
                $cusomer_group = new CustomerGroup;
                $cusomer_group->customer_group_id = $group->id;
                $cusomer_group->customer_id = $id_list;
                $cusomer_group->save();
            }

        } else if($request->stringId == "" && $group->customers) $group->customers()->detach();

        $customers = $group->customers;
        return $this->respondSuccessWithStatus([
            "message" => "Sua thanh cong",
            "customer_group" => [
                "id" => $group->id,
                "customerCount" => $customers->count(),
                "name" => $group->name,
                "description" => $group->description,
                "customers" => $customers->map(function ($customer) {
                    $orders = Order::where("user_id", $customer->id)->get();
                    if (count($orders) > 0) $canDelete = "false"; else $canDelete = "true";
                    $totalMoney = 0;
                    $totalPaidMoney = 0;
                    $lastOrder = 0;
                    foreach ($orders as $order) {
                        $goodOrders = $order->goodOrders()->get();
                        foreach ($goodOrders as $goodOrder) {
                            $totalMoney += $goodOrder->quantity * $goodOrder->price;
                        }
                        $lastOrder = $order->created_at;
                    }
                    foreach ($orders as $order) {
                        $orderPaidMoneys = $order->orderPaidMoneys()->get();
                        foreach ($orderPaidMoneys as $orderPaidMoney) {
                            $totalPaidMoney += $orderPaidMoney->money;
                        }
                    }
                    return [
                        'id' => $customer->id,
                        'name' => $customer->name,
                        'phone' => $customer->phone,
                        'email' => $customer->email,
                        'address' => $customer->address,
                        'birthday' => $customer->dob,
                        'gender' => $customer->gender,
                        'avatar_url' => $customer->avatar_url ? $customer->avatar_url : "http://api.colorme.vn/img/user.png",
                        'last_order' => $lastOrder ? format_vn_short_datetime(strtotime($lastOrder)) : "Chưa có",
                        'total_money' => $totalMoney,
                        'total_paid_money' => $totalPaidMoney,
                        'debt' => $totalMoney - $totalPaidMoney,
                        'can_delete' => $canDelete
                    ];
                })],
        ]);


    }

    public function getAllGroup(Request $request)
    {
        $keyword = $request->search;
        $limit = $request->limit && $request->limit != -1 ? $request->limit : 20;
        $groups = InfoCustomerGroup::query();
        $groups = $groups->where(function ($query) use ($keyword) {
            $query->where("name", "like", "%" . $keyword . "%");
        })->paginate($limit);


        return $this->respondWithPagination($groups, [
            "customer_groups" => $groups->map(function ($group) {
                $customers = $group->customers;
                return [
                    "id" => $group->id,
                    "customerCount" => $customers->count(),
                    "name" => $group->name,
                    "description" => $group->description,
                    "customers" => $customers->map(function ($customer) {
                        $orders = Order::where("user_id", $customer->id)->get();
                        if (count($orders) > 0) $canDelete = "false"; else $canDelete = "true";
                        $totalMoney = 0;
                        $totalPaidMoney = 0;
                        $lastOrder = 0;
                        foreach ($orders as $order) {
                            $goodOrders = $order->goodOrders()->get();
                            foreach ($goodOrders as $goodOrder) {
                                $totalMoney += $goodOrder->quantity * $goodOrder->price;
                            }
                            $lastOrder = $order->created_at;
                        }
                        foreach ($orders as $order) {
                            $orderPaidMoneys = $order->orderPaidMoneys()->get();
                            foreach ($orderPaidMoneys as $orderPaidMoney) {
                                $totalPaidMoney += $orderPaidMoney->money;
                            }
                        }
                        return [
                            'id' => $customer->id,
                            'name' => $customer->name,
                            'phone' => $customer->phone,
                            'email' => $customer->email,
                            'address' => $customer->address,
                            'birthday' => $customer->dob,
                            'gender' => $customer->gender,
                            'avatar_url' => $customer->avatar_url ? $customer->avatar_url : "http://api.colorme.vn/img/user.png",
                            'last_order' => $lastOrder ? format_vn_short_datetime(strtotime($lastOrder)) : "Chưa có",
                            'total_money' => $totalMoney,
                            'total_paid_money' => $totalPaidMoney,
                            'debt' => $totalMoney - $totalPaidMoney,
                            'can_delete' => $canDelete
                        ];
                    }),
                ];

            })
        ]);
    }

    public function deleteGroup(Request $request){
        $customer_group = InfoCustomerGroup::find($request->id);
        if(!$customer_group) return $this->respondErrorWithStatus("Khong ton tai nhom khach hang");
        if($customer_group->customers) $customer_group->customers()->detach();
        $customer_group->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xoa thanh cong"
        ]);

    }
}