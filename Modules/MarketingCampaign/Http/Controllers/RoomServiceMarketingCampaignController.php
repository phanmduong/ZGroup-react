<?php

namespace Modules\MarketingCampaign\Http\Controllers;

use App\Course;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\MarketingCampaign;
use App\Register;
use App\Room;
use App\RoomServiceRegister;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomServiceMarketingCampaignController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function summaryMarketingCampaign(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));

        $summary = RoomServiceRegister::select(DB::raw('count(*) as total_registers, campaign_id, saler_id'))
            ->where('type', 'seat')->whereNotNull('campaign_id')->whereNotNull('saler_id')->where('money', '>', 0)->where('saler_id', '>', 0)->where('campaign_id', '>', 0)
            ->groupBy('campaign_id', 'saler_id');

        if ($startTime && $endTime) {
            $summary->whereBetween('created_at', array($startTime, $endTime));
        } else
            $summary->whereBetween('created_at', array(date('Y-m-01'), date("Y-m-d", strtotime("+1 day", strtotime(date('Y-m-d'))))));

        if ($request->base_id && $request->base_id != 0)
            $summary->where('base_id', $request->base_id);

        $summary = $summary->get()->map(function ($item) {

            $data = [
                'total_registers' => $item->total_registers,
                'campaign' => [
                    'id' => $item->campaign->id,
                    'name' => $item->campaign->name,
                    'color' => $item->campaign->color,
                ]
            ];

            if ($item->saler) {
                $data['saler'] = [
                    'id' => $item->saler->id,
                    'name' => $item->saler->name,
                    'color' => $item->saler->color,
                ];
            }

            return $data;
        });

        return $this->respondSuccessWithStatus([
            'summary_marketing_campaign' => $summary
        ]);
    }

    public function summaryMarketingRegister(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));
        $registers = Register::where('type', 'seat');
        if ($startTime && $endTime) {
            $registers = $registers->whereBetween('created_at', array($startTime, $endTime));
        }

        $registers = $registers->select(DB::raw('count(*) as total_registers, campaign_id, saler_id'))
            ->whereNotNull('campaign_id')->whereNotNull('saler_id')->where('money', '>', 0)->where('saler_id', '>', 0)->where('campaign_id', '>', 0)->where('status', '>', 0)
            ->groupBy('campaign_id', 'saler_id')->get();

        $registers = $registers->map(function ($item) {

            $data = [
                'total_registers' => $item->total_registers,
                'campaign' => [
                    'id' => $item->marketing_campaign->id,
                    'name' => $item->marketing_campaign->name,
                    'color' => $item->marketing_campaign->color,
                ],
                'saler' => [
                    'id' => $item->saler->id,
                    'name' => $item->saler->name,
                    'color' => $item->saler->color,
                ]
            ];
            return $data;
        });

        return $this->respondSuccessWithStatus([
            'data' => $registers
        ]);

    }

    public function summarySales(Request $request)
    {
        $startTime = $request->start_time;
        $end_time = $request->end_time;
        if ($startTime == null) {
            $startTime = date('Y-m-01');
            $end_time = date("Y-m-d");
        }

        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($end_time)));

        $all_registers = RoomServiceRegister::where('type', 'seat')->whereBetween('created_at', array($startTime, $endTime));

        $date_array = createDateRangeArray(strtotime($startTime), strtotime($end_time));

        $saler_ids = $all_registers->pluck('saler_id');

        if ($request->base_id && $request->base_id != 0) {
            $salers = User::whereIn('id', $saler_ids)->where('base_id', $request->base_id)->get();
        } else {
            $salers = User::whereIn('id', $saler_ids)->get();
        }

        $salers = $salers->map(function ($saler) use ($date_array, $endTime, $startTime, $request, $all_registers) {
            $data = [
                'id' => $saler->id,
                'name' => $saler->name,
                'color' => $saler->color,
            ];

            $registers = clone $all_registers;


            $saler_registers = $registers->where('saler_id', $saler->id);

            $data['total_registers'] = $saler_registers->count();

            $data['total_paid_registers'] = $saler_registers->where('money', '>', 0)->count();

//            $bonus = 0;
//            $courses = array();

            $di = 0;

            $registers_by_date_personal_temp = RoomServiceRegister::where('type', 'seat')->select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->whereBetween('created_at', array($startTime, $endTime))
                ->where('saler_id', $saler->id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_personal_temp = RoomServiceRegister::where('type', 'seat')->select(DB::raw('DATE(paid_time) as date,count(1) as num'))
                ->whereBetween('paid_time', array($startTime, $endTime))
                ->where('saler_id', $saler->id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('num', 'date');

            $registers_by_date_personal = array();
            $paid_by_date_personal = array();

            foreach ($date_array as $date) {

                if (isset($registers_by_date_personal_temp[$date])) {
                    $registers_by_date_personal[$di] = $registers_by_date_personal_temp[$date];
                } else {
                    $registers_by_date_personal[$di] = 0;
                }
                if (isset($paid_by_date_personal_temp[$date])) {
                    $paid_by_date_personal[$di] = $paid_by_date_personal_temp[$date];
                } else {
                    $paid_by_date_personal[$di] = 0;
                }

                $di += 1;
            }

            $data['registers_by_date'] = $registers_by_date_personal;
            $data['paid_by_date'] = $paid_by_date_personal;
            $data['date_array'] = $date_array;
//            foreach (Course::all() as $course) {
//                $class_ids = $course->classes()->pluck('id')->toArray();
//                if ($request->start_time && $request->end_time) {
//                    $count = $saler->sale_registers()->where('money', '>', '0')
//                        ->whereIn('class_id', $class_ids)
//                        ->whereBetween('created_at', array($startTime, $endTime))
//                        ->count();
//                } else {
//                    $count = $saler->sale_registers()->where('money', '>', '0')
//                        ->whereIn('class_id', $class_ids)
//                        ->count();
//                }
//
//                $money = $course->sale_bonus;// * $count;
//
//
//                $courses[] = [
//                    'id' => $course->id,
//                    'name' => $course->name,
//                    'count' => $count,
//                    'sale_bonus' => $course->sale_bonus
//                ];
//
//                $bonus += $money;
//
//
//            };
//
            $campaigns = $saler_registers->select(DB::raw('count(*) as total_registers,campaign_id'))->where('campaign_id', '<>', 0)
                ->whereNotNull('campaign_id')->groupBy('campaign_id')->get();

            $data['campaigns'] = $campaigns->map(function ($campaign) {
                return [
                    'id' => $campaign->campaign->id,
                    'name' => $campaign->campaign->name,
                    'color' => $campaign->campaign->color,
                    'total_registers' => $campaign->total_registers,
                ];
            });
//            $data['bonus'] = $bonus;
//            $data['courses'] = $courses;
            return $data;
        });

        return $this->respondSuccessWithStatus(['summary_sales' => $salers]);
    }
    
    public function roomSummarySales(Request $request)
    {
        $startTime = $request->start_time;
        $end_time = $request->end_time;
        if ($startTime == null) {
            $startTime = date('Y-m-01');
            $end_time = date("Y-m-d");
        }

        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($end_time)));

        $all_registers = RoomServiceRegister::where('type', 'room')->whereBetween('created_at', array($startTime, $endTime));
        // dd($all_registers);
        $date_array = createDateRangeArray(strtotime($startTime), strtotime($end_time));

        $saler_ids = $all_registers->pluck('saler_id');

        if ($request->base_id && $request->base_id != 0) {
            $salers = User::whereIn('id', $saler_ids)->where('base_id', $request->base_id)->get();
        } else {
            $salers = User::whereIn('id', $saler_ids)->get();
        }

        $salers = $salers->map(function ($saler) use ($date_array, $endTime, $startTime, $request, $all_registers) {
            $data = [
                'id' => $saler->id,
                'name' => $saler->name,
                'color' => $saler->color,
            ];

            $registers = clone $all_registers;


            $saler_registers = $registers->where('saler_id', $saler->id);

            $data['total_registers'] = $saler_registers->count();

            $data['total_paid_registers'] = $saler_registers->where('money', '>', 0)->count();

//            $bonus = 0;
//            $courses = array();

            $di = 0;

            $registers_by_date_personal_temp = RoomServiceRegister::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('type', 'room')->whereBetween('created_at', array($startTime, $endTime))
                ->where('saler_id', $saler->id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_personal_temp = RoomServiceRegister::select(DB::raw('DATE(paid_time) as date,count(1) as num'))
                ->where('type', 'room')->whereBetween('paid_time', array($startTime, $endTime))
                ->where('saler_id', $saler->id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('num', 'date');

            $registers_by_date_personal = array();
            $paid_by_date_personal = array();

            foreach ($date_array as $date) {

                if (isset($registers_by_date_personal_temp[$date])) {
                    $registers_by_date_personal[$di] = $registers_by_date_personal_temp[$date];
                } else {
                    $registers_by_date_personal[$di] = 0;
                }
                if (isset($paid_by_date_personal_temp[$date])) {
                    $paid_by_date_personal[$di] = $paid_by_date_personal_temp[$date];
                } else {
                    $paid_by_date_personal[$di] = 0;
                }

                $di += 1;
            }

            $data['registers_by_date'] = $registers_by_date_personal;
            $data['paid_by_date'] = $paid_by_date_personal;
            $data['date_array'] = $date_array;
//            foreach (Course::all() as $course) {
//                $class_ids = $course->classes()->pluck('id')->toArray();
//                if ($request->start_time && $request->end_time) {
//                    $count = $saler->sale_registers()->where('money', '>', '0')
//                        ->whereIn('class_id', $class_ids)
//                        ->whereBetween('created_at', array($startTime, $endTime))
//                        ->count();
//                } else {
//                    $count = $saler->sale_registers()->where('money', '>', '0')
//                        ->whereIn('class_id', $class_ids)
//                        ->count();
//                }
//
//                $money = $course->sale_bonus;// * $count;
//
//
//                $courses[] = [
//                    'id' => $course->id,
//                    'name' => $course->name,
//                    'count' => $count,
//                    'sale_bonus' => $course->sale_bonus
//                ];
//
//                $bonus += $money;
//
//
//            };
//
            $campaigns = $saler_registers->select(DB::raw('count(*) as total_registers,campaign_id'))->where('campaign_id', '<>', 0)
                ->whereNotNull('campaign_id')->groupBy('campaign_id')->get();

            $data['campaigns'] = $campaigns->map(function ($campaign) {
                return [
                    'id' => $campaign->campaign->id,
                    'name' => $campaign->campaign->name,
                    'color' => $campaign->campaign->color,
                    'total_registers' => $campaign->total_registers,
                ];
            });
//            $data['bonus'] = $bonus;
//            $data['courses'] = $courses;
            return $data;
        });

        return $this->respondSuccessWithStatus(['summary_sales' => $salers]);
    }

    public function roomMarketingCampaignSummary(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));

        $summary = RoomServiceRegister::select(DB::raw('count(*) as total_registers, campaign_id, saler_id'))
            ->where('type', 'room')->whereNotNull('campaign_id')->whereNotNull('saler_id')->where('money', '>', 0)->where('saler_id', '>', 0)->where('campaign_id', '>', 0)
            ->groupBy('campaign_id', 'saler_id');

        if ($startTime && $endTime) {
            $summary->whereBetween('created_at', array($startTime, $endTime));
        } else
            $summary->whereBetween('created_at', array(date('Y-m-01'), date("Y-m-d", strtotime("+1 day", strtotime(date('Y-m-d'))))));

        if ($request->base_id && $request->base_id != 0)
            $summary->where('base_id', $request->base_id);

        $summary = $summary->get()->map(function ($item) {

            $data = [
                'total_registers' => $item->total_registers,
                'campaign' => [
                    'id' => $item->campaign->id,
                    'name' => $item->campaign->name,
                    'color' => $item->campaign->color,
                ]
            ];

            if ($item->saler) {
                $data['saler'] = [
                    'id' => $item->saler->id,
                    'name' => $item->saler->name,
                    'color' => $item->saler->color,
                ];
            }

            return $data;
        });

        return $this->respondSuccessWithStatus([
            'summary_marketing_campaign' => $summary
        ]);
    }
}
