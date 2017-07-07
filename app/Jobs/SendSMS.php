<?php

namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendSMS extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $register;
    protected $content;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($register, $content)
    {
        $this->register = $register;
        $this->content = $content;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        send_sms_general($this->register, $this->content);
    }
}
