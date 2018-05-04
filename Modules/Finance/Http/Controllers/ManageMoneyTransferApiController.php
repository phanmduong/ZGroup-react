<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 3/14/18
 * Time: 15:21
 */

namespace Modules\Finance\Http\Controllers;


use App\Colorme\Transformers\NotificationTransformer;
use App\Http\Controllers\ManageApiController;
use App\Notification;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ManageMoneyTransferApiController extends ManageApiController
{
    protected $notificationTransformer;

    public function __construct(NotificationTransformer $notificationTransformer)
    {
        $this->notificationTransformer = $notificationTransformer;
        parent::__construct();
    }

    public function transactions(Request $request)
    {

        $limit = 20;

        if ($request->type == null) {
            $transactions = Transaction::where(function ($q) {
                $q->where('sender_id', $this->user->id)->orWhere('receiver_id', $this->user->id);
            });
        } else {
            if ($request->type == "send") {
                $transactions = $this->user->send_transactions();
            } else {
                $transactions = $this->user->receive_transactions();
            }
        }

        if ($request->status != null) {
            $transactions = $transactions->where('status', $request->status);
        }

        $transactions = $transactions->where('type', 0)->orderBy('updated_at', 'desc')->paginate($limit);

        $data = [
            "transactions" => $transactions->map(function ($transaction) {
                $data = [
                    'id' => $transaction->id,
                    'status' => $transaction->status,
                    'created_at' => format_vn_short_datetime(strtotime($transaction->created_at)),
                    'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
                    'money' => $transaction->money,
                    'sender_money' => $transaction->sender_money,
                    'receiver_money' => $transaction->receiver_money,
                ];
                if ($transaction->sender) {
                    $data['sender'] = $transaction->sender->getData();
                }
                if ($transaction->receiver) {
                    $data['receiver'] = $transaction->receiver->getData();
                }
                return $data;
            })
        ];
        return $this->respondWithPagination($transactions, $data);
    }

    public function create_transaction(Request $request)
    {
        if ($this->user->status == 2) {
            return $this->respondErrorWithStatus('Nhân viên này đang chuyển tiền.');
        }

        if ($request->money == null) {
            return $this->respondErrorWithStatus('Vui lòng nhập số tiền gửi');
        }

        if ($request->money < 0) {
            return $this->respondErrorWithStatus('Số tiền gửi không được nhỏ hơn 0');
        }

        $receiver = User::find($request->receiver_id);

        if ($receiver == null) {
            return $this->respondErrorWithStatus('Vui lòng chọn người nhận');
        }

        if ($this->user->money < $request->money) {
            return $this->respondErrorWithStatus('Bạn đang chuyển nhiều hơn số tiền hiện có');
        }

        $this->user->status = 2;
        $this->user->save();

        $transaction = new Transaction();
        $transaction->status = 0;
        $transaction->sender_id = $this->user->id;
        $transaction->receiver_id = $receiver->id;
        $transaction->receiver_money = $receiver->money;
        $transaction->sender_money = $this->user->money;
        $transaction->money = $request->money;
        $transaction->save();

        $notification = new Notification();
        $notification->product_id = $transaction->id;
        $notification->actor_id = $this->user->id;
        $notification->receiver_id = $receiver->id;
        $notification->type = 3;
        $notification->save();

        $data = array(
            "message" => $notification->actor->name . " vừa chuyển tiền cho bạn và đang chờ bạn xác nhận.",
            "link" => "",
            'transaction' => [
                'id' => $transaction->id,
                'sender' => $transaction->sender->name,
                'receiver' => $transaction->receiver->name,
                'sender_id' => $transaction->sender_id,
                'receiver_id' => $transaction->receiver_id,
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


        $data = [
            'id' => $transaction->id,
            'status' => $transaction->status,
            'created_at' => format_vn_short_datetime(strtotime($transaction->created_at)),
            'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
            'money' => $transaction->money,
            'sender_money' => $transaction->sender_money,
            'receiver_money' => $transaction->receiver_money,
        ];
        if ($transaction->sender) {
            $data['sender'] = $transaction->sender;
        }
        if ($transaction->receiver) {
            $data['receiver'] = $transaction->receiver;
        }

        return $this->respondSuccessWithStatus([
            'transaction' => $data,
        ]);
    }


    public function confirm_transaction(Request $request)
    {
        $transaction_id = $request->transaction_id;
        $status = $request->status;

        if ($transaction_id == null || $status == null) {
            return $this->respondErrorWithStatus('transaction_id and status are required');
        }
        if ($status != -1 && $status != 1) {
            return $this->respondErrorWithStatus('status must be either 1 or -1');
        }

        $transaction = Transaction::find($transaction_id);
        if ($transaction->status != 0) {
            return $this->respondErrorWithStatus('Giao dịch này không ở trạng thái pending');
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
                'sender_id' => $transaction->sender_id,
                'receiver_id' => $transaction->receiver_id,
                'status' => transaction_status_raw($transaction->status),
                'money' => $transaction->money
            ],
            'created_at' => format_date_full_option($notification->created_at),
            "receiver_id" => $notification->receiver_id,
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

        $data = [
            'id' => $transaction->id,
            'status' => $transaction->status,
            'created_at' => format_vn_short_datetime(strtotime($transaction->created_at)),
            'updated_at' => format_vn_short_datetime(strtotime($transaction->updated_at)),
            'money' => $transaction->money,
            'sender_money' => $transaction->sender_money,
            'receiver_money' => $transaction->receiver_money,
        ];
        if ($transaction->sender) {
            $data['sender'] = $transaction->sender->getData();
        }
        if ($transaction->receiver) {
            $data['receiver'] = $transaction->receiver->getData();
        }

        return $this->respondSuccessWithStatus([
            'transaction' => $data,
        ]);
    }

}