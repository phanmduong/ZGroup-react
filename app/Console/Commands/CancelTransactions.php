<?php

namespace App\Console\Commands;

use App\Transaction;
use Illuminate\Console\Command;

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
    public function __construct()
    {
        parent::__construct();
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
            $transaction->save();
        }
    }
}
