<?php

namespace App\Console\Commands;

use App\Base;
use App\Gen;
use App\Role;
use App\Shift;
use App\ShiftSession;
use App\Tab;
use Illuminate\Console\Command;

class CreateShifts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'shift:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create shifts';

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
        $date->modify('+2 days');
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

        $role_ids = Tab::find(35)->roles->pluck('id')->unique()->toArray();
        $roles = Role::whereIn('id', $role_ids)->get();
        if ($week == 0) {
            $week = 1;
        }
        foreach ($roles as $role) {
            $users = $role->users;
            foreach ($users as $user) {
                send_mail_regis_shift($user, $week, $current_gen, ['test@colorme.vn']);
            }
        }
        $this->info('done');
    }
}
