<?php

namespace App\Console\Commands;

use App\Jobs\SendCheckInSMRemindNotification;
use App\Jobs\SendCheckOutSMRemindNotification;
use App\Shift;
use App\ShiftSession;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class CheckInCheckOutSMNotification extends Command
{
    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notification:checkincheckoutsm';

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

    private function sendCheckInSMJob($shift, $delayedStartTime)
    {
        $sendCheckInSMJob = (new SendCheckInSMRemindNotification($shift))->delay($delayedStartTime);
        $this->dispatch($sendCheckInSMJob);
    }

    private function sendCheckOutSMJob($shift, $delayedEndTime)
    {
        $sendCheckOutSMJob = (new SendCheckOutSMRemindNotification($shift))->delay($delayedEndTime);
        $this->dispatch($sendCheckOutSMJob);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $date = new \DateTime();
//        $date->modify("+1 days");
        $formatted_time = $date->format('Y-m-d');
        // Sale and Marketing
        $shifts = Shift::where("date", $formatted_time)->get();
        foreach ($shifts as $shift) {
            $session = $shift->shift_session;
            if ($session != null) {
                $startTime = $session->start_time;
                $endTime = $session->end_time;
                $delayedStartTime = strtotime($startTime) - time() - 30 * 60;
                $delayedEndTime = strtotime($endTime) - time() - 30 * 60;
//                $delayedStartTime = 60;
//                $delayedEndTime = 120;

                // Check In
                $previousSession = ShiftSession::where("end_time", $session->start_time)->first();
                if ($previousSession == null) {
                    $this->sendCheckInSMJob($shift, $delayedStartTime);
                } else {
                    $previousShift = $previousSession->shifts()->where("base_id", $shift->base_id)->where("date", $formatted_time)->first();
                    if ($previousShift == null ||
                        ($previousShift->user_id != $shift->user_id && $previousShift->base_id == $shift->base_id)) {
                        $this->sendCheckInSMJob($shift, $delayedStartTime);
                    }
                }

                // Check Out
                $nextSession = ShiftSession::where("start_time", $session->end_time)->first();
                if ($nextSession == null) {
                    $this->sendCheckOutSMJob($shift, $delayedEndTime);
                } else {
                    $nextShift = $nextSession->shifts()->where("base_id", $shift->base_id)->where("date", $formatted_time)->first();
                    if ($nextShift == null ||
                        ($nextShift->user_id != $shift->user_id && $nextShift->base_id == $shift->base_id)) {
                        $this->sendCheckOutSMJob($shift, $delayedEndTime);
                    }
                }

            }
        }
    }
}
