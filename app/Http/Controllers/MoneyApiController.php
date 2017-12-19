<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\NotificationTransformer;
use App\Colorme\Transformers\StaffTransformer;
use App\Colorme\Transformers\TransactionTransformer;
use App\Notification;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Redis;

class MoneyApiController extends ApiController
{
    protected $staffTransformer;
    protected $transactionTransformer;
    protected $notificationTransformer;

    public function __construct(StaffTransformer $staffTransformer,
                                TransactionTransformer $transactionTransformer,
                                NotificationTransformer $notificationTransformer)
    {
        parent::__construct();
        $this->staffTransformer = $staffTransformer;
        $this->transactionTransformer = $transactionTransformer;
        $this->transactionTransformer->setUserId($this->user->id);
        $this->notificationTransformer = $notificationTransformer;
    }


    public function staffs( Request $request)
    {
        if ($request->q) {
            $search = $request->q;
        } else {
            $search = '';
        }

        $staffs = User::whereBetween('role', [1, 2])
            ->where('id', '!=', $this->user->id)
            ->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%');
            })
            ->paginate(20);
        return $this->respondWithPagination($staffs,
            [
                'data' => $this->staffTransformer->transformCollection($staffs)
            ]);
    }

    public function confirm_transaction( Request $request)
    {
        $transaction_id = $request->transaction_id;
        $status = $request->status;

        if ($transaction_id == null || $status == null) {
            return $this->responseBadRequest('transaction_id and status are required');
        }
        if ($status != -1 && $status != 1) {
            return $this->responseBadRequest('status must be either 1 or -1');
        }

        $transaction = Transaction::find($transaction_id);
        if ($transaction->status != 0) {
            return $this->responseBadRequest('Giao dịch này không ở trạng thái pending');
        }
        $transaction->status = $status;
        $transaction->sender->status = 0;
        if ($status == 1) {
            $transaction->sender->money = $transaction->sender->money - $transaction->money;
            $transaction->receiver->money = $transaction->receiver->money + $transaction->money;
        }

        $transaction->save();
        $transaction->sender->save();
        $transaction->receiver->save();

        $notification = new Notification;
        $notification->product_id = $transaction->id;
        $notification->actor_id = $transaction->receiver->id;
        $notification->receiver_id = $transaction->sender->id;
        $notification->type = 4;
        $notification->save();


        $data = array(
            "message" => "Bạn chuyển tiền cho " . $transaction->receiver->name . " " . transaction_status_raw($transaction->status),
            "link" => "",
            'transaction' => [
                'id' => $transaction->id,
                'sender' => $transaction->sender->name,
                'receiver' => $transaction->receiver->name,
                'status' => transaction_status_raw($transaction->status),
                'money' => $transaction->money
            ],
            'created_at' => format_date_full_option($notification->created_at),
            "receiver_id" => $notification->receiver_id
        );

        $publish_data = array(
            "event" => "notification",
            "data" => $data
        );

        Redis::publish(config('app.channel'), json_encode($publish_data));

        $publish_data = array(
            "event" => "notification",
            "data" => [
                "notification" => $this->notificationTransformer->transform($notification),
            ]
        );
        Redis::publish(config('app.channel'), json_encode($publish_data));

        $return_data = [
            'transaction' => [
                'sender' => $transaction->sender->name,
                'receiver' => $transaction->receiver->name,
                'status' => transaction_status_raw($transaction->status),
                'money' => $transaction->money
            ]
        ];


        return $this->respond($return_data);
    }

    public function get_transactions( Request $request)
    {
        $limit = 20;
        if ($request->limit) {
            $limit = $request->limit;
        }
        $transactions = Transaction::where('sender_id', $this->user->id)
            ->orWhere('receiver_id', $this->user->id)->orderBy('created_at', 'desc')
            ->paginate($limit);
        return $this->respondWithPagination($transactions,
            [
                "data" => [
                    'transactions' => $this->transactionTransformer->transformCollection($transactions),
                    'current_money' => $this->user->money,
                    'status' => $this->user->status
                ]
            ]
        );

    }

    public function create_transaction( Request $request)
    {
        if ($this->user->status == 2) {
            return $this->responseBadRequest('Nhân viên này đang chuyển tiền.');
        } else {
            $this->user->status = 2;
            $this->user->save();

            $transaction = new Transaction();
            $transaction->status = 0;
            $transaction->sender_id = $this->user->id;
            $transaction->receiver_id = $request->receiver_id;
            $transaction->receiver_money = User::find($request->receiver_id)->money;
            $transaction->money = $this->user->money;
            $transaction->save();

            $notification = new Notification();
            $notification->product_id = $transaction->id;
            $notification->actor_id = $this->user->id;
            $notification->receiver_id = $request->receiver_id;
            $notification->type = 3;
            $notification->save();

            $data = array(
                "message" => $notification->actor->name . " vừa chuyển tiền cho bạn và đang chờ bạn xác nhận.",
                "link" => "",
                'transaction' => [
                    'id' => $transaction->id,
                    'sender' => $transaction->sender->name,
                    'receiver' => $transaction->receiver->name,
                    'status' => transaction_status_raw($transaction->status),
                    'money' => $transaction->money
                ],
                'created_at' => format_date_full_option($notification->created_at),
                "receiver_id" => $notification->receiver_id
            );

            $publish_data = array(
                "event" => "notification",
                "data" => $data
            );


            Redis::publish(config('app.channel'), json_encode($publish_data));

            $publish_data = array(
                "event" => "notification",
                "data" => [
                    "notification" => $this->notificationTransformer->transform($notification),
                ]
            );
            Redis::publish(config('app.channel'), json_encode($publish_data));

            return $this->respond([
                'transaction' => [
                    'sender' => $transaction->sender->name,
                    'receiver' => $transaction->receiver->name,
                    'status' => transaction_status_raw($transaction->status),
                    'money' => $transaction->money
                ],
            ]);
        }
    }
}
