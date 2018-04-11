<?php

namespace Modules\Order\Http\Controllers;

use App\Good;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\OrderPaidMoney;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Order;

class ImportApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function payImportOrder($orderId, Request $request)
    {
        if (Order::find($orderId)->get() == null)
            return $this->respondErrorWithStatus("Order không tồn tại");
        if ($request->money == null)
            return $this->respondErrorWithStatus("Thiếu tiền thanh toán");
        $debt = Order::find($orderId)->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity * $importedGood->import_price;
            }, 0) - Order::find($orderId)->orderPaidMoneys->reduce(function ($paid, $orderPaidMoney) {
                return $paid + $orderPaidMoney->money;
            }, 0);

        if ($request->money > $debt)
            return $this->respondErrorWithStatus("Thanh toán quá số tiền còn nợ " . $debt);
        if ($debt == 0) {
            $order = Order::find($orderId)->get();
            $order->status_paid = 1;
        }
        $orderPaidMoney = new OrderPaidMoney;
        $orderPaidMoney->order_id = $orderId;
        $orderPaidMoney->money = $request->money;
        $orderPaidMoney->note = $request->note;
        $orderPaidMoney->payment = $request->payment;
        $orderPaidMoney->staff_id = $this->user->id;
        $orderPaidMoney->save();
        return $this->respondSuccessWithStatus([
            'order_paid_money' => $orderPaidMoney
        ]);
    }

    public function allImportOrders(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = trim($request->search);
        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));
        $status = $request->status;
        $staff_id = $request->staff_id;

        $importOrders = Order::where('type', 'import');
        if ($keyword) {
            $userIds = User::where(function ($query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%")->orWhere('phone', 'like', "%$keyword%")->orWhere('email', 'like', "%$keyword%");
            })->pluck('id')->toArray();
            $importOrders = $importOrders->where(function ($query) use ($keyword, $userIds) {
                $query->whereIn('user_id', $userIds)->orWhere('code', 'like', "%$keyword%");
            });
        }

        if ($staff_id)
            $importOrders = $importOrders->where('staff_id', $staff_id);
        if ($startTime)
            $importOrders = $importOrders->whereBetween('created_at', array($startTime, $endTime));
        if ($status)
            $importOrders = $importOrders->where('status', $status);
        $importOrders = $importOrders->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination(
            $importOrders,
            [
                'import_orders' => $importOrders->map(function ($importOrder) {
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
                    if (isset($importOrder->warehouse))
                        $importOrderData['warehouse'] = $importOrder->warehouse->Transform();
                    return $importOrderData;
                })
            ]
        );
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
        $paid_money = $importOrder->orderPaidMoneys->reduce(function ($total, $orderPaidMoney) {
            return $total + $orderPaidMoney->money;
        }, 0);
        $orderPaidMoney = $importOrder->orderPaidMoneys()->first();
        $debt = $total_money - $paid_money;
        $data = [
            'id' => $importOrder->id,
            'name' => $importOrder->name,
            'code' => $importOrder->code,
            'created_at' => format_vn_short_datetime(strtotime($importOrder->created_at)),
            'note' => $importOrder->note,
            'total_money' => $total_money,
            'total_quantity' => $total_quantity,
            'debt' => $debt,
            'paid_money' => $paid_money,
            'payment' => $orderPaidMoney ? $orderPaidMoney->payment : '',
            'warehouse' => $importOrder->warehouse->Transform(),
        ];
        $data['imported_goods'] = $importOrder->importedGoods->map(function ($importedGood) {
            return [
                'id' => $importedGood->good->id,
                'name' => $importedGood->good->name,
                'code' => $importedGood->good->code,
                'barcode' => $importedGood->good->barcode,
                'price' => $importedGood->good->price,
                'quantity' => $importedGood->quantity,
                'import_price' => $importedGood->import_price,
            ];
        });
        $data['order_paid_money'] = $importOrder->orderPaidMoneys->map(function ($orderPaidMoney) {
            return [
                'id' => $orderPaidMoney->id,
                'money' => $orderPaidMoney->money,
                'note' => $orderPaidMoney->note,
            ];
        });
        if ($importOrder->warehouse)
            $data['warehouse'] = $importOrder->warehouse->Transform();
        if (isset($importOrder->user)) {
            $user = [
                'id' => $importOrder->user->id,
                'name' => $importOrder->user->name,
                'phone' => $importOrder->user->phone,
                'email' => $importOrder->user->email,
            ];
            $data['user'] = $user;
        }
        return $this->respondSuccessWithStatus([
            'import_order' => $data,
        ]);
    }

    public function addImportOrderGoods(Request $request)
    {
        $importOrder = new Order;
        $importOrder->code = $request->code ? $request->code : 'IMPORT' . rebuild_date('Ymd', strtotime(Carbon::now()->toDateTimeString()));
        $importOrder->note = $request->note;
        $importOrder->warehouse_id = $request->warehouse_id;
        $importOrder->staff_id = $this->user->id;
        $importOrder->user_id = $request->user_id;
        $importOrder->type = 'import';

        $importOrder->status = $request->status ? $request->status : 'uncompleted';
        $importOrder->save();
        if ($request->paid_money) {
            $orderPaidMoney = new OrderPaidMoney;
            $orderPaidMoney->order_id = $importOrder->id;
            $orderPaidMoney->money = $request->paid_money;
            $orderPaidMoney->staff_id = $this->user->id;
            $orderPaidMoney->payment = $request->payment;
            $orderPaidMoney->note = $request->note_paid_money ? $request->note_paid_money : '';
            $orderPaidMoney->save();
        }

        $orderImportId = $importOrder->id;
        foreach ($request->imported_goods as $imported_good) {
            $importedGood = new ImportedGoods;
            $good = Good::find($imported_good['good_id']);
            if ($good == null) {
                $good = new Good();
                $good->code = $imported_good['code'];
                $good->barcode = $imported_good['barcode'];
                $good->name = $imported_good['name'];
                $good->price = 0;
                $good->save();
            }
            if ($imported_good['price']) {
                $good->price = $imported_good['price'];
                $good->save();
            }
            $importedGood->order_import_id = $orderImportId;
            $importedGood->good_id = $good->id;
            $importedGood->quantity = $imported_good['quantity'];
            $importedGood->import_quantity = $imported_good['quantity'];
            $importedGood->import_price = $imported_good['import_price'];
            $importedGood->status = $request->status ? $request->status : 'uncompleted';
            $importedGood->staff_id = $this->user->id;
            $importedGood->warehouse_id = $request->warehouse_id;
            $importedGood->save();
            if ($request->status == 'completed') {
                $history = new HistoryGood;
                $lastest_good_history = HistoryGood::where('good_id', $imported_good['good_id'])->orderBy('created_at', 'desc')->first();
                $remain = $lastest_good_history ? $lastest_good_history->remain : 0;
                $history->good_id = $imported_good["good_id"];
                $history->quantity = $imported_good['quantity'];
                $history->remain = $remain + $imported_good['quantity'];
                $history->warehouse_id = $request->warehouse_id;
                $history->type = 'import';
                $history->order_id = $importOrder->id;
                $history->imported_good_id = $importedGood->id;
                $history->save();
            }
        }
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deleteImportOrder($importOrderId, Request $request)
    {
        $importOrder = Order::find($importOrderId);
        if ($importOrder->status == 'completed')
            return $this->respondErrorWithStatus([
                'message' => 'Cant deleted completed import order'
            ]);
        foreach ($importOrder->importedGoods as $importedGood) {
            $importedGood->delete();
        }
        $importOrder->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editImportOrder($importOrderId, Request $request)
    {
        foreach ($request->imported_goods as $imported_good) {
            $good = Good::find($imported_good['good_id']);
            if ($good == null)
                return $this->respondErrorWithStatus([
                    'message' => 'Không tồn tại sản phẩm'
                ]);
        }
        $importOrder = Order::find($importOrderId);
        if ($importOrder == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại đơn nhập hàng'
            ]);
        if ($importOrder->status == 'completed')
            return $this->respondErrorWithStatus([
                'message' => 'Cant edit completed import order'
            ]);
        $importOrder->code = $request->code ? $request->code : "IMPORT" . rebuild_date('Ymd', strtotime(Carbon::now()->toDateTimeString()));
        $importOrder->note = $request->note;
        $importOrder->warehouse_id = $request->warehouse_id;
        $importOrder->staff_id = $this->user->id;
        $importOrder->user_id = $request->user_id;
        $importOrder->type = 'import';
        $importOrder->status = $request->status;
        $importOrder->save();

        $importOrder->orderPaidMoneys->map(function ($orderPaidMoney) {
            $orderPaidMoney->delete();
        });

        if ($request->paid_money) {
            $orderPaidMoney = new OrderPaidMoney;
            $orderPaidMoney->order_id = $importOrder->id;
            $orderPaidMoney->money = $request->paid_money;
            $orderPaidMoney->staff_id = $this->user->id;
            $orderPaidMoney->payment = $request->payment;
            $orderPaidMoney->note = $request->note_paid_money ? $request->note_paid_money : '';
            $orderPaidMoney->save();
        }

        $orderImportId = $importOrder->id;
        $importedGoods = $importOrder->importedGoods;
        foreach ($importedGoods as $importedGood) {
            $importedGood->delete();
        }
        foreach ($request->imported_goods as $imported_good) {
            $importedGood = new ImportedGoods;
            $good = Good::find($imported_good['good_id']);
            if ($good == null) {
                $good = new Good();
                $good->code = $imported_good['code'];
                $good->barcode = $imported_good['barcode'];
                $good->name = $imported_good['name'];
                $good->price = 0;
                $good->save();
            }
            if ($imported_good['price']) {
                $good->price = $imported_good['price'];
                $good->save();
            }
            $importedGood->order_import_id = $orderImportId;
            $importedGood->good_id = $good->id;
            $importedGood->quantity = $imported_good['quantity'];
            $importedGood->import_quantity = $imported_good['quantity'];
            $importedGood->import_price = $imported_good['import_price'];
            $importedGood->status = $request->status ? $request->status : 'uncompleted';
            $importedGood->staff_id = $this->user->id;
            $importedGood->warehouse_id = $request->warehouse_id;
            $importedGood->save();
            if ($request->status == 'completed') {
                $history = new HistoryGood;
                $lastest_good_history = HistoryGood::where('good_id', $imported_good['good_id'])->orderBy('created_at', 'desc')->first();
                $remain = $lastest_good_history ? $lastest_good_history->remain : null;
                $history->good_id = $imported_good["good_id"];
                $history->quantity = $imported_good['quantity'];
                $history->remain = $remain + $imported_good['quantity'];
                $history->warehouse_id = $request->warehouse_id;
                $history->type = 'import';
                $history->order_id = $importOrder->id;
                $history->imported_good_id = $importedGood->id;
                $history->save();
            }
        }
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}