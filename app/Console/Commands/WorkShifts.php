<?php

namespace App\Console\Commands;

use App\Base;
use App\Gen;
use App\WorkShift;
use App\WorkShiftSession;
use Illuminate\Console\Command;

class WorkShifts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:workShifts';

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
        $date->modify('+3 days');
        $formatted_date_from = $date->format('Y-m-d');
        $date->modify('+6 days');
        $formatted_date_to = $date->format('Y-m-d');
        $dates = createDateRangeArray(strtotime($formatted_date_from), strtotime($formatted_date_to));
        $bases = Base::where('center', 1)->get();
        $current_gen = Gen::getCurrentGen();
        $shiftSessions = WorkShiftSession::where('active', 1)->get();
        $lastShift = WorkShift::where('gen_id', $current_gen->id)->orderBy('week', 'desc')->first();
        $week = $lastShift ? $lastShift->week : 0;

        $lastShift = WorkShift::orderBy('id', 'desc')->first();

        $order = $lastShift ? $lastShift->order : 0;
        foreach ($dates as $date) {
            foreach ($bases as $base) {
                foreach ($shiftSessions as $shiftSession) {
                    $shift = WorkShift::where("base_id", $base->id)->where("gen_id", $current_gen->id)->where("work_shift_session_id", $shiftSession->id)->where("date", $date)->first();
                    if (is_null($shift)) {
                        $shift = new WorkShift();
                        $shift->gen_id = $current_gen->id;
                        $shift->base_id = $base->id;
                        $shift->work_shift_session_id = $shiftSession->id;
                        $shift->week = $week + 1;
                        $shift->order = $order + 1;
                        $shift->date = $date;
                        $shift->save();
                    }
                }
            }
        }
    }
}
