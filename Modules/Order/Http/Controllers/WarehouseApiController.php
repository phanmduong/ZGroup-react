<?php

namespace Modules\Order\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\User;
use App\Warehouse;
use App\GoodWarehouse;
use Illuminate\Http\Request;
use App\Base;

class WarehouseApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
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

    public function addSupplier(Request $request)
    {
        $supplier = new User;
        $user = User::where('email', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user)
            return $this->respondErrorWithStatus('Email đã có người sử dụng');
        if ($request->name == null || $request->phone == null || $request->email == null)
            return $this->respondErrorWithStatus('Thiếu trường tên || sđt || email');
        $supplier->email = $request->email;
        $supplier->name = $request->name;
        $supplier->phone = $phone;
        $supplier->address = $request->address;
        $supplier->type = 'supplier';
        $supplier->save();
        return $this->respondSuccessWithStatus([
            'supplier' => $supplier
        ]);
    }

    public function editSupplier($supplier_id, Request $request)
    {
        $supplier = User::find($supplier_id);
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($supplier == null || $supplier->type != 'supplier')
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại nhà cung cấp'
            ]);
        if ($request->name == null || $request->phone == null || $request->email == null)
            return $this->respondErrorWithStatus('Thiếu trường tên || sđt || email');
        $supplier->email = $request->email;
        $supplier->name = $request->name;
        $supplier->phone = $phone;
        $supplier->address = $request->address;
        $supplier->save();
        return $this->respondSuccessWithStatus([
            'supplier' => $supplier
        ]);
    }

    public function deleteSupplier($supplier_id)
    {
        $supplier = User::find($supplier_id);
        if ($supplier == null || $supplier->type != 'supplier')
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại nhà cung cấp'
            ]);
        $supplier->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
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
                        'address' => $supplier->address,
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
                        'address' => $supplier->address,
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

    public function allWarehouses(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $warehouses = Warehouse::query();

        $warehouses = $warehouses->where('name', 'like', "%$keyword%");
        if ($limit == -1) {
            $warehouses = $warehouses->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'warehouses' => $warehouses->map(function ($warehouse) {
                    return $warehouse->getData();
                })
            ]);
        }
        $warehouses = $warehouses->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination(
            $warehouses,
            [
                'warehouses' => $warehouses->map(function ($warehouse) {
                    return $warehouse->getData();
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
        $data = [
            'id' => $warehouse->id,
            'name' => $warehouse->name,
            'location' => $warehouse->location,
        ];
        if ($warehouse->base)
            $data['base'] = [
                'id' => $warehouse->base->id,
                'name' => $warehouse->base->name,
                'address' => $warehouse->base->address,
            ];
        return $this->respondSuccessWithStatus([
            'warehouse' => $data
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
        $data = [
            'id' => $warehouse->id,
            'name' => $warehouse->name,
            'location' => $warehouse->location,
        ];
        if ($warehouse->base)
            $data['base'] = [
                'id' => $warehouse->base->id,
                'name' => $warehouse->base->name,
                'address' => $warehouse->base->address,
            ];
        return $this->respondSuccessWithStatus([
            'warehouse' => $data
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

    public function warehouseGoods($warehouseId)
    {
        if (Warehouse::find($warehouseId) == null)
            return $this->respondErrorWithStatus([
                'message' => 'non-existing warehouse'
            ]);
        $importedGoods = GoodWarehouse::where('warehouse_id', $warehouseId)->get();
        return $this->respondSuccessWithStatus([
            'goods' => $importedGoods->map(function ($importedGood) {
                $good = $importedGood->good;
                return [
                    'id' => $good->id,
                    'name' => $good->name,
                    'code' => $good->code,
                    'price' => $good->price,
                    'quantity' => $importedGood->quantity,
                    'type' => $good->type,
                    'avatar_url' => $good->avatar_url
                ];
            })
        ]);
    }
}