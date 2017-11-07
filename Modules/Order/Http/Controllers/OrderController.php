<?php

namespace Modules\Order\Http\Controllers;

use App\Good;
use App\GoodCategory;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\OrderPaidMoney;
use App\User;
use App\Warehouse;
use App\GoodWarehouse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Order;
use App\Base;

class OrderController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allOrders(Request $request)
    {
        $limit = 3;
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        $status = $request->status;
        $keyWord = $request->search;
        $totalOrders = Order::where('type', 'order')->get()->count();
        $totalMoney = 0;
        $totalPaidMoney = 0;
        $allOrders = Order::where('type', 'order')->get();
        foreach ($allOrders as $order) {
            $goodOrders = $order->goodOrders()->get();
            foreach ($goodOrders as $goodOrder) {
                $totalMoney += $goodOrder->quantity * $goodOrder->price;
            }
        }
        foreach ($allOrders as $order) {
            $orderPaidMoneys = $order->orderPaidMoneys();
            foreach ($orderPaidMoneys as $orderPaidMoney) {
                $totalPaidMoney += $orderPaidMoney->money;
            }
        }
        if ($startTime) {
            if ($status)
                $orders = Order::where('type', 'order')->where('status', $status)->whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
            else
                $orders = Order::where('type', 'order')->whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->where("name", "like", "%$keyWord%")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
        } else {
            if ($status)
                $orders = Order::where('type', 'order')->where('status', $status)->orderBy("created_at", "desc")->where("name", "like", "%$keyWord%")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
            else
                $orders = Order::where('type', 'order')->orderBy("created_at", "desc")->where(function ($query) use ($keyWord) {
                    $query->where("name", "like", "%$keyWord%")->orWhere("code", "like", "%$keyWord%")->orWhere("phone", "like", "%$keyWord%")->orWhere("email", "like", "%$keyWord%");
                })->paginate($limit);
        }
        return $this->respondWithPagination(
            $orders,
            [
                'total_order' => $totalOrders,
                'total_money' => $totalMoney,
                'total_paid_money' => $totalPaidMoney,
                'orders' => $orders->map(function ($order) {
                    return $order->transform();
                })
            ]
        );
    }

    public function detailedOrder($order_id)
    {
        $order = Order::find($order_id);
        return $this->respondSuccessWithStatus(
            $order->detailedTransform()
        );
    }

    public function editOrder($order_id, Request $request)
    {
        $order = Order::find($order_id);
        if ($request->code == null || $request->staff_id)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu code || staff_id'
            ]);
        $order->note = $request->note;
        $order->code = $request->code;
        $order->staff_id = $request->staff_id;
        $order->user_id = $request->user_id;
        $order->save();
        return $this->respondSuccessWithStatus([
            'message' => 'ok'
        ]);
    }

    public function allCategory()
    {
        $goodCategories = GoodCategory::orderBy("created_at", "desc")->get();
        return $this->respondSuccessWithStatus([
            [
                'good_categories' => $goodCategories->map(function ($goodCategory) {
                    return $goodCategory->CategoryTransform();
                })
            ]

        ]);
    }

    public function addCategory(Request $request)
    {
        if ($request->name == null) return $this->respondErrorWithStatus("Chưa có tên");
        $goodCategory = new GoodCategory;
        $goodCategory->name = $request->name;
        if ($request->parent_id != null) $goodCategory->parent_id = $request->parent_id; else $goodCategory->parent_id = 0;
        $goodCategory->save();
        return $this->respondSuccessWithStatus([
            "goodCategory" => $goodCategory->CategoryTransform()
        ]);
    }

    public function editCategory(Request $request)
    {
        if ($request->id == null || $request->name == null)
            return $this->respondErrorWithStatus("Chưa có id hoặc tên");
        $goodCategory = GoodCategory::find($request->id);
        if ($goodCategory == null) return $this->respondErrorWithStatus("Không tồn tại thể loại này");
        $goodCategory->name = $request->name;
        if ($request->parent_id != null) $goodCategory->parent_id = $request->parent_id;
        $goodCategory->save();
        return $this->respondSuccessWithStatus([
            "goodCategory" => $goodCategory->CategoryTransform()
        ]);
    }

    public function deleteChildren($category_id)
    {
        $goodCategory = GoodCategory::find($category_id);
        $children = $goodCategory->children()->get();
        foreach ($children as $child) {
            $this->deleteChildren($child->id);
        }
        $goodCategory->delete();
    }

    public function deleteCategory($category_id, Request $request)
    {
        $goodCategory = GoodCategory::find($category_id);
        if ($goodCategory == null) return $this->respondErrorWithData([
            "message" => "Danh mục không tồn tại"
        ]);
        $this->deleteChildren($goodCategory->id);
        return $this->respondSuccessWithStatus([
            "message" => "Xóa thành công"
        ]);
    }

    public function importOrders(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = $request->end_time;
        if ($startTime)
            $importOrders = Order::where('type', 'import')->whereBetween('created_at', array($startTime, $endTime))->orderBy("created_at", "desc")->get();
        else
            $importOrders = Order::where('type', 'import')->orderBy("created_at", "desc")->get();
        $data = $importOrders->map(function ($importOrder) {
            $total_money = $importOrder->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity * $importedGood->import_price;
            }, 0);
            $total_quantity = $importOrder->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity;
            }, 0);
            $debt = $total_money - $importOrder->orderPaidMoneys->reduce(function ($total, $orderPaidMoney) {
                    return $total + $orderPaidMoney->money;
                }, 0);
            $importOrderData = [
                'id' => $importOrder->id,
                'code' => $importOrder->code,
                'status' => $importOrder->status,
                'created_at' => format_vn_short_datetime(strtotime($importOrder->created_at)),
                'import_price' => $importOrder->import_price,
                'warehouse_id' => $importOrder->warehouse_id,
                'total_money' => $total_money,
                'total_quantity' => $total_quantity,
                'debt' => $debt,
            ];
            if (isset($importOrder->staff)) {
                $staff = [
                    'id' => $importOrder->staff->id,
                    'name' => $importOrder->staff->name,
                ];
                $importOrderData['staff'] = $staff;
            }
            if (isset($importOrder->user)) {
                $user = [
                    'id' => $importOrder->user->id,
                    'name' => $importOrder->user->name,
                ];
                $importOrderData['user'] = $user;
            }
            return $importOrderData;
        });

        return $this->respondSuccessWithStatus([
            'import_orders' => $data
        ]);
    }

    public function detailedImportOrder($importOrderId)
    {
        $importOrder = Order::find($importOrderId);
        $total_money = $importOrder->importedGoods->reduce(function ($total, $importedGood) {
            return $total + $importedGood->quantity * $importedGood->import_price;
        }, 0);
        $total_quantity = $importOrder->importedGoods->reduce(function ($total, $importedGood) {
            return $total + $importedGood->quantity;
        }, 0);
        $debt = $total_money - $importOrder->orderPaidMoneys->reduce(function ($total, $orderPaidMoney) {
                return $total + $orderPaidMoney->money;
            }, 0);
        $data = [
            'id' => $importOrder->id,
            'name' => $importOrder->name,
            'code' => $importOrder->code,
            'created_at' => format_vn_short_datetime(strtotime($importOrder->created_at)),
            'note' => $importOrder->note,
            'total_money' => $total_money,
            'total_quantity' => $total_quantity,
            'debt' => $debt,
        ];
        $data['imported_goods'] = $importOrder->importedGoods->map(function ($importedGood) {
            return [
                'name' => $importedGood->good->name,
                'code' => $importedGood->good->code,
                'quantity' => $importedGood->quantity,
                'import_price' => $importedGood->import_price
            ];
        });
        $data['order_paid_money'] = $importOrder->orderPaidMoneys->map(function ($orderPaidMoney) {
            return [
                'id' => $orderPaidMoney->id,
                'money' => $orderPaidMoney->money,
                'note' => $orderPaidMoney->note,
            ];
        });
        if (isset($importOrder->user)) {
            $user = [
                'id' => $importOrder->user->id,
                'name' => $importOrder->user->name,
            ];
            $data['user'] = $user;
        }
        return $this->respondSuccessWithStatus([
            'import_order' => $data,
        ]);
    }

    public function addImportOrder(Request $request)
    {
        $importOrder = new Order;
        if ($request->warehouse_id == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu trường warehouse_id'
            ]);
        $importOrder->name = $request->name;
        $importOrder->note = $request->note;
        $importOrder->warehouse_id = $request->warehouse_id;
        $importOrder->staff_id = $this->user->id;
        $importOrder->type = 'import';
        $importOrder->save();



        if ($request->paid_money){
            $orderPaidMoney = new OrderPaidMoney();
            $orderPaidMoney->order_id = $importOrder->id;
            $orderPaidMoney->money = $request->paid_money;
            $orderPaidMoney->staff_id = $this->user->id;
            $orderPaidMoney->note = $request->note_paid_money;
            $orderPaidMoney->save();

        }
        return $this->respondSuccessWithStatus([
            'messgae' => 'SUCCESS'
        ]);
    }

    public function addImportedGood(Request $request)
    {
        $importedGood = new ImportedGoods;
        if ($request->order_import_id == null || Order::find($request->order_import_id) == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại đơn nhập hàng'
            ]);
        if ($request->good_id == null || Good::find($request->good_id) == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại sản phẩm'
            ]);
        if ($request->quantity == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu số lượng hàng'
            ]);
        if ($request->import_price == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu giá nhập hàng'
            ]);
        $importedGood->order_import_id = $request->order_import_id;
        $importedGood->good_id = $request->good_id;
        $importedGood->quantity = $request->quantity;
        $importedGood->import_price = $request->import_price;
        $importedGood->staff_id = Order::find($request->order_import_id)->staff->id;
        $importedGood->warehouse_id = Order::find($request->order_import_id)->warehouse->id;
        $importedGood->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }



    public function payOrder($orderId, Request $request)
    {
        if(Order::find($orderId)->get() == null )
            return $this->respondErrorWithStatus([
                'message' => 'non-exist order'
            ]);
        if ($request->money == null)
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tiền thanh toán'
            ]);
        $debt = Order::find($orderId)->goodOrders->reduce(function ($total, $goodOrder) {
                return $total + $goodOrder->price * $goodOrder->quantity;
            }, 0) - Order::find($orderId)->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);
        if ($request->money > $debt)
            return $this->respondErrorWithStatus([
                'message' => 'over',
                'money' => $debt,
            ]);
        $orderPaidMoney = new OrderPaidMoney;
        $orderPaidMoney->order_id = $orderId;
        $orderPaidMoney->money = $request->money;
        $orderPaidMoney->staff_id = $this->user->id;
        $orderPaidMoney->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function addImportOrderGoods(Request $request)
    {
        $importOrder = new Order;
        if ($request->code == null)
            $importOrder->code = rebuild_date('YmdHis', strtotime(Carbon::now()->toDateTimeString()));
        else
            $importOrder->code = $request->code;
        $importOrder->name = 'test';
        $importOrder->note = $request->note;
        $importOrder->warehouse_id = $request->warehouse_id;
        $importOrder->staff_id = $this->user->id;
        $importOrder->user_id = $request->user_id;
        $importOrder->type = 'import';
        $importOrder->save();
        $orderImportId = $importOrder->id;
        foreach ($request->imported_goods as $imported_good) {
            $importedGood = new ImportedGoods;
            $importedGood->order_import_id = $orderImportId;
            $importedGood->good_id = $imported_good['good_id'];
            $importedGood->quantity = $imported_good['quantity'];
            $importedGood->import_price = $imported_good['import_price'];
            $importedGood->staff_id = $this->user->id;
            $importedGood->warehouse_id = $request->warehouse_id;
            $importedGood->save();
            $goodWarehouse = new GoodWarehouse;
            $goodWarehouse->good_id = $imported_good['good_id'];
            $goodWarehouse->quantity = $imported_good['quantity'];
            $goodWarehouse->warehouse_id = $request->warehouse_id;
            $goodWarehouse->save();
        }
        return $this->respondSuccessWithStatus([
            'messgae' => 'SUCCESS'
        ]);
    }

    public function addSupplier(Request $request)
    {
        $supplier = new User;
        $user = User::where('email', $request->email)->first();
        if ($user)
            return $this->respondErrorWithStatus('Email đã có người sử dụng');
        if ($request->name == null || $request->phone == null)
            return $this->respondErrorWithStatus('Thiếu trường tên hoặc số điện thoại');
        $supplier->email = $request->email;
        $supplier->name = $request->name;
        $supplier->phone = $request->phone;
        $supplier->address = $request->address;
        $supplier->code = $request->code;
        $supplier->type = 'supplier';
        $supplier->save();
        return $this->respondSuccessWithStatus([
            'supplier' => $supplier
        ]);
    }

    public function allSuppliers(Request $request)
    {
        $keyword = $request->search;
        $limit = $request->limit;
        if ($limit == -1) {
            $suppliers = User::where('type', 'supplier')->where(function ($query) use ($keyword) {
                $query->where("name", "like", "%$keyword%")->orWhere("email", "like", "%$keyword%")->orWhere("phone", "like", "%$keyword%");
            })->limit(20)->get();
            return $this->respondSuccessWithStatus([
                'suppliers' => $suppliers->map(function ($supplier) {
                    return [
                        'id' => $supplier->id,
                        'name' => $supplier->name,
                        'email' => $supplier->email,
                        'phone' => $supplier->phone,
                    ];
                })
            ]);
        }
        if ($limit == null)
            $limit = 20;

        $suppliers = User::where('type', 'supplier')->where(function ($query) use ($keyword) {
            $query->where("name", "like", "%$keyword%")->orWhere("email", "like", "%$keyword%")->orWhere("phone", "like", "%$keyword%");
        })->orderBy("created_at", "desc")->paginate($limit);
        return $this->respondWithPagination(
            $suppliers,
            [
                'suppliers' => $suppliers->map(function ($supplier) {
                    return [
                        'id' => $supplier->id,
                        'name' => $supplier->name,
                        'email' => $supplier->email,
                        'phone' => $supplier->phone,
                    ];
                })
            ]
        );
    }

    public function getWarehouses()
    {
        $warehouses = Warehouse::all();

        $warehouses = $warehouses->map(function ($warehouse) {
            return [
                'id' => $warehouse->id,
                'name' => $warehouse->name,
            ];
        });

        return $this->respondSuccessWithStatus([
            'warehouses' => $warehouses
        ]);
    }

    public function getOrderPaidMoney(){
        $orderPMs= OrderPaidMoney::orderBy('created_at','desc')->get();
        return $this->respondSuccessWithStatus([
            "order_paid_money"=>$orderPMs->map(function ($orderPM) {
                return $orderPM->transform();
                }
    }

    public function allWarehouses(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $warehouses = Warehouse::orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination(
            $warehouses,
            [
                'warehouses' => $warehouses->map(function ($warehouse) {
                    $warehouseData = [
                        'id' => $warehouse->id,
                        'name' => $warehouse->name,
                        'location' => $warehouse->location,
                    ];
                    if ($warehouse->base)
                        $warehouseData['base'] = [
                            'id' => $warehouse->base->id,
                            'name' => $warehouse->base->name,
                            'address' => $warehouse->base->address,
                        ];

                    return $warehouseData;
                })
            ]

        );
    }

    public function addWarehouse(Request $request)
    {
        $warehouse = new Warehouse;
        if ($request->name == null || $request->location == null)
            return $this->respondErrorWithStatus([
                'message' => 'missing params'
            ]);
        $warehouse->name = $request->name;
        $warehouse->location = $request->location;
        $warehouse->base_id = $request->base_id;
        $warehouse->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editWarehouse($warehouseId, Request $request)
    {
        $warehouse = Warehouse::find($warehouseId);
        if ($request->name == null || $request->location == null)
            return $this->respondErrorWithStatus([
                'message' => 'missing params'
            ]);
        $warehouse->name = $request->name;
        $warehouse->location = $request->location;
        $warehouse->base_id = $request->base_id;
        $warehouse->save();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deleteWarehouse($warehouseId)
    {
        $warehouse = Warehouse::find($warehouseId);
        if ($warehouse == null)
            return $this->respondErrorWithStatus([
                'message' => 'null object'
            ]);
        $warehouse->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function allBases()
    {
        $bases = Base::orderBy('id', 'asc')->get();
        return $this->respondSuccessWithStatus([
            'bases' => $bases->map(function ($base) {
                return [
                    'id' => $base->id,
                    'name' => $base->name,
                    'address' => $base->address,
                ];

            })
        ]);
    }
}
