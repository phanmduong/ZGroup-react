<?php

namespace App\Console\Commands;

use App\ClassLesson;
use App\Jobs\SendCheckInTeachRemindNotification;
use App\Jobs\SendCheckOutTeachRemindNotification;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class SendCheckInCheckOutNotification extends Command
{
    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notification:checkincheckout';

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
        $formatted_time = $date->format('Y-m-d');
        $classLessons = ClassLesson::where("time", $formatted_time)->get();
        foreach ($classLessons as $classLesson) {
            $startTime = $classLesson->start_time;
            $endTime = $classLesson->end_time;
            $delayedStartTime = strtotime($startTime) - time() - 30 * 60;
            $delayedEndTime = strtotime($endTime) - time() - 30 * 60;
//            $this->info($delayedStartTime);

            $class = $classLesson->studyClass;
            if ($class) {
                if ($class->teach) {
                    if ($delayedStartTime > 0) {
                        $sendCheckInTeachJob = (new SendCheckInTeachRemindNotification($class->teach, $class, $startTime))->delay($delayedStartTime);
                        $this->dispatch($sendCheckInTeachJob);
                    }
                    if ($delayedEndTime > 0) {
                        $sendCheckOutTeachJob = (new SendCheckOutTeachRemindNotification($class->teach, $class, $endTime))->delay($delayedEndTime);
                        $this->dispatch($sendCheckOutTeachJob);
                    }
                }
                if ($class->assist) {
                    if ($delayedStartTime > 0) {
                        $sendCheckInTeachJob = (new SendCheckInTeachRemindNotification($class->assist, $class, $startTime))->delay($delayedStartTime);
                        $this->dispatch($sendCheckInTeachJob);
                    }
                    if ($delayedEndTime > 0) {
                        $sendCheckOutTeachJob = (new SendCheckOutTeachRemindNotification($class->assist, $class, $endTime))->delay($delayedEndTime);
                        $this->dispatch($sendCheckOutTeachJob);
                    }
                }
            }


        }

    }
}
