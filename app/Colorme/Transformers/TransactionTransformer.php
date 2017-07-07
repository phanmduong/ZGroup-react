<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class TransactionTransformer extends Transformer
{

    protected $user_id;

    public function __construct()
    {
    }

    public function setUserId($userId)
    {
        $this->user_id = $userId;
    }

    public function transform($transaction)
    {
        $return_array = [
            'id' => $transaction->id,
            'type' => "receive",
            'money' => $transaction->money,
            'status' => transaction_status_raw($transaction->status),
            'created_at' => format_time_to_mysql(strtotime($transaction->created_at)),
            'type' => transaction_type_raw($transaction->type)
        ];
        if ($transaction->type == 0) {
            if ($transaction->receiver != null) {
                $return_array['receiver'] = [
                    'id' => $transaction->receiver->id,
                    'name' => $transaction->receiver->name
                ];
            }
            $return_array['note'] = "Người nhận: " . $transaction->receiver->name;
        } else {
            $return_array['note'] = $transaction->note;
        }
        if ($transaction->sender != null) {
            $return_array['sender'] = [
                'id' => $transaction->sender->id,
                'name' => $transaction->sender->name
            ];
        }

        return $return_array;
    }
}