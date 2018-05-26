<?php

namespace Modules\ShiftRegisters\Http\Controllers;

use App\Colorme\Transformers\ShiftTransformer;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\Shift;
use App\ShiftPick;
use App\ShiftSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ManageShiftsApiController extends ManageApiController
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
                    'date' => date_shift(strtotime($date)),
                    'shifts' => $shiftsData
                ];
            }
            $return_arr[] = [
                'dates' => $return_dates,
                'week' => $week
            ];
        }
        return $this->respondSuccessWithStatus(['weeks' => $return_arr]);
    }

    public function get_history_shift_register()
    {
        $limit = 40;

        $shift_picks = ShiftPick::orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            'shift_picks' => $shift_picks->map(function ($shiftPick) {
                $shift_session = $shiftPick->shift->shift_session()->withTrashed()->first();

                $shiftPickDate = [
                    'shift_pick' => [
                        'id' => $shiftPick->shift->id,
                        'week' => $shiftPick->shift->week,
                        'status' => $shiftPick->status,
                        'created_at' => format_full_time_date($shiftPick->created_at),
                        'name' => $shift_session->name,
                        'start_time' => $shift_session->start_time,
                        'end_time' => $shift_session->end_time,
                    ]
                ];

                if ($shiftPick->user) {
                    $shiftPickDate['user'] = [
                        'id' => $shiftPick->user->id,
                        'name' => $shiftPick->user->name,
                        'avatar_url' => generate_protocol_url($shiftPick->user->avatar_url),
                    ];
                }

                return $shiftPickDate;
            })
        ];
        return $this->respondWithPagination($shift_picks, $data);
    }

    public function remove_shift_regis($shiftId)
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
                'id' => $shift->id,
            ]);
            $publish_data = [
                'event' => 'remove-shift',
                'data' => $data
            ];
            Redis::publish(config('app.channel'), json_encode($publish_data));

            return $this->respondSuccessWithStatus(['message' => 'Bỏ đăng ký thành công']);
        } else {
            return $this->respondErrorWithStatus('Bạn không thể bỏ đăng kí của người khác');
        }
    }

    public function register_shift($shiftId)
    {
        $shift = Shift::find($shiftId);
        if ($shift->user) {
            return $this->respondErrorWithStatus('Ca này đã có người đăng kí rồi');
        } else {
            $shift->user_id = $this->user->id;
            $shift->save();

            $shift_pick = new ShiftPick();
            $shift_pick->user_id = $this->user->id;
            $shift_pick->shift_id = $shift->id;
            $shift_pick->status = 1;
            $shift_pick->save();

            $data = json_encode([
                'id' => $shift->id,
                'user' => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'avatar_url' => generate_protocol_url($this->user->avatar_url)
                ]
            ]);
            $publish_data = [
                'event' => 'regis-shift',
                'data' => $data
            ];
            Redis::publish(config('app.channel'), json_encode($publish_data));

            return $this->respondSuccessWithStatus([
                'message' => 'Đăng kí thành công',
                'status' => 1,
                'user' => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'avatar_url' => generate_protocol_url($this->user->avatar_url)
                ]
            ]);
        }
    }

    public function get_shift_session_all()
    {
        $shift_sessions = ShiftSession::all();

        $shift_sessions = $shift_sessions->map(function ($shift_session) {
            return [
                'id' => $shift_session->id,
                'name' => $shift_session->name,
                'start_time' => $shift_session->start_time,
                'end_time' => $shift_session->end_time,
                'active' => $shift_session->active
            ];
        });

        return $this->respondSuccessWithStatus([
            'shift_sessions' => $shift_sessions
        ]);
    }

    public function store_shift_session(Request $request)
    {
        if ($request->id) {
            $shift_session = ShiftSession::find($request->id);
        } else {
            $shift_session = new ShiftSession();
        }

        $shift_session->active = $request->active ? $request->active : 0;

        $shift_session->name = $request->name;
        $shift_session->start_time = $request->start_time;
        $shift_session->end_time = $request->end_time;

        $shift_session->save();

        return $this->respondSuccessWithStatus([
            'shift_session' => $shift_session
        ]);
    }

    public function delete_shift_session($shift_session_id)
    {
        $shiftSession = ShiftSession::where('id', $shift_session_id)->first();
        $shiftSession->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Xóa thành công'
        ]);
    }
}
