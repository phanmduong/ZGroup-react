<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\ShiftTransformer;
use App\Gen;
use App\Shift;
use App\ShiftPick;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Redis;

class ShiftApiController extends ApiController
{
    protected $shiftTransfromer;

    public function __construct(ShiftTransformer $shiftTransformer)
    {
        parent::__construct();
        $this->shiftTransfromer = $shiftTransformer;
    }

    public function get_current_shifts( Request $request)
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

    public function remove_shift_regis( $shiftId)
    {
        $shift = Shift::find($shiftId);
        if ($this->user->id == $shift->user_id) {
            $shift->user_id = 0;
            $shift->save();

            $shift_pick = new ShiftPick();
            $shift_pick->user_id = $this->user->id;
            $shift_pick->shift_id = $shift->id;
            $shift_pick->status = 0;
            $shift_pick->save();

            $data = json_encode([
                "id" => $shift->id,
            ]);
            $publish_data = array(
                "event" => "remove-shift",
                "data" => $data
            );
            Redis::publish(config('app.channel'), json_encode($publish_data));

            return $this->respondSuccessWithStatus(["message" => "Bỏ đăng ký thành công"]);
        } else {
            return $this->respondErrorWithStatus("Bạn không thể bỏ đăng kí của người khác");
        }
    }

    public function register_shift( $shiftId)
    {
        $shift = Shift::find($shiftId);
        if ($shift->user) {
            return $this->respondErrorWithStatus("Ca này đã có người đăng kí rồi");
        } else {
            $shift->user_id = $this->user->id;
            $shift->save();

            $shift_pick = new ShiftPick();
            $shift_pick->user_id = $this->user->id;
            $shift_pick->shift_id = $shift->id;
            $shift_pick->status = 1;
            $shift_pick->save();

            $data = json_encode([
                "id" => $shift->id,
                "user" => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'avatar_url' => $this->user->avatar_url
                ]
            ]);
            $publish_data = array(
                "event" => "regis-shift",
                "data" => $data
            );
            Redis::publish(config('app.channel'), json_encode($publish_data));

            return $this->respondSuccessWithStatus([
                'message' => 'Đăng kí thành công',
                'status' => 1,
                'user' => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'avatar_url' => $this->user->avatar_url
                ]
            ]);
        }
    }
}
