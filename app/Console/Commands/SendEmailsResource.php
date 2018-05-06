<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Foundation\Bus\DispatchesJobs;
use App\ProductSubscription;

class SendEmailsResource extends Command
{
    use DispatchesJobs;

    protected $signature = 'emailsSending:resource';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $date = new \DateTime();
        $formatted_time = $date->format('Y-m-d');

        $users = ProductSubscription::select(DB::raw('distinct user_id'), 'created_at')->get();
        
        
        // $shifts = Shift::where("date", $formatted_time)->get();



//         foreach ($shifts as $shift) {
//             $session = $shift->shift_session;
//             if ($session != null) {
//                 $startTime = $session->start_time;
//                 $endTime = $session->end_time;
//                 $delayedStartTime = strtotime($startTime) - time() - 30 * 60;
//                 $delayedEndTime = strtotime($endTime) - time() - 30 * 60;
// //                $delayedStartTime = 60;
// //                $delayedEndTime = 120;

//                 // Check In
//                 $previousSession = ShiftSession::where("end_time", $session->start_time)->first();
//                 if ($previousSession == null) {
//                     $this->sendCheckInSMJob($shift, $delayedStartTime);
//                 } else {
//                     $previousShift = $previousSession->shifts()->where("base_id", $shift->base_id)->where("date", $formatted_time)->first();
//                     if ($previousShift == null ||
//                         ($previousShift->user_id != $shift->user_id && $previousShift->base_id == $shift->base_id)) {
//                         $this->sendCheckInSMJob($shift, $delayedStartTime);
//                     }
//                 }

//                 // Check Out
//                 $nextSession = ShiftSession::where("start_time", $session->end_time)->first();
//                 if ($nextSession == null) {
//                     $this->sendCheckOutSMJob($shift, $delayedEndTime);
//                 } else {
//                     $nextShift = $nextSession->shifts()->where("base_id", $shift->base_id)->where("date", $formatted_time)->first();
//                     if ($nextShift == null ||
//                         ($nextShift->user_id != $shift->user_id && $nextShift->base_id == $shift->base_id)) {
//                         $this->sendCheckOutSMJob($shift, $delayedEndTime);
//                     }
//                 }

//             }
//         }
    }
}
