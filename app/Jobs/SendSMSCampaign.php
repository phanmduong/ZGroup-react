<?php

namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendSMSCampaign extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $users;
    protected $smsTemplate;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($users, $smsTemplate)
    {
        $this->users = $users;
        $this->smsTemplate = $smsTemplate;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->users as $user) {
            send_sms($user['id'], $user['phone'], $this->smsTemplate->content, "campaign", $this->smsTemplate->id);
        }
    }
}
