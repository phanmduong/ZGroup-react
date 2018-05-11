<?php

namespace App\Console\Commands;

use App\Colorme\Transformers\NotificationTransformer;
use App\Notification;
use App\Transaction;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class CancelTransactions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transactions:cancel';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    protected $notificationTransformer;

    /**
     * Create a new command instance.
     *
     * @param NotificationRepository $notificationRepository
     */
    public function __construct(NotificationTransformer $notificationTransformer)
    {
        parent::__construct();
        $this->notificationTransformer = $notificationTransformer;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $date = new \DateTime();
        $date->modify('-5 minutes');
        $time = $date->format('Y-m-d H:i');
        $transactions = Transaction::where('type', '=', 0)->where('status', '=', 0)->whereRaw('"' . $time . '" = DATE_FORMAT(created_at, "%Y-%m-%d %H:%i")')->get();
        foreach ($transactions as $transaction) {
            $transaction->status = -1;
            $transaction->sender->money = $transaction->sender->money + $transaction->money;
            $transaction->sender->status = 0;
            $transaction->save();
            $transaction->sender->save();
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
        }
    }
}
