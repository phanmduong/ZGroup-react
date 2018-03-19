<?php

namespace App\Console\Commands;

use App\Jobs\SendCheckInWorkShiftNotification;
use App\Jobs\SendCheckOutWorkShiftNotification;
use App\WorkShiftSession;
use App\WorkShiftUser;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class WorkShiftsCheckInCheckOutNoti extends Command
{
    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notification:checkincheckout:workshift';

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

    private function sendCheckInWorkShiftJob($workShiftUser, $delayedStartTime)
    {
        $sendCheckInWorkShiftJob = (new SendCheckInWorkShiftNotification($workShiftUser))->delay($delayedStartTime);
        $this->dispatch($sendCheckInWorkShiftJob);
    }

    private function sendCheckOutWorkShiftJob($workShiftUser, $delayedEndTime)
    {
        $sendCheckOutWorkShiftJob = (new SendCheckOutWorkShiftNotification($workShiftUser))->delay($delayedEndTime);
        $this->dispatch($sendCheckOutWorkShiftJob);
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

        // Shift
        $workShiftUsers = WorkShiftUser::join("work_shifts", "work_shifts.id", "=", "work_shift_user.work_shift_id")
            ->select("work_shift_user.*")
            ->where("work_shifts.date", $formatted_time)->get();

        foreach ($workShiftUsers as $workShiftUser) {
            $session = $workShiftUser->workShift->work_shift_session;
            if ($session != null) {
                $startTime = $session->start_time;
                $endTime = $session->end_time;
                $delayedStartTime = strtotime($startTime) - time() - 30 * 60;
                $delayedEndTime = strtotime($endTime) - time();
//                $delayedStartTime = 60;
//                $delayedEndTime = 120;

                // Check In
                $previousSession = WorkShiftSession::where("end_time", $session->start_time)->first();
                if ($previousSession == null) {
                    $this->sendCheckInWorkShiftJob($workShiftUser, $delayedStartTime);
                }

//                else {
//                    $workShift = $workShiftUser->workShift;
//                    $previousWorkShift = $previousSession->work_shifts()->where("base_id", $workShift->base_id)
//                        ->where("date", $formatted_time)->first();
//                    if ($previousWorkShift) {
//                        $previousWorkShiftUser = WorkShiftUser::where("work_shift_id", $previousWorkShift->id)->first();
//
//                        if ($previousWorkShiftUser == null ||
//                            ($workShiftUser->user_id != $previousWorkShiftUser->user->id &&
//                                $previousWorkShiftUser->workShift->base_id == $workShiftUser->workShift->base_id)) {
//                            $this->sendCheckInWorkShiftJob($workShiftUser, $delayedStartTime);
//                        }
//                    }
//
//                }

                // Check Out
                $nextSession = WorkShiftSession::where("start_time", $session->end_time)->first();
                if ($nextSession == null) {
                    $this->sendCheckOutWorkShiftJob($workShiftUser, $delayedEndTime);
                }
//                else {
//                    $nextWorkShift = $nextSession->work_shifts()->where("base_id", $workShiftUser->base_id)
//                        ->where("date", $formatted_time)->first();
//
//                    if ($nextWorkShift) {
//                        $nextWorkShiftUser = WorkShiftUser::where("work_shift_id", $nextWorkShift->id)->first();
//
//                        if ($nextWorkShiftUser == null ||
//                            ($workShiftUser->user_id != $nextWorkShiftUser->user_id &&
//                                $nextWorkShiftUser->workShift->base_id == $workShiftUser->workShift->base_id)) {
//                            $this->sendCheckOutWorkShiftJob($workShiftUser, $delayedEndTime);
//                        }
//                    }
//
//                }

            }
        }
    }
}
