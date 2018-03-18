<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 3/14/18
 * Time: 15:21
 */

namespace Modules\Finance\Http\Controllers;


use App\Http\Controllers\ManageApiController;

class ManageMoneyTransferApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function receive_transactions()
    {

        $limit = 20;

        $receive_transactions = $this->user->receive_transactions()->where('type', 0)
            ->orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            "receive_transactions" => $receive_transactions->map(function ($transaction) {
                $data = [
                    'status' => $transaction->status,
                    'created_at' => format_vn_short_datetime(strtotime($transaction->created_at)),
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                ];
                if ($transaction->sender) {
                    $data['sender'] = $transaction->sender;
                }
                if ($transaction->receiver) {
                    $data['receiver'] = $transaction->receiver;
                }
                return $transaction;
            })
        ];
        return $this->respondWithPagination($receive_transactions, $data);
    }

    public function send_transactions()
    {

        $limit = 20;

        $send_transactions = $this->user->send_transactions()->where('type', 0)
            ->orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            "send_transactions" => $send_transactions->map(function ($transaction) {
                $data = [
                    'status' => $transaction->status,
                    'created_at' => format_vn_short_datetime(strtotime($transaction->created_at)),
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                ];
                if ($transaction->sender) {
                    $data['sender'] = $transaction->sender;
                }
                if ($transaction->receiver) {
                    $data['receiver'] = $transaction->receiver;
                }
                return $transaction;
            })
        ];
        return $this->respondWithPagination($send_transactions, $data);
    }
}