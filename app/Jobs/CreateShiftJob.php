<?php

namespace App\Jobs;

use App\Base;
use App\Gen;
use App\Jobs\Job;
use App\Role;
use App\Services\EmailService;
use App\Shift;
use App\ShiftSession;
use App\Tab;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateShiftJob extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $emailService;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->emailService = new EmailService();
        $date = new \DateTime();
        $date->modify('+3 days');
//        $date->modify('+2 days');
        $formatted_date_from = $date->format('Y-m-d');
        $date->modify('+6 days');
        $formatted_date_to = $date->format('Y-m-d');
        $dates = createDateRangeArray(strtotime($formatted_date_from), strtotime($formatted_date_to));
        $bases = Base::where('center', 1)->get();
        $current_gen = Gen::getCurrentGen();
        $shiftSessions = ShiftSession::where('active', 1)->get();
        $lastShift = Shift::where('gen_id', $current_gen->id)->orderBy('week', 'desc')->first();
        $week = $lastShift ? $lastShift->week : 0;

        foreach ($dates as $date) {
            foreach ($bases as $base) {
                foreach ($shiftSessions as $shiftSession) {
                    $shift = Shift::where("base_id", $base->id)->where("gen_id", $current_gen->id)->where("shift_session_id", $shiftSession->id)->where("date", $date)->first();
                    if (is_null($shift)) {
                        $shift = new Shift();
                        $shift->gen_id = $current_gen->id;
                        $shift->base_id = $base->id;
                        $shift->shift_session_id = $shiftSession->id;
                        $shift->week = $week + 1;
                        $shift->date = $date;
                        $shift->save();
                    }
                }
            }
        }

//        $role_ids = Tab::find(35)->roles->pluck('id')->unique()->toArray();
//        $roles = Role::whereIn('id', $role_ids)->get();
//        if ($week == 0) {
//            $week = 1;
//        }
//        foreach ($roles as $role) {
//            $users = $role->users;
//            foreach ($users as $user) {
//                $this->emailService->send_mail_regis_shift($user, $week, $current_gen, ['test@colorme.vn']);
//            }
//        }
    }
}
