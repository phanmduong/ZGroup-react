<?php

namespace App\Console\Commands;

use App\SmsTemplate;
use Illuminate\Console\Command;

class SendSmsCampaign extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'smsCampaign:send';

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
        $smsTemplates = SmsTemplate::where('status', 'pending')->whereRaw('"' . rebuild_date('Y-m-d H:i', time()) . '" = DATE_FORMAT(send_time, "%Y-%m-%d %H:%i")')->get();
        if ($smsTemplates->count() > 0) {
            foreach ($smsTemplates as $smsTemplate) {
                $smsTemplate->status = 'sending';
                $smsTemplate->save();
                $users = $smsTemplate->smsList->group->user()->get()->toArray();
                $users_chunk = array_chunk($users, 20);
                foreach ($users_chunk as $users_array) {
                    $job = new \App\Jobs\SendSMSCampaign($users_array, $smsTemplate);
                    dispatch($job);
                }
                $smsTemplate->status = 'sent';
                $smsTemplate->save();
            }
        }
    }
}
