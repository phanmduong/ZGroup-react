<?php

namespace App\Http\Controllers;

use App\Good;
use App\GoodWarehouse;
use App\ImportedGoods;
use App\Order;
use App\Warehouse;
use Illuminate\Http\Request;

use App\Http\Requests;

class OrderController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function orders(Request $request)
    {
        if ($request->search) {
            $search = $request->search;
            $this->data['search'] = $search;
            $orders = Order::where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orWhere('phone', 'like', '%' . $search . '%')
                ->orderBy('created_at', 'desc')->paginate(50);
        } else {
            $orders = Order::orderBy('created_at', 'desc')->paginate(50);
            $this->data['search'] = null;
        }
        $this->data['current_tab'] = 37;

        $this->data['orders'] = $orders;
        $this->data['last_page'] = $orders->lastPage();
        $this->data['current_page'] = $orders->currentPage();
        return view('manage.order.list', $this->data);
    }

    public function delivered_orders()
    {
        $orders = Order::where('money', '>', 0)->orderBy('created_at', 'desc')->paginate(50);
        $this->data['current_tab'] = 40;

        $this->data['orders'] = $orders;
        $this->data['last_page'] = $orders->lastPage();
        $this->data['current_page'] = $orders->currentPage();
        return view('manage.order.delivered_orders', $this->data);
    }

    public function warehouses(Request $request)
    {
        $this->data['current_tab'] = 38;
        $warehouses = Warehouse::orderBy('created_at', 'desc')->paginate(10);
        $this->data['warehouses'] = $warehouses;
        $this->data['last_page'] = $warehouses->lastPage();
        $this->data['current_page'] = $warehouses->currentPage();
        return view('manage.order.warehouses', $this->data);
    }

    public function create_warehouse()
    {
        $this->data['current_tab'] = 38;
        return view('manage.order.create_warehouse', $this->data);
    }

    public function store_warehouse(Request $request)
    {
        $warehouse = new Warehouse();
        $warehouse->name = $request->name;
        $warehouse->location = $request->location;
        $warehouse->save();
        return redirect('/manage/warehouses');
    }

    public function imported_goods()
    {
        $this->data['current_tab'] = 39;
        $imported_goods = ImportedGoods::orderBy('created_at', 'desc')->paginate(30);
        $this->data['imported_goods'] = $imported_goods;
        $this->data['last_page'] = $imported_goods->lastPage();
        $this->data['current_page'] = $imported_goods->currentPage();
        return view('manage.order.import_list', $this->data);
    }

    public function import_goods()
    {
        $warehouses = Warehouse::all();
        $goods = Good::all();

        $this->data['goods'] = $goods;
        $this->data['warehourses'] = $warehouses;

        $this->data['current_tab'] = 39;
        return view('manage.order.import_goods', $this->data);
    }

    public function store_imported_goods(Request $request)
    {
        $importedGoods = new ImportedGoods();
        $importedGoods->warehouse_id = $request->warehouse_id;
        $importedGoods->good_id = $request->good_id;
        $importedGoods->quantity = $request->quantity;
        $importedGoods->note = $request->note;

        $warehouse = $importedGoods->warehouse;
        $goodWarehouse = $warehouse->goodWarehouses()->where('good_id', $request->good_id)->first();
        if ($goodWarehouse) {
            $goodWarehouse->quantity += $request->quantity;
            $goodWarehouse->save();
        } else {
            $goodWarehouse = new GoodWarehouse();
            $goodWarehouse->quantity = $request->quantity;
            $goodWarehouse->good_id = $request->good_id;
            $goodWarehouse->warehouse_id = $request->warehouse_id;
            $goodWarehouse->save();
        }

        $importedGoods->save();
        return redirect('manage/imported-goods');
    }

    public function close_order($order_id)
    {
        $this->data['current_tab'] = 40;
        $order = Order::find($order_id);
        $this->data['order'] = $order;
        $this->data['warehouses'] = Warehouse::all();
        return view('manage.order.sell_good', $this->data);
    }

    public function store_order_money(Request $request)
    {
        $order = Order::find($request->order_id);
        if ($order->status == 0) {
            $goodWarehouse = GoodWarehouse::where('warehouse_id', $request->warehouse_id)->where('good_id', $order->good_id)->first();
            if (!$goodWarehouse || $goodWarehouse->quantity <= 0) {
                $request->session()->flash('error', 'Sản phẩm này chưa có trong kho hàng');
                return redirect('manage/order-list');
            }
            $goodWarehouse->quantity -= $order->quantity;
            $goodWarehouse->save();

            $order->status = "paid";
            $order->money = $request->money;
            $order->paid_time = format_date_to_mysql(time());
            $order->staff_id = $this->user->id;
            $order->warehouse_id = $request->warehouse_id;
            $order->staff_note = $request->staff_note;
            $order->ship_money = $request->ship_money;
            $order->save();


            $this->user->money += ($request->money - $request->ship_money);
            $this->user->save();

            $request->session()->flash('message', 'Thanh toán thành công');
        } else {
            $request->session()->flash('error', 'Thanh toán thất bại. Đơn hàng này đã được thanh toán');
        }
        return redirect('manage/order-list');
    }

    public function warehouse($warehouse_id)
    {
        $this->data['current_tab'] = 38;
        $warehouse = Warehouse::find($warehouse_id);
        $this->data['warehouse'] = $warehouse;
        $this->data['warehouses'] = Warehouse::all();
        return view('manage.order.warehouse', $this->data);
    }

    public function move_warehouse(Request $request)
    {
        $good_warehouse_id = $request->good_warehouse_id;
        $warehouse_id = $request->warehouse_id;
        $quantity = $request->quantity;

        $goodWarehouse = GoodWarehouse::find($good_warehouse_id);
        $target_warehouse = Warehouse::find($warehouse_id);

        $targetGoodWarehouse = $target_warehouse->goodWarehouses()->where('good_id', $goodWarehouse->good->id)->first();
        if ($targetGoodWarehouse) {
            $targetGoodWarehouse->quantity += $quantity;
            $targetGoodWarehouse->save();
        } else {
            $targetGoodWarehouse = new GoodWarehouse();
            $targetGoodWarehouse->quantity = $quantity;
            $targetGoodWarehouse->good_id = $goodWarehouse->good->id;
            $targetGoodWarehouse->warehouse_id = $warehouse_id;
            $targetGoodWarehouse->save();
        }

        $goodWarehouse->quantity -= $quantity;
        $goodWarehouse->save();

        $exportGoods = new ImportedGoods();
        $exportGoods->quantity = -1 * $quantity;
        $exportGoods->good_id = $goodWarehouse->good->id;
        $exportGoods->warehouse_id = $goodWarehouse->warehouse->id;
        $exportGoods->staff_id = $this->user->id;
        $exportGoods->note = "Chuyển hàng sang kho " . $target_warehouse->name;
        $exportGoods->save();

        $importGoods = new ImportedGoods();
        $importGoods->quantity = $quantity;
        $importGoods->good_id = $goodWarehouse->good->id;
        $importGoods->warehouse_id = $target_warehouse->id;
        $importGoods->staff_id = $this->user->id;
        $importGoods->note = "Nhập hàng từ kho " . $goodWarehouse->warehouse->name;
        $importGoods->save();

        $request->session()->flash('message', 'Chuyển kho thành công');

        return redirect('/manage/warehouse/' . $goodWarehouse->warehouse->id);
    }


}
