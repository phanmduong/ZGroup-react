<?php

namespace Modules\ShiftRegisters\Http\Controllers;

use App\Colorme\Transformers\ShiftTransformer;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ManageShiftRegistersApiController extends ManageApiController
{
    protected $shiftTransfromer;

    public function __construct(ShiftTransformer $shiftTransformer)
    {
        parent::__construct();
        $this->shiftTransfromer = $shiftTransformer;
    }

    public function get_current_shifts(Request $request)
    {
        $gen_id = $request->gen_id;
        $base_id = $request->base_id;
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }
        if ($base_id) {
            $shifts = $current_gen->shifts()->where('base_id', $base_id)->get();
        } else {
            $shifts = $current_gen->shifts()->get();
        }

        $weeks = $shifts->pluck('week')->unique()->sortByDesc(function ($week, $key) {
            return $week;
        });
        $return_arr = [];
        foreach ($weeks as $week) {
            $week_shifts = $shifts->where('week', $week);
            $dates = $week_shifts->pluck('date')->unique();
            $return_dates = [];
            foreach ($dates as $date) {
                $temp = [];
                foreach ($shifts as $item) {
                    if ($item->date == $date) {
                        $temp[] = $item;
                    }
                }

                $shiftsData = $this->shiftTransfromer->transformCollection(collect($temp));
                $return_dates[] = [
                    "date" => date_shift(strtotime($date)),
                    "shifts" => $shiftsData
                ];
            }
            $return_arr[] = [
                'dates' => $return_dates,
                'week' => $week
            ];
        }
        return $this->respondSuccessWithStatus(['weeks' => $return_arr]);
    }
}
