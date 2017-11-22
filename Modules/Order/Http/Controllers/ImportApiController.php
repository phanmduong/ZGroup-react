<?php

namespace Modules\Order\Http\Controllers;

use App\Good;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
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

    public function addImportOrderGoods(Request $request)
    {
        $importOrder = new Order;
        if ($request->code == null)
            $importOrder->code = rebuild_date('YmdHis', strtotime(Carbon::now()->toDateTimeString()));
        else
            $importOrder->code = $request->code;
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
            $orderPaidMoney->note = $request->note_paid_money ? $request->note_paid_money : '';
            $orderPaidMoney->save();
        }

        $orderImportId = $importOrder->id;
        foreach ($request->imported_goods as $imported_good) {
            $importedGood = new ImportedGoods;
            if ($imported_good['price']) {
                $good = Good::find($imported_good['good_id']);
                if ($good == null)
                    return $this->respondErrorWithStatus([
                        'message' => 'Không tồn tại sản phẩm'
                    ]);
                $good->price = $imported_good['price'];
                $good->save();
            }
            $importedGood->order_import_id = $orderImportId;
            $importedGood->good_id = $imported_good['good_id'];
            $importedGood->quantity = $imported_good['quantity'];
            $importedGood->import_quantity = $imported_good['quantity'];
            $importedGood->import_price = $imported_good['import_price'];
            $importedGood->status = $request->status ? $request->status : 'uncompleted';
            $importedGood->staff_id = $this->user->id;
            $importedGood->warehouse_id = $request->warehouse_id;
            $importedGood->save();
            if($request->status == 'completed')
            {
                $history = new HistoryGood;
                $lastest_good_history = HistoryGood::where('good_id', $imported_good['good_id'])->orderBy('created_at', 'desc')->limit(1)->get();
                $remain = $lastest_good_history ? $lastest_good_history ->remain : null;
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
        if($importOrder->status == 'completed')
            return $this->respondErrorWithStatus([
                'message' => 'Cant deleted completed import order'
            ]);
        foreach ($importOrder->importedGoods as $importedGood)
        {
            $importedGood->delete();
        }
        $importOrder->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}