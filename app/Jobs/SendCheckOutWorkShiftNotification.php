<?php

namespace App\Jobs;

use App\Repositories\NotificationRepository;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendCheckOutWorkShiftNotification extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;
    protected $workShiftUser;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($workShiftUser)
    {
        $this->workShiftUser = $workShiftUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $notificationRepository = new NotificationRepository();
        $notificationRepository->sendRemindCheckOutWorkShiftNofication($this->workShiftUser);
    }
}
