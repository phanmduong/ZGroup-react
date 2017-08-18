<?php

namespace App\Http\Controllers;

use App\Course;
use App\Gen;
use App\MarketingCampaign;
use App\Register;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class ManageMarketingController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 10;
    }

    public function marketing_campaign_list()
    {
        $this->data['current_tab'] = 41;
        $campaigns = MarketingCampaign::orderBy('created_at', 'desc')->paginate(30);

        foreach ($campaigns as &$campaign) {
            $temp = DB::select('select count(1) as num, users.name as `name`, users.color as color from registers
                                join users on users.id = registers.saler_id 
                                 where campaign_id=' . $campaign->id . ' and registers.money>0
                                 group by saler_id');
            $campaign_paids = [];
            foreach ($temp as $item) {
                $obj = [
                    "color" => "#" . $item->color,
                    "highlight" => "#" . $item->color,
                    "value" => $item->num,
                    'label' => $item->name
                ];
                $campaign_paids[] = $obj;
            }
            $campaign->paid_chart = json_encode($campaign_paids);
        }

        $this->data['search'] = null;
        $this->data['user_id'] = $this->user->id;
        $this->data['campaigns'] = $campaigns;
        $this->data['courses'] = Course::all();
        $this->data['last_page'] = $campaigns->lastPage();
        $this->data['current_page'] = $campaigns->currentPage();

        return view('manage.marketing.list', $this->data);
    }

    public function create_marketing_campaign()
    {
        $this->data['current_tab'] = 41;
        return view('manage.marketing.new_marketing_campaign', $this->data);
    }

    public function store_marketing_campaign(Request $request)
    {
        $campaign = new MarketingCampaign();
        $campaign->name = $request->name;
        $campaign->save();
        return redirect('manage/marketing-campaign');
    }

    public function delete_marketing_campaign($campaign_id)
    {
        $campaign = MarketingCampaign::find($campaign_id);
        if ($campaign->registers()->count() == 0) {
            $campaign->delete();
        }
        return redirect('manage/marketing-campaign');
    }

    public function marketing_campaign_detail($id, Request $request)
    {
        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            // get current gen
            $current_gen = Gen::getCurrentGen();
        }

        // tình trạng các nhân viên chốt đơn trong chiến dịch đó
        $saler_ids = $current_gen->registers()->where('saler_id', '!=', null)
            ->where('gen_id', $current_gen->id)->where('campaign_id', $id)->pluck('saler_id');
        $this->data['salers'] = User::whereIn('id', $saler_ids)->get();


        // biểu đồ từng ngày đăng kí/đóng tiền của chiến dịch đó
        $total_registers = collect(DB::select('select count(1) as registers,date(created_at) as `date` from registers 
                                where campaign_id = ' . $id . ' and gen_id=' . $current_gen->id . ' group by date(created_at) 
                                order by `date`'))->pluck('registers', 'date');
        $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));
        $total_paids = collect(DB::select('select count(1) as paids, date(created_at) as `date` from registers 
                                where money>0 and campaign_id = ' . $id . ' and gen_id=' . $current_gen->id . ' group by date(created_at) 
                                order by `date`'))->pluck('paids', 'date');
        $registers_data = [];
        $total_paids_data = [];
        foreach ($date_array as $date) {
            if (isset($total_paids[$date])) {
                $total_paids_data[] = $total_paids[$date];
            } else {
                $total_paids_data[] = 0;
            }
            if (isset($total_registers[$date])) {
                $registers_data[] = $total_registers[$date];
            } else {
                $registers_data[] = 0;
            }
        }
        $this->data['date_labels'] = json_encode($date_array);
        $this->data['total_paids_data'] = json_encode($total_paids_data);
        $this->data['total_registers_data'] = json_encode($registers_data);

        // get gens data for select
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();

        // set the current_tab
        $this->data['current_tab'] = 41;

        // set current gen
        $this->data['current_gen'] = $current_gen;
        $this->data['campaign'] = MarketingCampaign::find($id);

        return view("manage.marketing.marketing_campaign_detail", $this->data);
    }

    public function sale_list(Request $request)
    {
        $order = "registers.created_at";
        $direction = "desc";
        if ($request->order) {
            $order = $request->order;
        }
        if ($request->direction) {
            $direction = $request->direction;
        }
        $saler_id = $request->saler_id;
        $gen_id = $request->gen_id;
        $current_gen = Gen::find($gen_id);

        $registers = Register::where('saler_id', $saler_id)
            ->select('registers.money as money',
                'registers.created_at as created_at',
                'registers.user_id as user_id',
                'registers.class_id as class_id',
                'registers.id as id',
                'registers.status as status',
                'registers.campaign_id as campaign_id'
            )
            ->where('registers.gen_id', $gen_id)
            ->where(function ($query) {
                $query->where('registers.status', 0)
                    ->orWhere('registers.money', '>', 0);
            })
            ->join('classes', 'classes.id', '=', 'registers.class_id')
            ->join('courses', 'courses.id', '=', 'classes.course_id')
            ->join('users', 'users.id', '=', 'registers.user_id')
            ->join('marketing_campaign', 'marketing_campaign.id', '=', 'registers.campaign_id')
            ->orderBy($order, $direction)->get();
//        dd($registers);
        $this->data['registers'] = $registers;
        $this->data['current_tab'] = 42;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();
        $this->data['saler_id'] = $saler_id;
        $this->data['current_gen'] = $current_gen;
        return view("manage.marketing.sale_list", $this->data);
    }

    public function manage_sales(Request $request)
    {
        $gen_id = $request->gen_id;
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }
        $this->data['current_tab'] = 42;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();
        $this->data['current_gen'] = $current_gen;
        $saler_ids = $current_gen->registers()->pluck('saler_id');
        $salers = User::whereIn('id', $saler_ids)->get();
        $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));
        foreach ($salers as &$sale) {
            $sale->count_total = $sale->sale_registers()->where('gen_id', $current_gen->id)->where(function ($query) {
                $query->where('status', 0)
                    ->orWhere('money', '>', 0);
            })->count();


            // compute the data of pie chart
            $paid_campaign_temp = DB::select('select marketing_campaign.name as label, count(1) as paids_num, color from
                                                marketing_campaign join registers 
                                                on registers.campaign_id = marketing_campaign.id
                                                where registers.money > 0
                                                 and registers.saler_id = ' . $sale->id . '
                                                 and registers.gen_id = ' . $current_gen->id . '
                                                group by registers.campaign_id
                                                order by label');

            $campaign_paids = [];
            if (count($paid_campaign_temp) == 0) {
                $sale->draw_pie_chart = false;
            } else {
                $sale->draw_pie_chart = true;
            }
            foreach ($paid_campaign_temp as $item) {
                $obj = [
                    "color" => "#" . $item->color,
                    "highlight" => "#" . $item->color,
                    "value" => $item->paids_num,
                    'label' => $item->label
                ];

                $campaign_paids[] = $obj;
            }

            $sale->campaign_paids = json_encode($campaign_paids);
//            dd($sale->campaign_paids);


            $sale->count_paid = $sale->sale_registers()->where('money', '>', 0)->where('gen_id', $current_gen->id)->count();
            $sale->bonus = compute_sale_bonus($sale->count_paid);

            $paid_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('saler_id', $sale->id)
                ->where("money", '>', 0)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $registers_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('saler_id', $sale->id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');


            $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));

            $registers_by_date_personal = array();
            $paid_by_date_personal = array();
            $di = 0;
            $dj = 0;
            foreach ($date_array as $date) {
                if (isset($registers_by_date_personal_temp[$date])) {
                    $registers_by_date_personal[$di] = $registers_by_date_personal_temp[$date];
                } else {
                    $registers_by_date_personal[$di] = 0;
                }

                if (isset($paid_by_date_personal_temp[$date])) {
                    $paid_by_date_personal[$dj] = $paid_by_date_personal_temp[$date];
                } else {
                    $paid_by_date_personal[$dj] = 0;
                }

                $di += 1;
                $dj += 1;
            }
            $sale->registers_by_date_personal = $registers_by_date_personal;
            $sale->paid_by_date_personal = $paid_by_date_personal;

            // tính số lượng học viên nộp tiền
            $total_paid_personal = $sale->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')->count();

            $temp = compute_sale_bonus_array($total_paid_personal);

            // tính bonus tiền
            $bonus = $temp[0];

            $registers = [];

            foreach (Course::all() as $course) {
                $class_ids = $course->classes()->pluck('id')->toArray();
                $count = $sale->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')->whereIn('class_id', $class_ids)->count();

                $money = $course->sale_bonus * $count;

                $registers[] = [
                    'name' => $course->name,
                    'count' => $count,
                    'sale_bonus' => $course->sale_bonus
                ];
//                if ($sale->id == 26 && $course->id == 6) {
//                    dd($sale->sale_registers()->where('gen_id', $current_gen->id));
//                }
                $bonus += $money;
            }

            $sale->bonus = $bonus;
            $sale->registers = $registers;
            $sale->bonus_20 = $temp[1];
            $sale->bonus_50 = $temp[2];

        }
        $this->data['salers'] = $salers;
        $this->data['date_array'] = json_encode($date_array);
        $this->data['gen_id'] = $current_gen->id;

        return view('manage.marketing.sales', $this->data);
    }
}
