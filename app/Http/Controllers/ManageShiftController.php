<?php

namespace App\Http\Controllers;

use App\Base;
use App\Colorme\Transformers\ShiftPickTransformer;
use App\Colorme\Transformers\ShiftTransformer;
use App\Gen;
use App\Shift;
use App\ShiftPick;
use App\ShiftSession;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ManageShiftController extends ManageController
{
    protected $shiftTransfromer;
    protected $shiftPickTransformer;

    public function __construct(ShiftTransformer $shiftTransformer, ShiftPickTransformer $shiftPickTransformer)
    {
        parent::__construct();
        $this->data['current_tab'] = 33;
        $this->shiftTransfromer = $shiftTransformer;
        $this->shiftPickTransformer = $shiftPickTransformer;
    }

    public function index()
    {
        return view('manage.shift.manage_shifts', $this->data);
    }

    public function edit_shift_session($id, Request $request)
    {
        $shift_session = ShiftSession::find($id);
        $shift_session->start_time = $request->start_time;
        $shift_session->end_time = $request->end_time;
        $shift_session->name = $request->name;
        $shift_session->active = $request->active ? 1 : 0;
        $shift_session->save();
        return response()->json($shift_session);
    }

    public function store_shift_session(Request $request)
    {
        $shift_session = new ShiftSession();
        $shift_session->start_time = $request->start_time;
        $shift_session->end_time = $request->end_time;
        $shift_session->name = $request->name;
        $shift_session->save();
        return response()->json($shift_session);
    }

    public function get_shift_session()
    {
        $shiftSessions = ShiftSession::all();
        foreach ($shiftSessions as &$shiftSession) {
            $shiftSession->start_time = format_time(strtotime($shiftSession->start_time));
            $shiftSession->end_time = format_time(strtotime($shiftSession->end_time));
            $shiftSession->active = ($shiftSession->active == 1);
        }
        return response()->json($shiftSessions);
    }

    public function get_one_shift_session($id)
    {
        $i = ShiftSession::find($id);
        return response()->json($i);
    }

    public function regis_shifts()
    {
        $this->data['current_tab'] = 35;
        $this->data['user'] = $this->user;
        $gens = Gen::orderBy('start_time', 'desc')->get()->map(function ($gen) {
            $obj = new \stdClass();
            $obj->name = $gen->name;
            $obj->id = $gen->id;
            return $obj;
        });
        $this->data['gens'] = json_encode($gens);

        $this->data['current_gen_id'] = Gen::getCurrentGen()->id;
        return view('manage.shift.regis_shifts', $this->data);
    }

    public function register_shift(Request $request)
    {
        $shiftId = $request->shift_id;
        $shift = Shift::find($shiftId);
        if ($shift->user) {
            return response()->json([
                'message' => 'Ca này đã có người đã đăng kí rồi',
                'status' => 0
            ]);
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

            return response()->json([
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

    public function shifts_progress($gen_id = null)
    {
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }

        $weeks = $current_gen->shifts()->get()->pluck('week')->unique()->sortByDesc(function ($week, $key) {
            return $week;
        });
        $return_arr = [];

        foreach ($weeks as $week) {
            $week_shifts = $current_gen->shifts()->where('week', $week)->get();
            $user_ids = $week_shifts->pluck('user_id');
            $users = User::whereIn('id', $user_ids)->get();
            $shift_count_arr = [];
            $max_count = 0;
            foreach ($users as $user) {
                $count = $user_ids->filter(function ($item) use ($user) {
                    return $item == $user->id;
                })->count();
                if ($count > $max_count) {
                    $max_count = $count;
                }
                $shift_count_arr[] = [
                    'count' => $count,
                    'user' => [
                        'color' => $user->color,
                        'name' => $user->name,
                        'url' => url('profile/' . get_first_part_of_email($user->email))
                    ]
                ];
            }
            $return_arr[] = [
                'week' => $week,
                'progresses' => $shift_count_arr,
                'max_count' => $max_count
            ];
        }
        return response()->json($return_arr);
    }

    public function get_bases()
    {
        if ($this->user->base) {
            $bases = [$this->user->base];
            $rawBases = Base::where('center', 1)->orderBy('created_at')->get();
            foreach ($rawBases as $b) {
                if ($b->id != $this->user->base_id) {
                    $bases[] = $b;
                }
            }
            return $bases;
        } else {
            $rawBases = Base::where('center', 1)->orderBy('created_at')->get();
            return $rawBases;
        }
    }

    public function get_current_shifts($gen_id = null, Request $request)
    {
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }

        if ($request->base_id) {
            $shifts = $current_gen->shifts()->where('base_id', $request->base_id)->get();
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
                $obj = new \stdClass();
                $obj->date = date_shift(strtotime($date));
                $obj->shifts = $shifts->filter(function ($item) use ($date) {
                    return $item->date == $date;
                });
                $shiftsData = $this->shiftTransfromer->transformCollection($obj->shifts);
                $obj->shifts = $shiftsData;
                $return_dates[] = $obj;
            }
            $return_arr[] = [
                'dates' => $return_dates,
                'week' => $week
            ];
        }

        return response()->json(['weeks' => $return_arr]);
    }

    public function get_shift_picks(Request $request)
    {
        $limit = 10;
        $page = 1;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->limit) {
            $page = $request->limit;
        }
        $shift_picks = ShiftPick::orderBy('created_at', 'desc')->skip(($page - 1) * $limit)->take($limit)->get();
        return response()->json(['shift_picks' => $this->shiftPickTransformer->transformCollection($shift_picks)]);
    }

    public function remove_shift_regis(Request $request)
    {
        $shift_id = $request->shift_id;
        $shift = Shift::find($shift_id);
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

        return response()->json([
            'message' => 'Bỏ đăng ký thành công',
            'status' => 1
        ]);
    }
}
