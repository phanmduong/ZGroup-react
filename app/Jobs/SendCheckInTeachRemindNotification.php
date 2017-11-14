<?php

namespace App\Jobs;

use App\Jobs\Job;
use App\Repositories\NotificationRepository;
use App\StudyClass;
use App\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendCheckInTeachRemindNotification extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;
    protected $user;
    protected $class;
    protected $time;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, StudyClass $class, $time)
    {
        $this->user = $user;
        $this->class = $class;
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
        $notificationRepository->sendRemindCheckInTeachNofication($this->user, $this->class, $this->time);
    }
}
