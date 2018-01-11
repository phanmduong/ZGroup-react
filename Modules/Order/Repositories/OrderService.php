<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 11/13/17
 * Time: 10:54 AM
 */

namespace Modules\Order\Repositories;

use App\HistoryGood;
use App\ImportedGoods;
use App\Order;
use App\User;

class OrderService
{
    public function statusToNum($status)
    {
        switch ($status) {
            case 'place_order':
                return 0;
                break;
            case 'not_reach':
                return 1;
                break;
            case 'confirm_order':
                return 2;
                break;
            case 'ship_order':
                return 3;
                break;
            case 'completed_order':
                return 4;
                break;
            case 'cancel':
                return 5;
                break;
            default:
                return 0;
                break;
        }
    }

    public function importedGoodsExportProcess($goodOrder, $warehouseId)
    {
        $quantity = $goodOrder->quantity;
        while ($quantity > 0) {
            $importedGood = ImportedGoods::where('quantity', '>', 0)
                ->where('warehouse_id', $warehouseId)
                ->where('good_id', $goodOrder->good_id)
                ->orderBy('created_at', 'asc')->first();

            $history = new HistoryGood;
            $lastest_good_history = HistoryGood::where('good_id', $importedGood['good_id'])
                ->where('warehouse_id', $warehouseId)
                ->orderBy('created_at', 'desc')->first();
            $remain = $lastest_good_history ? $lastest_good_history->remain : 0;
            $history->good_id = $goodOrder->good_id;
            $history->quantity = min($goodOrder->quantity, $importedGood->quantity);
            $history->remain = $remain - min($goodOrder->quantity, $importedGood->quantity);
            $history->warehouse_id = $warehouseId;
            $history->type = 'order';
            $history->order_id = $goodOrder->order_id;
            $history->imported_good_id = $importedGood->id;
            $history->save();
            $quantity -= min($goodOrder->quantity, $importedGood->quantity);
        }
    }

    public function exportOrder($orderId, $warehouseId)
    {
        $order = Order::find($orderId);
        if ($order->exported == true)
            return [
                'status' => 0,
                'message' => 'Đã xuất hàng'
            ];
        $order->exported = true;
        $order->save();
        foreach ($order->goodOrders as $goodOrder) {
            $quantity = ImportedGoods::where('good_id', $goodOrder->good_id)
                ->where('warehouse_id', $warehouseId)
                ->sum('quantity');
            if ($goodOrder->quantity > $quantity)
                return [
                    'status' => 0,
                    'message' => 'Thiếu hàng: ' . $goodOrder->good->name,
                ];
        }
        foreach ($order->goodOrders as $goodOrder)
            $this->importedGoodsExportProcess($goodOrder, $warehouseId);
        return [
            'status' => 1,
            'message' => 'SUCCESS',
        ];
    }

    public function changeOrderStatus($orderId, $request, $user_id)
    {
        $order = Order::find($orderId);
        if ($this->statusToNum($order->status) < 2 && $this->statusToNum($request->status) >= 2 && $this->statusToNum($request->status) != 5) {
            $response = $this->exportOrder($order->id, $order->warehouse_id ? $order->warehouse_id : 4);
            if ($response['status'] == 0)
                return [
                    'status' => 0,
                    'message' => $response['message'],
                ];
            $order->warehouse_export_id = $order->warehouse_id ? $order->warehouse_id : $request->warehouse_id;
        }

        if ($order->type == 'import' && $request->status == 'completed') {
            $importedGoods = $order->importedGoods;
            foreach ($importedGoods as $importedGood) {
                $importedGood->status = 'completed';
                $importedGood->save();
                $history = new HistoryGood;
                $lastest_good_history = HistoryGood::where('good_id', $importedGood->good_id)->orderBy('created_at', 'desc')->first();
                $remain = $lastest_good_history ? $lastest_good_history->remain : 0;
                $history->good_id = $importedGood->good_id;
                $history->quantity = $importedGood->quantity;
                $history->remain = $remain + $importedGood->quantity;
                $history->warehouse_id = $importedGood->warehouse_id;
                $history->type = 'import';
                $history->order_id = $importedGood->order_import_id;
                $history->imported_good_id = $importedGood->id;
                $history->save();
            }
        }
        $order->status = $request->status;
        if ($request->label_id) {
            $order->label_id = $request->label_id;
        }
        $order->save();

        return [
            'status' => 1,
            'message' => 'SUCCESS'
        ];
    }
}