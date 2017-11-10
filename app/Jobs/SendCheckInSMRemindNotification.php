<?php

namespace App\Jobs;

use App\Jobs\Job;
use App\Repositories\NotificationRepository;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendCheckInSMRemindNotification extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;
    protected $user;
    protected $shift;
    protected $time;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $shift, $time)
    {
        $this->shift = $shift;
        $this->user = $user;
        $this->time = $time;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $notificationRepository = new NotificationRepository();
    }
}
