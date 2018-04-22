<?php

namespace Modules\MarketingCampaign\Http\Controllers;

use App\Course;
use App\Gen;
use App\Http\Controllers\ManageApiController;
use App\MarketingCampaign;
use App\Register;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarketingCampaignController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;

        if ($limit == -1) {
            $marketingCampaigns = MarketingCampaign::orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'marketing_campaigns' => $marketingCampaigns->map(function ($marketingCampaign) {
                    return $marketingCampaign->getData();
                })
            ]);
        }

        $marketingCampaigns = MarketingCampaign::orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($marketingCampaigns, [
            'marketing_campaigns' => $marketingCampaigns->map(function ($marketingCampaign) {
                return $marketingCampaign->getData();
            })
        ]);
    }

    public function storeMarketingCampaign(Request $request)
    {
        if ($request->id) {
            $marketingCampaign = MarketingCampaign::find($request->id);
        } else {
            $marketingCampaign = new MarketingCampaign();
        }

        $marketingCampaign->name = $request->name;
        $marketingCampaign->color = $request->color ? $request->color : '';

        $marketingCampaign->save();

        return $this->respondSuccessWithStatus([
            'marketing_campaign' => $marketingCampaign
        ]);
    }

    public function summaryMarketingCampaign(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = date('Y-m-d', strtotime('+1 day', strtotime($request->end_time)));

        $summary = Register::select(DB::raw('count(*) as total_registers, campaign_id, saler_id'))
            ->whereNotNull('campaign_id')->whereNotNull('saler_id')->where('status', 1)->where('money', '>', 0)->where('saler_id', '>', 0)->where('campaign_id', '>', 0)
            ->groupBy('campaign_id', 'saler_id');

        if ($startTime && $endTime) {
            $summary->whereBetween('created_at', [$startTime, $endTime]);
        } else {
            if ($request->gen_id && $request->gen_id != 0) {
                $summary->where('gen_id', $request->gen_id);
            }
        }

        if ($request->base_id && $request->base_id != 0) {
            $class_ids = StudyClass::where('base_id', $request->base_id)->pluck('id')->toArray();
            $summary->whereIn('class_id', $class_ids);
        }

        $summary = $summary->get()->map(function ($item) {
            $data = [
                'total_registers' => $item->total_registers,
                'campaign' => [
                    'id' => $item->marketing_campaign->id,
                    'name' => $item->marketing_campaign->name,
                    'color' => $item->marketing_campaign->color,
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
        $endTime = date('Y-m-d', strtotime('+1 day', strtotime($request->end_time)));
        $registers = Register::query();
        if ($startTime && $endTime) {
            $registers = $registers->whereBetween('created_at', [$startTime, $endTime]);
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
        $gen_id = $request->gen_id;

        if ($gen_id && $gen_id != 0) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }

        $startTime = $request->start_time;
        $end_time = $request->end_time;

        if ($startTime && $end_time) {
            $endTime = date('Y-m-d', strtotime('+1 day', strtotime($end_time)));
            $all_registers = Register::whereBetween('created_at', [$startTime, $endTime]);
        } else {
            $all_registers = $current_gen->registers();
        }

        $startTime = $request->start_time ? $request->start_time : $current_gen->start_time;
        $end_time = $request->end_time ? $request->end_time : $current_gen->end_time;
        $endTime = date('Y-m-d', strtotime('+1 day', strtotime($end_time)));
        $date_array = createDateRangeArray(strtotime($startTime), strtotime($end_time));

//        if ($request->base_id && $request->base_id != 0) {
        ////            $class_ids = StudyClass::where('base_id', $request->base_id)->pluck('id')->toArray();
        ////            $all_registers = $all_registers->whereIn('class_id', $class_ids);
//
//        }

        $saler_ids = $all_registers->pluck('saler_id');

        if ($request->base_id && $request->base_id != 0) {
            $salers = User::whereIn('id', $saler_ids)->where('base_id', $request->base_id)->get();
        } else {
            $salers = User::whereIn('id', $saler_ids)->get();
        }

        $salers = $salers->map(function ($saler) use ($date_array, $endTime, $startTime, $request, $current_gen, $all_registers) {
            $data = [
                'id' => $saler->id,
                'name' => $saler->name,
                'color' => $saler->color,
            ];

            $registers = clone $all_registers;

            $saler_registers = $registers->where('saler_id', $saler->id);

            $data['total_registers'] = $saler_registers->where(function ($query) {
                $query->where('status', 0)
                    ->orWhere('money', '>', 0);
            })->count();

            $data['total_paid_registers'] = $saler_registers->where('status', 1)->where('money', '>', 0)->count();
            $sum_paid_personal = $saler_registers->where('status', 1)->where('money', '>', 0)->select(DB::raw('sum(money) as sum_personal_money'))->first()->sum_personal_money;
            $data['sum_paid_personal'] = currency_vnd_format((int)$sum_paid_personal);

            $bonus = 0;
            $courses = [];

            $di = 0;

            $paid_by_date_personal_temp = Register::select(DB::raw('DATE(paid_time) as date,count(1) as num'))
                ->whereBetween('paid_time', [$startTime, $endTime])
                ->where('saler_id', $saler->id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('num', 'date');

            $registers_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->whereBetween('created_at', [$startTime, $endTime])
                ->where('saler_id', $saler->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $registers_by_date_personal = [];
            $paid_by_date_personal = [];

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

            foreach (Course::all() as $course) {
//                if ($request->base_id && $request->base_id != 0) {
//                    $class_ids = StudyClass::where('base_id', $request->base_id)->pluck('id')->toArray();
//                    $class_ids = $course->classes()->whereIn('id', $class_ids)->pluck('id')->toArray();
//                } else {
                $class_ids = $course->classes()->pluck('id')->toArray();
//                }

                if ($request->start_time && $request->end_time) {
                    $count = $saler->sale_registers()->where('money', '>', '0')
                        ->whereIn('class_id', $class_ids)
                        ->whereBetween('created_at', [$startTime, $endTime])
                        ->count();
                } else {
                    $count = $saler->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')
                        ->whereIn('class_id', $class_ids)
                        ->count();
                }

                $money = $course->sale_bonus * $count;

                $courses[] = [
                    'id' => $course->id,
                    'name' => $course->name,
                    'count' => $count,
                    'sale_bonus' => $course->sale_bonus
                ];

                $bonus += $money;
            };

            $campaigns = $saler_registers->select(DB::raw('count(*) as total_registers,campaign_id'))->where('campaign_id', '<>', 0)
                ->whereNotNull('campaign_id')->groupBy('campaign_id')->get();

            $data['campaigns'] = $campaigns->map(function ($campaign) {
                return [
                    'id' => $campaign->marketing_campaign->id,
                    'name' => $campaign->marketing_campaign->name,
                    'color' => $campaign->marketing_campaign->color,
                    'total_registers' => $campaign->total_registers,
                ];
            });
            $data['bonus'] = $bonus;
            $data['courses'] = $courses;

            return $data;
        });

        return $this->respondSuccessWithStatus(['summary_sales' => $salers]);
    }

    // public function user(Request $request)
    // {
    //     $user = User::join('registers', 'users.id', '=', 'registers.user_id');
        
    // }
}
