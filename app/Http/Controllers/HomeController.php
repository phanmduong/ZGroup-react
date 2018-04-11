<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\NotificationTransformer;
use App\Group;
use App\GroupMember;
use App\Notification;
use App\Attendance;
use App\Base;
use App\ClassLesson;
use App\Course;
use App\Gen;
use App\Http\Requests;
use App\Landing;
use App\Lesson;
use App\Link;
use App\Order;
use App\Product;
use App\Register;
use App\Repositories\ClassRepository;
use App\Repositories\NotificationRepository;
use App\Room;
use App\Schedule;
use App\Services\EmailService;
use App\StudyClass;
use App\StudySession;
use App\Survey;
use App\TeleCall;
use App\Transaction;
use App\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Tab;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class HomeController extends ManageController
{
    protected $notificationTransformer;
    protected $classRepository;
    protected $emailService;
    protected $notificationRepository;

    public function __construct(
        NotificationTransformer $notificationTransformer,
        ClassRepository $classRepository,
        NotificationRepository $notificationRepository,
        EmailService $emailService
    )
    {
        parent::__construct();
        $this->classRepository = $classRepository;
        $this->notificationRepository = $notificationRepository;
        $this->notificationTransformer = $notificationTransformer;
        $this->emailService = $emailService;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->data['current_tab'] = 1;
        $this->data['current_gen'] = Gen::getCurrentGen();
        $this->data['bases'] = Base::all();
        $this->data['gens'] = Gen::all();
        return view('manage.dashboard', $this->data);
    }


    public function get_dashboard_data(Request $request)
    {
        $this->data['user'] = $this->user;
        $base_id = $request->base_id;
        $current_gen = Gen::getCurrentGen();
        $gen_id = $request->gen_id;
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        }

        $campaign_labels = null;
        $campaign_registers = null;
        $campaign_paids = null;

        $this->data['current_gen'] = $current_gen;
        if ($base_id == null) {

            $zero_paid_num = Register::where('gen_id', $current_gen->id)->where('status', '=', 1)->where('money', '=', 0)->count();
            $total_money = Register::where('gen_id', $current_gen->id)->sum('money');
            $num = Register::where('gen_id', $current_gen->id)->count();
            $paid_number = Register::where('gen_id', $current_gen->id)->where('money', ">", 0)->count();
            $uncalled_number = Register::where('gen_id', $current_gen->id)->where('call_status', 0)->groupBy('user_id')->count();
            $total_classes = $current_gen->studyclasses->count();
            $remain_days = (strtotime($current_gen->end_time) - time());


            $total_paid_personal = $this->user->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')->count();
            // tính bonus tiền
            $bonus = compute_sale_bonus_array($total_paid_personal)[0];

            foreach (Course::all() as $course) {
                $class_ids = $course->classes()->pluck('id')->toArray();
                $count = $this->user->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')->whereIn('class_id', $class_ids)->count();

                $money = $course->sale_bonus * $count;
                $bonus += $money;
            }


            // ca nhan
            $registers_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('saler_id', $this->user->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('saler_id', $this->user->id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));

            // ca colorme
            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            if (count($registers_by_date_temp) > 0) {

                // Compute the data for pie chart
                $paid_campaign_temp = DB::select('select marketing_campaign.name as label, count(1) as paids_num, color from
                                                marketing_campaign join registers 
                                                on registers.campaign_id = marketing_campaign.id
                                                where registers.money > 0
                                                 and registers.saler_id = ' . $this->user->id . '
                                                 and registers.gen_id = ' . $current_gen->id . '
                                                group by registers.campaign_id
                                                order by label');

                $campaign_paids = [];
                if (count($paid_campaign_temp) > 0) {
                    foreach ($paid_campaign_temp as $item) {
                        $obj = [
                            "color" => "#" . $item->color,
                            "highlight" => "#" . $item->color,
                            "value" => $item->paids_num,
                            'label' => $item->label
                        ];

                        $campaign_paids[] = $obj;
                    }
                    $this->data["campaign_paids"] = json_encode($campaign_paids);
                }

                // end compute data for pie chart


                $count_total = $this->user->sale_registers()->where('gen_id', $current_gen->id)->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })->count();
                $count_paid = $this->user->sale_registers()->where('money', '>', 0)->where('gen_id', $current_gen->id)->count();
                $this->data['count_total'] = $count_total;
                $this->data['count_paid'] = $count_paid;
            }

            $registers_by_date_personal = array();
            $paid_by_date_personal = array();

            $registers_by_date = array();
            $paid_by_date = array();

            $di = 0;

            foreach ($date_array as $date) {
//                dd(isset($registers_by_date_personal_temp["2016-10-09"]));
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

                if (isset($registers_by_date_temp[$date])) {
                    $registers_by_date[$di] = $registers_by_date_temp[$date];
                } else {
                    $registers_by_date[$di] = 0;
                }

                if (isset($paid_by_date_temp[$date])) {
                    $paid_by_date[$di] = $paid_by_date_temp[$date];
                } else {
                    $paid_by_date[$di] = 0;
                }
                $di += 1;
            }


            $money_by_date = Register::select(DB::raw('sum(money) as money'))->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(paid_time)'))->pluck('money')->toArray();
            $registers_by_hour = Register::select(DB::raw('HOUR(created_at) as \'hour\', count(1) as num'))->where('gen_id', $current_gen->id)->groupBy(DB::raw('HOUR(created_at)'))->get();

            $orders_by_hour = Order::select(DB::raw('DATE(created_at) as date,count(1) as num'))->groupBy(DB::raw('DATE(created_at)'))->get();

            $e = date('Y-m-d', time());
            $s = date('Y-m-d', time() - 24 * 60 * 60 * 7 * 4);

            $month_ago = createDateRangeArray(strtotime($s), strtotime($e));
            $orders = [];
            foreach ($orders_by_hour as $i) {
                $orders[$i->date] = $i->num;
            }
            $return_orders = [];


            foreach ($month_ago as $day) {
                if (array_key_exists($day, $orders)) {
                    $return_orders[$day] = $orders[$day];
                } else {
                    $return_orders[$day] = 0;
                }
            }

            $registers_hour_array = array();
            for ($i = 0; $i < 24; $i++) {
                $registers_hour_array[$i] = 0;
            }
            foreach ($registers_by_hour as $regis) {
                $registers_hour_array[$regis->hour] = $regis->num;
            }

            $classes = $current_gen->studyclasses;
            $target_revenue = 0;
            foreach ($classes as $class) {
                $target_revenue += $class->target * $class->course->price * 0.55;
            }

            $this->data['target_revenue'] = $target_revenue;

            $this->data['campaign_labels'] = $campaign_labels;
            $this->data['campaign_registers'] = $campaign_registers;

            $this->data['money_by_date'] = json_encode($money_by_date);
            $this->data['bonus'] = currency_vnd_format($bonus);
            $this->data['zero_paid_num'] = $zero_paid_num;
            $this->data['registers_by_date_personal'] = $registers_by_date_personal;
            $this->data['paid_by_date_personal'] = $paid_by_date_personal;
            $this->data['registers_by_date_personal_temp'] = $registers_by_date_personal_temp;
            $this->data['classes'] = $current_gen->studyclasses()->orderBy('name', 'desc')->get();
            $this->data['total_money'] = (is_numeric($total_money) ? $total_money : 0);
            $this->data['register_number'] = (is_numeric($num) ? $num : 0);
            $this->data['paid_number'] = (is_numeric($paid_number) ? $paid_number : 0);
            $this->data['uncalled_number'] = (is_numeric($uncalled_number) ? $uncalled_number : 0);
            $this->data['total_classes'] = (is_numeric($total_classes) ? $total_classes : 0);
            $this->data['remain_days'] = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);
            $this->data['date_array'] = json_encode($date_array);
            $this->data['registers_by_date'] = json_encode($registers_by_date);
            $this->data['paid_by_date'] = json_encode($paid_by_date);

            $this->data['registers_by_hour'] = json_encode($registers_hour_array);
            $this->data['orders_by_hour'] = json_encode(array_values($return_orders));
            $this->data['month_ago'] = json_encode($month_ago);
            $this->data['gen_id'] = $current_gen->id;
            $this->data['user_id'] = $this->user->id;

        } else {
            $base = Base::find($base_id);
            $classes = $base->classes()->where('gen_id', $current_gen->id)->orderBy('name', 'desc');

            $registers = Register::where('gen_id', $current_gen->id)->where('gen_id', $current_gen->id)->whereIn('class_id', $classes->pluck('id'));
            $zero_paid_num = Register::where('status', '=', 1)->where('money', '=', 0)->whereIn('class_id', $classes->pluck('id'))->count();
            $total_money = $registers->sum('money');
            $num = $registers->count();
            $paid_number = $registers->where('gen_id', $current_gen->id)->where('money', ">", 0)->count();
            $uncalled_number = $registers->where('call_status', 0)->groupBy('user_id')->count();
            $total_classes = $classes->count();

            $remain_days = (strtotime($current_gen->end_time) - time());
            $classes_id = $classes->pluck("id");
            $registers_by_date = Register::select(DB::raw('count(1) as num'))->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(created_at)'))->pluck('num')->toArray();


            $money_by_date = Register::select(DB::raw('sum(money) as money'))->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(paid_time)'))->pluck('money')->toArray();
//            $registers_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
//                ->where('gen_id', $current_gen->id)
//                ->where('saler_id', $this->user->id)
//                ->whereIn("class_id", $classes_id)
//                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');
//            $paid_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
//                ->where('gen_id', $current_gen->id)
//                ->where('saler_id', $this->user->id)
//                ->whereIn("class_id", $classes_id)
//                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

//            $total_paid_personal = $this->user->sale_registers()->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->where('money', '>', '0')->count();
//            $bonus = compute_sale_bonus($total_paid_personal);

            $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));

            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('money', '>', 0)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

//            $registers_by_date_personal = array();
//            $paid_by_date_personal = array();
            $di = 0;
//            dd($registers_by_date_personal_temp);
            foreach ($date_array as $date) {
//                dd(isset($registers_by_date_personal_temp["2016-10-09"]));
//                if (isset($registers_by_date_personal_temp[$date])) {
//                    $registers_by_date_personal[$di] = $registers_by_date_personal_temp[$date];
//                } else {
//                    $registers_by_date_personal[$di] = 0;
//                }
//                if (isset($paid_by_date_personal_temp[$date])) {
//                    $paid_by_date_personal[$di] = $paid_by_date_personal_temp[$date];
//                } else {
//                    $paid_by_date_personal[$di] = 0;
//                }

                if (isset($registers_by_date_temp[$date])) {
                    $registers_by_date[$di] = $registers_by_date_temp[$date];
                } else {
                    $registers_by_date[$di] = 0;
                }

                if (isset($paid_by_date_temp[$date])) {
                    $paid_by_date[$di] = $paid_by_date_temp[$date];
                } else {
                    $paid_by_date[$di] = 0;
                }
                $di += 1;
            }

            $registers_by_hour = Register::select(DB::raw('HOUR(created_at) as \'hour\', count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('HOUR(created_at)'))->get();

            $registers_hour_array = array();
            for ($i = 0; $i < 24; $i++) {
                $registers_hour_array[$i] = 0;
            }
            foreach ($registers_by_hour as $regis) {
                $registers_hour_array[$regis->hour] = $regis->num;
            }
            $target_revenue = 0;

            foreach ($classes->get() as $class) {
                $target_revenue += $class->target * $class->course->price * 0.55;
            }

            $this->data['target_revenue'] = $target_revenue;

            $this->data['orders_by_hour'] = null;
            $this->data['month_ago'] = null;
            $this->data['money_by_date'] = json_encode($money_by_date);
            $this->data['zero_paid_num'] = $zero_paid_num;
//            $this->data['bonus'] = currency_vnd_format($bonus);
//            $this->data['registers_by_date_personal'] = $registers_by_date_personal;
//            $this->data['paid_by_date_personal'] = $paid_by_date_personal;
            $this->data['registers_by_date_personal_temp'] = [];
            $this->data['classes'] = $classes->get();
            $this->data['total_money'] = (is_numeric($total_money) ? $total_money : 0);
            $this->data['register_number'] = (is_numeric($num) ? $num : 0);
            $this->data['paid_number'] = (is_numeric($paid_number) ? $paid_number : 0);
            $this->data['uncalled_number'] = (is_numeric($uncalled_number) ? $uncalled_number : 0);
            $this->data['total_classes'] = (is_numeric($total_classes) ? $total_classes : 0);
            $this->data['remain_days'] = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);
            $this->data['date_array'] = json_encode($date_array);
            $this->data['paid_by_date'] = json_encode($paid_by_date);
            $this->data['registers_by_date'] = json_encode($registers_by_date);
            $this->data['registers_by_hour'] = json_encode($registers_hour_array);
        }
        return view('components.dashboard_data', $this->data);
    }

    public function show_tabs()
    {
        $this->data['current_tab'] = 3;
        $tabs = $this->data['tabs'];
        foreach ($tabs as $tab) {
            if ($tab->parent_id == 0) {
                $tab->parent_name = "None";
            } else {
                $tab->parent_name = Tab::find($tab->parent_id)->name;
            }
        }
        return view('role_management/show_tabs', $this->data);
    }

    public function show_roles()
    {
        $this->data['current_tab'] = 4;
        return view('role_management/show_roles', $this->data);
    }

    public function study_history($student_id)
    {
        $this->data['current_tab'] = 5;
        $student = User::find($student_id);
        $registers = $student->registers()->orderBy('created_at', 'desc')->get()->map(function ($register) {
            if ($register->call_status == 0) {
                $count = TeleCall::where('student_id', $register->user_id)->count();
                if ($count != 0) {
                    $register->call_status = 2;
                }
            }
            return $register;
        });;

        $this->data['registers'] = $registers;
        $this->data['student'] = $student;
        return view('manage.study_history', $this->data);
    }

    public function waitList(Request $request)
    {
        $page = 1;

        if ($request->page) {
            $page = $request->page;
        }

        // choose the current gen
        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }
        $this->data['current_gen'] = $current_gen;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();
        $waitClassesQuery = $current_gen->studyclasses()
            ->where("name", "not like", "%.%");


        if ($request->base_id) {
            $waitClassesQuery = $waitClassesQuery->where('base_id', $request->base_id);
        }
        $this->data['current_base_id'] = $request->base_id;

        $waitClassIds = $waitClassesQuery->pluck('id');

        // set current manage tab
        $this->data['current_tab'] = 45;


        $this->data['current_page'] = $page;
        $limit = 30;
        $offset = ($page - 1) * $limit;

        // get the search query
        $query = $request->q;

        $is_paid = 1;
        if ($request->is_paid != null) {
            $is_paid = $request->is_paid;
        }
        $this->data['is_paid'] = $is_paid;

//        $classes = StudyClass::getClassByGen($current_gen->id);
        if ($query) {
            $users_id = User::where('email', 'like', '%' . $query . '%')
                ->orWhere('name', 'like', '%' . $query . '%')->pluck('id')->toArray();
//            dd($users_id);
            $registers = Register::where(function ($q) use ($query, $users_id) {
                $q->where('note', 'like', '%' . $query . '%')
                    ->orWhereIn('user_id', $users_id);
            })
                ->where('status', $is_paid)
                ->whereIn('class_id', $waitClassIds)
                ->orderBy('created_at', 'desc');
            $total = $registers->count();

            $registers = $registers->skip($offset)->take($limit)->get()->map(function ($register) {
                if ($register->call_status == 0) {
                    $count = TeleCall::where('student_id', $register->user_id)->count();
                    if ($count != 0) {
                        $register->call_status = 2;
                    }
                }
                return $register;
            });

        } else {
            $registers_query = Register::where('gen_id', $current_gen->id)
                ->where('status', $is_paid)
                ->whereIn('class_id', $waitClassIds)
                ->orderBy('created_at', 'desc');
            $total = $registers_query->count();

            $registers = $registers_query->skip($offset)->take($limit)->get()->map(function ($register) {
                if ($register->call_status == 0) {
                    $count = TeleCall::where('student_id', $register->user_id)->count();
                    if ($count != 0) {
                        $register->call_status = 2;
                    }
                }
                return $register;
            });
        }

        if (!is_numeric($total)) {
            $total = 0;
        }


        $num_pages = ceil($total / $limit);
//        dd($total);
        $this->data['num_pages'] = $num_pages;
        $this->data['total'] = $total;
        $this->data['query'] = $query;

        $this->data['registers'] = $registers;
        $this->data['bases'] = Base::orderBy('name')->get();

        return view('manage.wait_list', $this->data);
    }

    public function registerlist(Request $request)
    {
        $page = 1;
        if ($request->page) {
            $page = $request->page;
        }

        // choose the current gen
        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }
        $this->data['current_gen'] = $current_gen;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();

        // set current manage tab
        $this->data['current_tab'] = 5;


        $this->data['current_page'] = $page;
        $limit = 30;
        $offset = ($page - 1) * $limit;

        // get the search query
        $query = $request->q;

//        $classes = StudyClass::getClassByGen($current_gen->id);
        if ($query) {
            $users_id = User::where('email', 'like', '%' . $query . '%')
                ->orWhere('phone', 'like', '%' . $query . '%')
                ->orWhere('name', 'like', '%' . $query . '%')->get()->pluck('id')->toArray();
//            dd($users_id);
            $registers = Register::whereIn('user_id', $users_id)
                ->where('gen_id', $current_gen->id)->orderBy('created_at', 'desc');
            $total = $registers->count();
            $registers = $registers->skip($offset)->take($limit)->get();
        } else {
            $registers = Register::where('gen_id', $current_gen->id)
                ->orderBy('created_at', 'desc')->skip($offset)->take($limit)->get();
            $total = Register::where('gen_id', $current_gen->id)->count();
        }
        if (!is_numeric($total)) {
            $total = 0;
        }

        foreach ($registers as &$register) {
            $register->study_time = 1;
            $user = $register->user;
            foreach ($user->registers()->where('id', '!=', $register->id)->get() as $r) {
                if ($r->studyClass->course_id == $register->studyClass->course_id) {
                    $register->study_time += 1;
                }
            }
        }
        $num_pages = ceil($total / $limit);
        $this->data['num_pages'] = $num_pages;
        $this->data['total'] = $total;
        $this->data['query'] = $query;

        $this->data['registers'] = $registers;
        return view('manage.register_list', $this->data);
    }

    public function manage_gens($page = 1)
    {
        $this->data['current_page'] = $page;
        $limit = 8;
        $offset = ($page - 1) * $limit;

        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->take($limit)->skip($offset)->get();
        $this->data['current_gen'] = Gen::getCurrentGen();
        $this->data['current_teach_gen'] = Gen::getCurrentTeachGen();

        $total = Gen::all()->count();
        $this->data['total'] = $total;

        $num_pages = ceil($total / $limit);
        $this->data['num_pages'] = $num_pages;

        $this->data['current_tab'] = 6;
        return view('manage.gen', $this->data);
    }

    public function store_gen(Request $request)
    {
        $gen = new Gen;
        if ($request->status == null) {
            $gen->status = 0;
        } else {
            $gen->status = 1;
        }

        if ($request->teach_status == null) {
            $gen->teach_status = 0;
        } else {
            $gen->teach_status = 1;
        }

        $gen->name = $request->name;
//        dd(strtotime($request->start_time));
        $start_time = date('Y-m-d', strtotime($request->start_time));
        $end_time = date('Y-m-d', strtotime($request->end_time));
        $gen->start_time = $start_time;

        $gen->end_time = $end_time;
        $gen->save();

        if ($gen->status == 1) {
            DB::table('gens')
                ->where('id', "!=", $gen->id)
                ->update(['status' => 0]);
        }

        if ($gen->teach_status == 1) {
            DB::table('gens')
                ->where('id', "!=", $gen->id)
                ->update(['teach_status' => 0]);
        }

        return redirect('manage/gens');
    }

    public function edit_gen($gen_id = null)
    {
        $this->data['current_tab'] = 6;
        $this->data['isEdit'] = true;
        $this->data['gen'] = Gen::find($gen_id);
        return view('manage.editgen', $this->data);
    }

    public function store_edit_gen(Request $request)
    {
        $gen = Gen::find($request->gen_id);
        $gen->name = $request->name;
        $gen->description = $request->description;
        $gen->start_time = date('Y-m-d', strtotime($request->start_time));
        $gen->end_time = date('Y-m-d', strtotime($request->end_time));
        // dd($request->status);
        $gen->status = ($request->status == null) ? 0 : 1;
        $gen->teach_status = ($request->teach_status == null) ? 0 : 1;

        $cover_name = uploadFileToS3($request, 'cover', 1200, $gen->cover_name);
        if ($cover_name != null) {
            $gen->cover_name = $cover_name;
            $gen->cover_url = $this->s3_url . $cover_name;
        } else {
            if ($gen->cover_name == null) {
                $gen->cover_url = null;
            }
        }

        $gen->detail = $request->detail;
        $gen->save();

        if ($gen->status == 1) {
            DB::table('gens')
                ->where('id', "!=", $gen->id)
                ->update(['status' => 0]);
        }

        if ($gen->teach_status == 1) {
            DB::table('gens')
                ->where('id', "!=", $gen->id)
                ->update(['teach_status' => 0]);
        }


        return redirect('manage/gens');
    }

    public function courses($page = 1)
    {
        $this->data['current_page'] = $page;
        $limit = 8;
        $offset = ($page - 1) * $limit;

        $this->data['courses'] = Course::take($limit)->skip($offset)->get();

        $total = Course::all()->count();
        $this->data['total'] = $total;

        $num_pages = ceil($total / $limit);
        $this->data['num_pages'] = $num_pages;

        $landing = Landing::all();

        $this->data['landing'] = $landing;
        $this->data['current_tab'] = 7;
        return view('manage.courses', $this->data);
    }

    public function add_course()
    {
        $course = new Course;
        $course->id = -1;

        $this->data['course'] = $course;

        $this->data['isEdit'] = false;
        $this->data['current_tab'] = 7;
        return view('manage.editcourse', $this->data);
    }

    public function store_course(Request $request)
    {
        if ($request->id == -1) {
            $course = new Course;
            $course->image_name = null;
            $course->icon_name = null;
        } else {
            $course = Course::find($request->id);
        }
        $course->linkmac = $request->linkmac;
        $course->linkwindow = $request->linkwindow;
        $course->mac_how_install = $request->mac_how_install;
        $course->window_how_install = $request->window_how_install;
        $course->name = $request->name;
        $course->sale_bonus = $request->sale_bonus;
        $course->duration = $request->duration;
        $course->detail = $request->detail;
        $course->description = $request->description;
        $course->price = $request->price;
        $image_name = uploadFileToS3($request, 'image', 800, $course->image_name);
        if ($image_name != null) {
            $course->image_name = $image_name;
            $course->image_url = $this->s3_url . $image_name;
        } else {
            if ($course->image_name == null) {
                $course->image_url = 'https://placehold.it/800x600';
            }

        }
        $icon_name = uploadFileToS3($request, 'icon', 150, $course->icon_name);
        if ($icon_name != null) {
            $course->icon_name = $icon_name;
            $course->icon_url = $this->s3_url . $icon_name;
        } else {
            if ($course->icon_name == null) {
                $course->icon_url = 'https://placehold.it/200x200';
            }

        }
        $cover_name = uploadFileToS3($request, 'cover', 1200, $course->cover_name);
        if ($cover_name != null) {
            $course->cover_name = $cover_name;
            $course->cover_url = $this->s3_url . $cover_name;
        } else {
            if ($course->cover_name == null) {
                $course->cover_url = null;
            }
        }
        $course->save();
        return redirect('manage/courses');
    }

    public function edit_course($course_id = null)
    {
        $this->data['isEdit'] = true;
        $this->data['course'] = Course::find($course_id);
        $this->data['current_tab'] = 7;
        return view('manage.editcourse', $this->data);
    }

    public function classes(Request $request, $page = 1)
    {
        $this->data['current_page'] = $page;
        $limit = 30;
        $offset = ($page - 1) * $limit;


        if ($request->search) {
            $search = trim($request->search);
            $this->data['search'] = $search;
            $classes = StudyClass::where('name', 'like', '%' . $search . '%')->orderBy('created_at', 'desc');
            $total = $classes->count();
            $this->data['classes'] = $classes->take($limit)->skip($offset)->get();
        } else {
            $this->data['search'] = "";
            $total = StudyClass::count();
            $this->data['classes'] = StudyClass::orderBy('created_at', 'desc')->take($limit)->skip($offset)->get();
        }


        $this->data['total'] = $total;

        $num_pages = ceil($total / $limit);
        $this->data['num_pages'] = $num_pages;
        $this->data['user'] = $this->user;

        $this->data['current_tab'] = 9;
        return view('manage.classes', $this->data);
    }

    public function add_class()
    {
        $class = new StudyClass;
        $class->id = -1;
        $this->data['class'] = $class;
        $this->data['isEdit'] = false;
        $this->data['current_tab'] = 9;

        $this->data['bases'] = Base::all();
        $courses = Course::all();
        $this->data['schedules'] = Schedule::orderBy("created_at", "desc")->get();
        $this->data['courses'] = $courses;
        $this->data['staffs'] = User::where('role', 1)->get();
        $gens = Gen::all();
        $this->data['gens'] = $gens;
        return view('manage.editclass', $this->data);
    }

    public function duplicate_class($class_id)
    {
        $new_class = StudyClass::find($class_id)->replicate();
        $new_class->activated = 0;
        $new_class->save();

        $group = new Group();
        $group->name = "Lớp " . $new_class->name . " duplicate";
        $group->class_id = $new_class->id;
        $group->avatar_url = $new_class->course->icon_url;
        $group->creator_id = $this->user->id;
        $group->save();

        // auto generate time for class lesson
        generate_class_lesson($new_class);

        // create class lessons
        set_class_lesson_time($new_class);

        return redirect('manage/classes');
    }

    public function set_class_lesson_time(Request $request)
    {

        $class = StudyClass::find($request->class_id);
        set_class_lesson_time($class);
        return redirect('manage/editclass/' . $class->id);
    }

    public function store_class(Requests\CreateClassFormRequest $request)
    {
        if ($request->id == -1) {
            $class = new StudyClass;

        } else {
            $class = StudyClass::find($request->id);
        }

        $class->datestart = date('Y-m-d', strtotime($request->datestart));
        $class->name = $request->name;
        $class->schedule_id = $request->schedule_id;
        $class->room_id = $request->room_id;
        $class->base_id = Room::find($class->room_id)->base->id;
        $class->description = $request->description;

        $class->gen_id = $request->gen_id;
        $class->target = $request->target;
        $class->regis_target = $request->regis_target;
        $class->course_id = $request->course_id;
        $class->teaching_assistant_id = $request->teaching_assistant_id;
        $class->teacher_id = $request->teacher_id;
        $class->study_time = $request->study_time;
        $class->status = ($request->status == null) ? 0 : 1;

        $class->save();


        if ($request->id == -1) {
            $group = new Group();
            $group->name = "Lớp " . $class->name;
            $group->creator_id = $this->user->id;
            $group->class_id = $class->id;
            $group->avatar_url = $class->course->icon_url;
            $group->link = extract_class_name($class->name);
            $group->save();


            // create the class_lessons for this class
//            generate_class_lesson($class);
            $this->classRepository->generateClassLesson($class);


        } else {
            $group = Group::where("class_id", $class->id)->first();
            if ($group) {
                $group->name = "Lớp " . $class->name;
                $group->avatar_url = $class->course->icon_url;
                $group->link = extract_class_name($class->name);
                $group->save();
            }
        }

        if ($request->schedule_id) {
            // auto generate time for each class_lesson
//            set_class_lesson_time($class);
            $this->classRepository->setClassLessonTime($class);
        }

        return redirect('manage/classes');
    }

    public function edit_class($class_id = null)
    {
        $courses = Course::all();
        $this->data['courses'] = $courses;
        $this->data['staffs'] = User::where('role', ">", 0)->get();
        $gens = Gen::all();
        $this->data['gens'] = $gens;
        $this->data['isEdit'] = true;
        $this->data['schedules'] = Schedule::orderBy("created_at", "desc")->get();
        $this->data['bases'] = Base::all();
        $this->data['class'] = StudyClass::find($class_id);
        $this->data['current_tab'] = 9;
        return view('manage.editclass', $this->data);
    }

    public function change_class_status(Request $request)
    {
        $class_id = $request->class_id;
        if ($class_id != null) {
            $class = StudyClass::find($class_id);
            $class->status = ($class->status == 1) ? 0 : 1;
            $class->save();
        }
    }

    public function change_survey_status(Request $request)
    {
        $survey_id = $request->survey_id;
        if ($survey_id != null) {
            $survey = Survey::find($survey_id);
            $survey->active = !$survey->active == 1;
            $survey->save();
        }
    }

    public function delete_class($id)
    {
        $class = StudyClass::find($id);
        Group::where('class_id', $class->id)->first()->delete();
        $class->delete();

        return redirect('manage/classes');
    }

    public function delete_register($register_id)
    {
        $register = Register::find($register_id);
        $class = $register->studyClass;
        if ($class->registers()->count() < $class->target) {
            $class->status = 1;
            $class->save();
        }

        $this->emailService->send_mail_delete_register($register, $this->user);
        if ($register->status != 1) {
            $register->delete();
        }

        return redirect('manage/registerlist');
    }

    public function telesale()
    {
        $total_uncalled = Register::getTotalUncalled();
        $total_called = Register::getTotalCalled();
        $calling_telecalls = TeleCall::where(['gen_id' => Gen::getCurrentGen()->id, 'caller_id' => $this->user->id, 'call_status' => 2])->get();
        if (isset($calling_telecalls)) {
            $this->data['calling_telecalls'] = $calling_telecalls;
        }

        $this->data['total_uncalled'] = is_numeric($total_uncalled) ? $total_uncalled : 0;
        $this->data['total_called'] = is_numeric($total_called) ? $total_called : 0;
        $this->data['current_tab'] = 11;
        return view('manage.telesale', $this->data);
    }

    public function call_student(Request $request)
    {
        $id = $request->id;
        if ($id) {
            $student = User::find($id);
            $registers = $student->registers;
            foreach ($registers as $regis) {
                $regis->call_status = 2;
                $regis->save();
            }
        } else {
            $student = Register::getFirstUncallStudent();
        }
        $data = array();

        if (isset($student->id)) {
            $telecall = new TeleCall;
            $telecall->caller_id = $this->user->id;
            $telecall->student_id = $student->id;
            $telecall->note = null;
            $telecall->call_status = 2;
            $telecall->gen_id = Gen::getCurrentGen()->id;
            $telecall->save();
            $data = [
                "status" => 1,
                "id" => $telecall->id,
                "caller" => [
                    "id" => $telecall->caller->id,
                    "name" => $telecall->caller->name
                ],
                "student" => [
                    'id' => $telecall->student->id,
                    'name' => $telecall->student->name,
                    'email' => $telecall->student->email,
                    'university' => $telecall->student->university,
                    'work' => $telecall->student->work,
                    'address' => $telecall->student->address,
                    'is_called' => $telecall->student->is_called->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'updated_at' => format_time_to_mysql(strtotime($item->updated_at)),
                            'caller_name' => $item->caller->name,
                            'call_status' => $item->call_status,
                            'note' => $item->note
                        ];
                    }),
                    "registers" => $telecall->student->registers->map(function ($regis) {
                        $data = [
                            'id' => $regis->id,
                            "course_name" => $regis->studyClass->course->name,
                            "course_duration" => $regis->studyClass->course->duration,
                            "course_price" => $regis->studyClass->course->price,
                            "class_name" => $regis->studyClass->name,
                            "study_time" => $regis->studyClass->study_time,
                            "created_at" => format_time_to_mysql(strtotime($regis->created_at))
                        ];
                        if ($regis->saler) {
                            $data['saler_name'] = $regis->saler->name;
                        }
                        return $data;
                    })
                ],
                "call_status_value" => $telecall->call_status,
                "call_status" => call_status($telecall->call_status),
                "note" => $telecall->note,
                "call_time" => format_time_to_mysql(strtotime($telecall->created_at))
            ];
            return $data;
        } else {
            return [
                "status" => 0,
                "message" => "Hết học viên chưa gọi"
            ];
        }
    }

    public function get_student_for_call(Request $request)
    {
        $id = $request->id;
        if ($id) {
            $student = User::find($id);
        } else {
            $student = Register::getFirstUncallStudent();
        }
        $data = array();

        if ($request->register_id) {
            $register = Register::find($request->register_id);
            $register->call_status = 2;
            $register->save();
        }

        if (isset($student->id)) {
            $data['student'] = $student;
            $telecall = new TeleCall;
            $telecall->caller_id = $this->user->id;
            $telecall->student_id = $student->id;
            $telecall->register_id = $request->register_id;
            $telecall->note = null;
            $telecall->call_status = 2;
            $telecall->gen_id = Gen::getCurrentGen()->id;
            $telecall->save();
            $data['telecall_id'] = $telecall->id;

            return view('ajax.calling', $data);
        } else {
            return "Hết học viên chưa gọi";
        }
    }

    public function ajax_call_status(Request $request)
    {
        $id = $request->id;

        $status = $request->status;
        $telecall = TeleCall::find($request->telecall_id);
//        if ($telecall->register) {
//            $register = $telecall->register;
//            $register->call_status = $status;
//            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
////            dd();
//            $register->save();
//        } else {
        $student = User::find($id);
        foreach ($student->registers as $register) {
            $register->call_status = $status;
            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
            $register->save();
        }
//        }
        if ($request->caller_id) {
            $telecall->caller_id = $request->caller_id;
        } else {
            $telecall->caller_id = $this->user->id;
        }

        $telecall->note = $request->note;
        $telecall->gen_id = Gen::getCurrentGen()->id;
        $telecall->call_status = $status;
        $telecall->save();

        $total_uncalled = Register::getTotalUncalled();
        $total_called = Register::getTotalCalled();
        $data = array();
        $data['total_uncalled'] = is_numeric($total_uncalled) ? $total_uncalled : 0;
        $data['total_called'] = is_numeric($total_called) ? $total_called : 0;

        return json_encode($data);
    }


    public function ajax_get_call_history(Request $request)
    {
        $size = 5;
        $start = (isset($request->start) ? $request->start : 0);
        $start = $start * $size;

        $caller_id = $request->caller_id;
        $caller = User::find($caller_id);
//        dd($caller);
        $telecalls = $caller->calls->sortByDesc('updated_at')->slice($start, $size);
        $data = array();
        $data['telecalls'] = $telecalls;
        return view('ajax.calling_history_list', $data);
    }

    public function telecalls_list(Request $request)
    {
        if ($request->page) {
            $page = $request->page;
        } else {
            $page = 1;
        }

        $limit = 30;
        $offset = ($page - 1) * $limit;

        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
            $this->data['gen'] = $current_gen;
        }

        if ($request->user_id) {
//            where('gen_id', $current_gen->id)->
            $telecalls = TeleCall::where('student_id', $request->user_id)->orderBy('updated_at', 'desc');
        } else {
            $telecalls = TeleCall::orderBy('updated_at', 'desc');
        }

        $user = $this->user;

        $data = [
            'telecalls' => $telecalls->take($limit)->skip($offset)->get()->map(function ($item) use ($current_gen, $user) {
                $data = [
                    "id" => $item->id,
                    "caller" => [
                        "id" => $item->caller ? $item->caller->id : "Không có",
                        "name" => $item->caller ? $item->caller->name : "Không có"
                    ],
                    "student" => [
                        'id' => $item->student->id,
                        'name' => $item->student->name,
                        'phone' => $item->student->phone,
                        'email' => $item->student->email,
                        'university' => $item->student->university,
                        'work' => $item->student->work,
                        'address' => $item->student->address,
                        'is_called' => $item->student->is_called->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'updated_at' => format_time_to_mysql(strtotime($item->updated_at)),
                                'caller_name' => $item->caller ? $item->caller->name : "Không có",
                                'call_status' => $item->call_status,
                                'note' => $item->note
                            ];
                        }),
                        "registers" => $item->student->registers->map(function ($regis) {
                            $data = [
                                'id' => $regis->id,
                                "course_name" => $regis->studyClass->course->name,
                                "course_duration" => $regis->studyClass->course->duration,
                                "course_price" => $regis->studyClass->course->price,
                                "class_name" => $regis->studyClass->name,
                                "study_time" => $regis->studyClass->study_time,
                                "created_at" => format_time_to_mysql(strtotime($regis->created_at))
                            ];
                            if ($regis->saler) {
                                $data['saler_name'] = $regis->saler->name;
                            }
                            return $data;
                        })
                    ],
                    "call_status_value" => $item->call_status,
                    "call_status" => call_status($item->call_status),
                    "note" => $item->note,
                    "call_time" => format_time_to_mysql(strtotime($item->created_at))
                ];
                if ($item->caller_id == $user->id && $item->call_status == 2) {
                    $data['is_calling'] = true;
                } else {
                    $data['is_calling'] = false;
                }
                return $data;

            })
        ];
        return $data;
    }

    public function all_tele_sale_history(Request $request)
    {
//        if ($request->page) {
//            $page = $request->page;
//        } else {
//            $page = 1;
//        }
//
//        $this->data['current_page'] = $page;
//        $limit = 30;
//        $offset = ($page - 1) * $limit;
//
//        $current_gen = Gen::getCurrentGen();
//        $this->data['gen'] = $current_gen;
//
//        if ($request->user_id) {
//            $telecalls = TeleCall::where('gen_id', $current_gen->id)
//                ->where('student_id', $request->user_id)->orderBy('updated_at', 'desc');
//        } else {
//            $telecalls = TeleCall::where('gen_id', $current_gen->id)
//                ->orderBy('updated_at', 'desc');
//        }
        $this->data['user_id'] = $request->user_id;
//
//        $total = $telecalls->count();
//        $this->data['telecalls'] = $telecalls->take($limit)->skip($offset)->get();
//
//        $this->data['total'] = $total;
//
//        $num_pages = ceil($total / $limit);
//        $this->data['num_pages'] = $num_pages;


        $this->data['current_tab'] = 12;
        return view('manage.all_telesale_history', $this->data);
    }

    public function student_needs_call($page = 1, Request $request)
    {
        $paid = isset($request->paid) ? $request->paid : 0;
        $call = isset($request->call) ? $request->call : 0;
        $search = isset($request->search) ? $request->search : "";
        $this->data['paid'] = $paid;
        $this->data['call'] = $call;
        $this->data['search'] = $search;

        $this->data['current_page'] = $page;
        $limit = 10;
        $offset = ($page - 1) * $limit;

        $current_gen = Gen::getCurrentGen();
        $this->data['gen'] = $current_gen;
        $students_id = User::where('email', 'like', '%' . $search . '%')->orWhere('phone', 'like', '%' . $search . '%')->get()->pluck('id')->all();
        $this->data['registers'] = Register::where('call_status', $call)
            ->whereIn('user_id', $students_id)
            ->where('status', $paid)->take($limit)->skip($offset)->get();

        $total = Register::where('call_status', $call)
            ->whereIn('user_id', $students_id)
            ->where('status', $paid)->count();
        $total = is_numeric($total) ? $total : 0;
        $this->data['total'] = $total;

        $num_pages = ceil($total / $limit);
        $this->data['num_pages'] = $num_pages;


        $this->data['current_tab'] = 13;
        return view('manage.student_needs_call', $this->data);
    }

    public function money_collect()
    {
        $newest_code = Register::orderBy('code', 'desc')->first();
        if ($newest_code != null) {
            $this->data['newest_code'] = $newest_code->code;
        }

        $this->data['current_tab'] = 15;
        return view('manage.money_collect', $this->data);
    }

    public function search_student(Request $request)
    {
        $search = $request->search;
        $students = User::whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('registers')
                ->where('status', 0)
                ->whereRaw('registers.user_id = users.id');
        })
//            ->where('email', 'like', '%' . $search . '%')
//            ->orWhere('phone', 'like', '%' . $search . '%')
            ->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%');
            })
//            ->where(DB::raw("email like %$search% or name like %$search% or phone like %$search%"))
            ->take(20)
            ->get();
//        $arr = array();
//        foreach ($students as &$student) {
//            if ($student->registers->count() > 0) {
//                $arr[] = $student;
//            }
//        }
        $this->data['students'] = $students;
        $code = next_code();

        $this->data['nextCode'] = $code['next_code'];
        $this->data['waitingCode'] = $code['next_waiting_code'];
        if ($students->count() > 0) {
            return view('ajax.search_student', $this->data);
        } else {
            return "<h3>Không tìm thấy</h3>";
        }
    }

    public function get_money(Request $request)
    {
        $status = 0;
        $register_id = $request->id;
        $money = str_replace(array('.', ','), '', $request->money);
        $code = $request->code;
        $register = Register::find($register_id);
        $register->status = $request->status;

//        $transaction=Transaction::where()
        $register->money = $money;


        $register->paid_time = format_time_to_mysql(time());
        $register->received_id_card = $request->received_id_card;
        $register->note = $request->note;
        $register->staff_id = $this->user->id;
        $regis_by_code = Register::where('code', $code)->first();

        if ($regis_by_code != null) {
            $status = 1;
        } else {
            $register->code = $code;
            $register->save();

            $transaction = new Transaction();
            $transaction->money = $money;
            $transaction->sender_id = $this->user->id;
            $transaction->receiver_id = $register->id;
            $transaction->sender_money = $this->user->money;
            $transaction->note = "Học viên " . $register->user->name . " - Lớp " . $register->studyClass->name;
            $transaction->status = 1;
            $transaction->type = 1;
            $transaction->save();
            DB::insert(DB::raw("
                insert into attendances(`register_id`,`checker_id`,class_lesson_id)
                (select registers.id,-1,class_lesson.id
                from class_lesson
                join registers on registers.class_id = class_lesson.class_id
                where registers.id = $register->id
                )
                "));

            $current_money = $this->user->money;
            $this->user->money = $current_money + $money;
            $this->user->save();

            if ($register->studyClass->group) {
                $groupMember = new GroupMember();
                $groupMember->group_id = $register->studyClass->group->id;
                $groupMember->user_id = $register->user_id;
                $groupMember->join_date = format_time_to_mysql(time());
                $groupMember->acceptor_id = $this->user->id;
                $groupMember->position = "member";
                $groupMember->state = "joined";
                $groupMember->save();
            }

            if ($register->saler) {
                $saler = $register->saler;
                $notification = new Notification;
                $notification->actor_id = $register->user_id;
                $notification->receiver_id = $register->saler_id;
                $notification->type = 9;
                $message = $notification->notificationType->template;

                $message = str_replace('[[SALER]]', "<strong>" . $saler->name . "</strong>", $message);
                $message = str_replace('[[MONEY]]', "<strong>" . currency_vnd_format($register->money) . "</strong>", $message);
                $message = str_replace('[[COURSE]]', "<strong>" . $register->studyClass->course->name . "</strong>", $message);
                $notification->message = $message;

                $notification->color = $notification->notificationType->color;
                $notification->icon = $notification->notificationType->icon;
                $notification->url = "/info-student/" . $register->user_id;

                $notification->save();

                $data = array(
                    "message" => $message,
                    "link" => $notification->url,
                    'created_at' => format_time_to_mysql(strtotime($notification->created_at)),
                    "receiver_id" => $notification->receiver_id,
                    "actor_id" => $notification->actor_id,
                    "icon" => $notification->icon,
                    "color" => $notification->color
                );

                $publish_data = array(
                    "event" => "notification",
                    "data" => $data
                );

                Redis::publish(config("app.channel"), json_encode($publish_data));


            }
            $this->emailService->send_mail_confirm_receive_student_money($register, ["colorme.idea@gmail.com"]);
            send_sms_confirm_money($register);

        }
        $return_data = array(
            'money' => $register->money,
            'code' => $register->code,
            'paid_time' => format_date_full_option($register->paid_time),
            'status' => $status
        );
        return json_encode($return_data);
    }

    public function store_send_money(Request $request)
    {
        $this->user->status = 2;
        $this->user->save();
        $receiver = User::find($request->receiver_id);

        $transaction = new Transaction;
        $transaction->status = 0;
        $transaction->sender_id = $this->user->id;
        $transaction->receiver_id = $request->receiver_id;
        $transaction->receiver_money = $receiver->money;
        $transaction->money = $this->user->money;
        $transaction->save();

        $this->notificationRepository->sendMoneyTransferingNotification($transaction);
        return redirect('manage/sendmoney');
    }

    public function send_money()
    {
        $receive_transactions = $this->user->receive_transactions()->where('type', 0)->get()->sortByDesc('updated_at');
        $send_transactions = $this->user->send_transactions()->where('type', 0)->get()->sortByDesc('updated_at ');
        $this->data['receive_transactions'] = $receive_transactions;
        $this->data['send_transactions'] = $send_transactions;

        $this->data['is_pending'] = ($this->user->status == 2);
        $current_money = $this->user->money;
        $this->data['current_money'] = $current_money;
        $this->data['current_tab'] = 16;
        $this->data['user'] = $this->user;
        return view('manage.send_money', $this->data);
    }

    public function auto_staff(Request $request)
    {
        $search = $request->term;
        $staffs = User::whereBetween('role', [1, 2])
            ->where('id', '!=', $this->user->id)
            ->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%');
            })
            ->get();
        return json_encode($staffs->toArray());
    }

    public function auto_student(Request $request)
    {
        $search = $request->term;
        $staffs = User::where('role', 0)
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('registers')
                    ->whereRaw('registers.user_id = users.id');
            })
            ->where('id', '!=', $this->user->id)
            ->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%');
            })
            ->get();
        return json_encode($staffs->toArray());
    }

    public function set_student_to_called(Request $request)
    {
        $id = $request->id;
        $register = Register::find($id);
        $student = $register->user;
        foreach ($student->registers as $regis) {
            $regis->call_status = 1;
            $regis->staff_id = $this->user->id;
            $regis->save();
        }
        return 1;
    }

    public function confirm_transaction(Request $request)
    {

        $transaction_id = $request->id;
        $status = $request->status;
        $transaction = Transaction::find($transaction_id);
        if ($transaction->status != 0) {
            return json_encode([
                'error' => 'Giao dịch không ở trạng thái pending',
                'status' => transaction_status($transaction->status),
                'money' => currency_vnd_format($transaction->receiver->money)
            ]);
        }
        $transaction->status = $status;

        $transaction->sender->status = 0;
        $transaction->sender_money = $transaction->sender->money;
        $transaction->receiver_money = $transaction->receiver->money;

        if ($status == 1) {
            $transaction->sender->money = $transaction->sender->money - $transaction->money;
            $transaction->receiver->money = $transaction->receiver->money + $transaction->money;
        }

        DB::transaction(function () use ($transaction) {
            $transaction->save();
            $transaction->sender->save();
            $transaction->receiver->save();
        });

        $this->notificationRepository->sendMoneyTransferredNotification($transaction);

        $return_data = array(
            'status' => transaction_status($transaction->status),
            'money' => currency_vnd_format($transaction->receiver->money)
        );

        return json_encode($return_data);
    }

    public function keep_money($page = 1)
    {
        $this->data['current_page'] = $page;
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $this->data['staffs'] = User::whereBetween('role', [1, 2])->orderBy('money', 'desc')->take($limit)->skip($offset)->get();

        $total = User::whereBetween('role', [1, 2])->count();
        $this->data['total'] = $total;

        $num_pages = ceil($total / $limit);
        $this->data['num_pages'] = $num_pages;

        $this->data['current_tab'] = 17;
        return view('manage.keep_money', $this->data);
    }


    public function add_lesson($course_id)
    {
        $this->data['isEdit'] = false;
        $lesson = new Lesson;
        $lesson->course_id = $course_id;
        $this->data["owner_id"] = $this->user->id;
        $this->data['lesson'] = $lesson;
        $this->data['current_tab'] = 7;
        return view('manage.editlesson', $this->data);
    }

    public function edit_lesson($id)
    {
        $this->data['isEdit'] = true;
        $this->data['owner_id'] = $this->user->id;
        $lesson = Lesson::find($id);
        $this->data['lesson'] = $lesson;
        $this->data['current_tab'] = 7;
        return view('manage.editlesson', $this->data);
    }


    public function attendance(Request $request)
    {

        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }


//        $classes = StudyClass::whereIn("gen_id", $currentGens)->where("name", "like", "%.%")->orderBy('name', 'desc')->get();

        $classes = $current_gen->studyclasses()->where('name', 'like', '%.%')->orderBy('name')->get();

        $this->data['classes'] = $classes;
//        $this->data['current_gen'] = $currentGen;
        $this->data['current_tab'] = 18;
        $this->data['gens'] = Gen::orderBy('created_at', 'desc')->get();
        $this->data['current_gen'] = $current_gen;

        return view('manage.attendance', $this->data);
    }

    public function change_attendance(Request $request)
    {
        $class_lesson_id = $request->class_lesson_id;
        $currentClassLesson = ClassLesson::find($class_lesson_id);
        $course = $currentClassLesson->studyClass->course;
        $curLesson = $currentClassLesson->lesson;

        $student_id = $request->student_id;

        $student = User::find($student_id);
        $registers = $student->registers()->whereIn('class_id', $course->classes->pluck('id')->all())->get();
        foreach ($registers as $register) {
            $fromClassLesson = $curLesson->classLessons()->where('class_id', $register->studyClass->id)->first();
            $attendance = $fromClassLesson->attendances()->where('register_id', $register->id)->first();
            $attendance->class_lesson_id = $currentClassLesson->id;
            $attendance->save();
        }
        return redirect('manage/attendancelist/' . $currentClassLesson->id);
    }

    public function attendance_list(Request $request, $id)
    {
        $classLesson = ClassLesson::find($id);
        $attendance_list = $classLesson->attendances;

        $currentGen = Gen::getCurrentGen();

        $this->data['current_gen'] = $currentGen;
        $this->data['attendances'] = $attendance_list;
        $this->data['classLesson'] = $classLesson;
        $this->data['current_tab'] = 18;
        return view('manage.attendance_list', $this->data);
    }

    public function paid_list(Request $request, $page = 1)
    {

        $this->data['current_page'] = $page;
        $limit = 50;
        $offset = ($page - 1) * $limit;

        if ($request->input('search')) {
            $search = $request->input('search');
            $this->data['search'] = $search;
//            $register = Register::where('status', 1)->take($limit)->skip($offset)->get();
//            $loop = Register::where('status', 1)->count();
            $student_list = DB::select(DB::raw("SELECT users.name as username, users.email as email, registers.staff_id as staff_id,registers.paid_time as paid_time,registers.note as note ,users.phone, users.email, registers.money, registers.updated_at, classes.name as classname, registers.code as code,registers.coupon as coupon FROM users JOIN registers ON users.id = registers.user_id JOIN classes ON registers.class_id = classes.id WHERE registers.status = 1 AND (classes.name LIKE '%" . $search . "%' || users.email LIKE '%" . $search . "%' || users.name like '%" . $search . "%' || users.phone like '%" . $search . "%') ORDER BY registers.paid_time DESC LIMIT " . $offset . "," . $limit));
            $total = count($student_list);
            $loop = count($student_list);
//            dd($student_list[1]->name);
        } else {
            $student_list = DB::select(DB::raw("SELECT users.name as username, users.email as email,registers.paid_time as paid_time, registers.staff_id as staff_id,registers.note as note ,users.phone, users.email, registers.money, registers.updated_at, classes.name as classname, registers.code as code,registers.coupon as coupon FROM users JOIN registers ON users.id = registers.user_id JOIN classes ON registers.class_id = classes.id WHERE registers.status = 1  ORDER BY registers.paid_time DESC LIMIT " . $offset . "," . $limit . ""));
            $total = Register::where('status', 1)->count();
//            dd($student_list[1]);
            $loop = count($student_list);
        }


        $this->data['total'] = $total;

        $num_pages = ceil($total / $limit);
        $this->data['limit'] = $limit;
        $this->data['num_pages'] = $num_pages;
        $this->data['total'] = $total;
        $this->data['loop'] = $loop;
        $this->data['student_list'] = $student_list;
        $this->data['current_tab'] = 19;
        return view('manage.paid_list', $this->data);
    }

    public function store_lesson(Request $request)
    {
        $lesson = Lesson::findOrNew($request->id);
        $lesson->course_id = $request->course_id;
        $lesson->name = $request->name;
        $lesson->detail_content = $request->detail_content;
        $lesson->detail_teacher = $request->detail_teacher;
        $lesson->description = $request->description;
        $lesson->detail = $request->detail;
        $lesson->order = $request->order;
        $lesson->save();
        return redirect('manage/editcourse/' . $request->course_id);
    }

    public function update_class_lesson(Request $request)
    {
        $class_id = $request->class_id;
        $class = StudyClass::find($class_id);
        generate_class_lesson($class);
        $data['lessons'] = $class->lessons;
        $data['class_id'] = $class->id;
        return view('ajax.refresh_class_lesson', $data);
    }

    public function save_class_lesson_time(Request $request)
    {
        $class_id = $request->class_id;
        $lesson_id = $request->lesson_id;
        $time = $request->time;
        DB::table('class_lesson')->where('lesson_id', '=', $lesson_id)->where('class_id', '=', $class_id)->update(['time' => format_date_to_mysql($time)]);
        return 'Đã lưu';
    }

    public function activate_class(Request $request)
    {
        $class_id = $request->class_id;
        $class = StudyClass::find($class_id);
        foreach ($class->registers as $regis) {
            $this->emailService->send_mail_activate_class($regis, ['colorme.vn.test@gmail.com']);
        }
        $class->activated = 1;
        $class->status = 0;
        $class->save();
        return "<strong class=\"cyan-text\">Đã kích hoạt</strong>";
    }

    public function change_attend_status(Request $request)
    {
        $attendance_id = $request->attendance_id;
        $attendance = Attendance::find($attendance_id);
        $attendance->status = ($attendance->status == 1) ? 0 : 1;
        $attendance->checker_id = $this->user->id;
        $attendance->device = "Máy tính";
        $attendance->save();
        return $attendance->device;
    }

    public function change_hw_status(Request $request)
    {
        $attendance_id = $request->attendance_id;
        $attendance = Attendance::find($attendance_id);
        $attendance->hw_status = ($attendance->hw_status == 1) ? 0 : 1;
        $attendance->checker_id = $this->user->id;
        $attendance->device = "Máy tính";
        $attendance->save();
        return $attendance->device;
    }

    public function test()
    {
        $data = [
            'event' => 'UserSignedUp',
            'data' => [
                'username' => 'John Doe'
            ]
        ];
        Redis::publish('test-channel', json_encode($data));

        return view('manage.test');
//
//        Cache::put('foo','bar',10);
//        return Cache::get('foo');

//        Redis::set('name','quan');
//        return Redis::get('name');


//        $class_id = 15;
//        $class = StudyClass::find($class_id);
////        dd($class->registers);
//        foreach ($class->registers as $regis) {
//            send_mail_activate_class($regis, ['colorme.idea@gmail.com']);
//        }
//        $data['class'] = $class;
//        $data['student'] = $this->user;
    }

    public function add_links($course_id)
    {
        $this->data['isEdit'] = false;
        $this->data['course_id'] = $course_id;
        $this->data['current_tab'] = 7;
        return view('manage.editlinks', $this->data);
    }

    public function edit_links($id)
    {
        $this->data['isEdit'] = true;
        $link = Link::find($id);
        $this->data['link'] = $link;
        $this->data['current_tab'] = 7;
        return view('manage.editlinks', $this->data);
    }

    public function delete_links($course_id, $id)
    {
        $link = Link::find($id);
        deleteFromS3($link->link_icon);
        $link->delete();
        return redirect('manage/editcourse/' . $course_id);
    }

    public function store_links(Request $request)
    {
        $link = Link::findOrNew($request->id);
        $link->link_name = $request->link_name;
        $link->link_url = $request->link_url;
        $link->link_description = $request->link_description;
        $link->course_id = $request->course_id;

        //Upload icons
        if ($request->link_icon != null) {

            $link_icon = uploadFileToS3($request, 'link_icon', 200, $link->link_icon);
            $link->link_icon = $link_icon;
            $link->link_icon_url = $this->s3_url . $link_icon;
        } else {
            if ($link->link_icon_url == null) {
                $link->link_icon_url = 'https://placehold.it/800x600';

            }
        }
        $link->save();
        return redirect('manage/editcourse/' . $request->course_id);
    }

    public function scan_qr_code()
    {
        $this->data['current_tab'] = 18;
        return view('manage.scanqrcode', $this->data);
    }

    public function get_attendances_by_code(Request $request)
    {
        $code = $request->code;

        $register = Register::where('code', '=', $code)->first();

        $attendances = $register->attendances;
        $student = $register->user;

        $this->data['attendances'] = $attendances;
        $this->data['student'] = $student;
        $this->data['register'] = $register;

        return view('ajax.attendances', $this->data);
    }

    public function save_lesson(Request $request)
    {
        $field = $request->field;
        $data = $request->data;
        $lesson_id = $request->lesson_id;

        $lesson = Lesson::find($lesson_id);
        $lesson->$field = $data;
        $lesson->save();

        return 'Đã lưu';
    }

    public function staff_detail($id)
    {
        $staff = User::find($id);

    }

    public function landing_edit($id)
    {

        $landing = Landing::find($id);
        $course = Course::all();

        $demos = json_decode($landing->demos, true);
        $timeline = json_decode($landing->timeline, true);
        $feedbacks = json_decode($landing->feedbacks, true);
        $reasons = json_decode($landing->reasons, true);

//        dd($landing->timeline);
//        dd(json_decode($landing->timeline, true));
//        dd($feedbacks);
        $this->data['reasons'] = $reasons;
        $this->data['demos'] = $demos;
        $this->data['timeline'] = $timeline;
        $this->data['feedbacks'] = $feedbacks;
        $this->data['courses'] = $course;
        $this->data['current_tab'] = 7;
        $this->data['action'] = "Sửa";
        $this->data['landing'] = $landing;


        return view('manage.landing_manage', $this->data);
    }

    public function landing_create()
    {
        $courses = Course::all();

        $this->data['courses'] = $courses;
        $this->data['action'] = "Tạo";
        $this->data['current_tab'] = 7;
        return view('manage.landing_manage', $this->data);
    }

    public function landing_store(Request $request)
    {

        $old_reason = array();
        $old_feedback = array();
        $old_timeline = array();

        if ($request->id == -1) {
            $landing = new Landing();
        } else {
            $landing = Landing::find($request->id);
            $old_reason = json_decode($landing->reasons, true);
            $old_feedback = json_decode($landing->feedbacks, true);
            $old_timeline = json_decode($landing->timeline, true);
        }

        $reasons_array = array();
        $demos_array = array();
        $timeline_array = array();
        $feedback_array = array();

        //Handle Reasons
        for ($j = 1; $j <= 3; $j++) {

            $name = 'reason_name' . $j;
            $detail = 'reason_detail' . $j;
            $img = 'reason_img' . $j;

            $reasons_array['reason_name' . $j] = $request->$name;
            $reasons_array['reason_detail' . $j] = $request->$detail;

            if ($request->id == -1) {
                $old_reason['reason_img_name' . $j] = null;
            }

            $reason_img_name = uploadFileToS3($request, $img, 250, $old_reason['reason_img_name' . $j]);
            if ($reason_img_name != null) {
                $reasons_array['reason_img_name' . $j] = $reason_img_name;
                $reasons_array['reason_img_url' . $j] = $this->s3_url . $reason_img_name;
            } else {
                if ($old_reason['reason_img_name' . $j] == null) {
                    $reasons_array['reason_img_name' . $j] = null;
                    $reasons_array['reason_img_url' . $j] = null;
                } else {
                    $reasons_array['reason_img_name' . $j] = $old_reason['reason_img_name' . $j];
                    $reasons_array['reason_img_url' . $j] = $old_reason['reason_img_url' . $j];
                }
            }
        }

        //Handle Demo Array
        for ($i = 1; $i <= 6; $i++) {
            $author = 'demo_author' . $i;
            $gen = 'demo_author_gen' . $i;
            $preview = 'demo_preview' . $i;
            $id = 'demo' . $i;

            $demos_array['demo_author' . $i] = $request->$author;
            $demos_array['demo_author_gen' . $i] = $request->$gen;
            $demos_array['demo_preview' . $i] = $request->$preview;
            $demos_array['demo' . $i] = $request->$id;
        }

        //Handle Timeline Array
        $loop = $request->class_number;
        for ($k = 1; $k <= $loop; $k++) {
            $class = 'class_name' . $k;
            $detail = 'class_detail' . $k;
            $img = 'class_img' . $k;

            $timeline_array['class_name' . $k] = $request->$class;
            $timeline_array['class_detail' . $k] = $request->$detail;


            if ($request->id == -1) {
                $old_timeline['class_img_name' . $k] = null;
            }

            $class_img_name = uploadFileToS3($request, $img, 156, $old_timeline['class_img_name' . $k]);
            if ($class_img_name != null) {
                $timeline_array['class_img_name' . $k] = $class_img_name;
                $timeline_array['class_img_url' . $k] = $this->s3_url . $class_img_name;
            } else {
                if ($old_timeline['class_img_name' . $k] == null) {
                    $timeline_array['class_img_name' . $k] = null;
                    $timeline_array['class_img_url' . $k] = null;
                } else {
                    $timeline_array['class_img_name' . $k] = $old_timeline['class_img_name' . $k];
                    $timeline_array['class_img_url' . $k] = $old_timeline['class_img_url' . $k];
                }
            }
        }

        //Handle Feedback Array
        for ($j = 1; $j <= 3; $j++) {

            $author = 'feedback_author' . $j;
            $detail = 'feedback_detail' . $j;
            $ava = 'feedback_ava' . $j;

            $feedback_array['feedback_author' . $j] = $request->$author;
            $feedback_array['feedback_detail' . $j] = $request->$detail;

            if ($request->id == -1) {
                $old_feedback['feedback_ava_name' . $j] = null;
            }

            $feedback_ava_name = uploadFileToS3($request, $ava, 250, $old_feedback['feedback_ava_name' . $j]);
            if ($feedback_ava_name != null) {
                $feedback_array['feedback_ava_name' . $j] = $feedback_ava_name;
                $feedback_array['feedback_ava_url' . $j] = $this->s3_url . $feedback_ava_name;
            } else {
                if ($old_feedback['feedback_ava_name' . $j] == null) {
                    $feedback_array['feedback_ava_name' . $j] = null;
                    $feedback_array['feedback_ava_url' . $j] = null;
                } else {
                    $feedback_array['feedback_ava_name' . $j] = $old_feedback['feedback_ava_name' . $j];
                    $feedback_array['feedback_ava_url' . $j] = $old_feedback['feedback_ava_url' . $j];
                }
            }
        }

        $cover_promo_name = uploadFileToS3($request, 'cover_promo', 1200, $landing->cover_promo_name);
        if ($cover_promo_name != null) {
            $landing->cover_promo_name = $cover_promo_name;
            $landing->cover_promo_url = $this->s3_url . $cover_promo_name;
        } else {
            if ($landing->cover_promo_name == null) {
                $landing->cover_promo_url = null;
            }
        }

        $demos = json_encode($demos_array);
        $timeline = json_encode($timeline_array);
        $feedbacks = json_encode($feedback_array);
        $reasons = json_encode($reasons_array);

        $landing->seo_url = $request->seo_url;
        $landing->class_number = $loop;
        $landing->course_id = $request->course_id;
        $landing->demos = $demos;
        $landing->feedbacks = $feedbacks;
        $landing->reasons = $reasons;
        $landing->timeline = $timeline;
        $landing->policy = $request->policy;
        $landing->video_url = $request->video_url;

        $landing->save();
        return redirect('/manage/courses');
    }

    public function landing_duplicate($sample_id)
    {
        $landing_new = new Landing();
        $landing_old = Landing::find($sample_id);

        $reasons_array = array();
        $timeline_array = array();
        $feedback_array = array();

        $feedbacks_old = json_decode($landing_old->feedbacks, true);
        $timeline_old = json_decode($landing_old->timeline, true);
        $reasons_old = json_decode($landing_old->reasons, true);

        //Handle Feedbacks
        for ($j = 1; $j <= 3; $j++) {

            $author = 'feedback_author' . $j;
            $detail = 'feedback_detail' . $j;
            $ava = 'feedback_ava' . $j;

            $feedback_array['feedback_author' . $j] = $feedbacks_old[$author];
            $feedback_array['feedback_detail' . $j] = $feedbacks_old[$detail];
            $feedback_array['feedback_ava_name' . $j] = null;
            $feedback_array['feedback_ava_url' . $j] = null;
        }

        //Handle Reasons
        for ($j = 1; $j <= 3; $j++) {

            $name = 'reason_name' . $j;
            $detail = 'reason_detail' . $j;
            $img = 'reason_img' . $j;

            $reasons_array['reason_name' . $j] = $reasons_old[$name];
            $reasons_array['reason_detail' . $j] = $reasons_old[$detail];

            $reasons_array['reason_img_name' . $j] = null;
            $reasons_array['reason_img_url' . $j] = null;
        }

        //Handle Timeline Array
        $loop = $landing_old->class_number;
        for ($k = 1; $k <= $loop; $k++) {
            $class = 'class_name' . $k;
            $detail = 'class_detail' . $k;
            $img = 'class_img' . $k;

            $timeline_array['class_name' . $k] = $timeline_old[$class];
            $timeline_array['class_detail' . $k] = $timeline_old[$detail];
            $timeline_array['class_img_name' . $k] = null;
            $timeline_array['class_img_url' . $k] = null;
        }

        $timeline = json_encode($timeline_array);
        $feedbacks = json_encode($feedback_array);
        $reasons = json_encode($reasons_array);

        $landing_new->reasons = $reasons;
        $landing_new->feedbacks = $feedbacks;
        $landing_new->timeline = $timeline;

        $landing_new->cover_promo_url = null;
        $landing_new->cover_promo_name = null;
        $landing_new->course_id = $landing_old->course_id;
        $landing_new->demos = $landing_old->demos;
        $landing_new->policy = $landing_old->policy;
        $landing_new->seo_url = $landing_old->seo_url;
        $landing_new->class_number = $landing_old->class_number;
        $landing_new->video_url = $landing_old->video_url;


        $landing_new->save();
        return redirect('/manage/courses');
    }

    public function landing_delete($id)
    {

        $landing = Landing::find($id);

        $feedbacks = json_decode($landing->feedbacks, true);
        $timeline = json_decode($landing->timeline, true);
        $reasons = json_decode($landing->reasons, true);

        //Handle Reasons Resource Delete
        for ($j = 1; $j <= 3; $j++) {
            deleteFromS3($reasons['reason_img_name' . $j]);
        }

        //Handle Timeline Resource Delete
        $loop = $landing->class_number;
        for ($k = 1; $k <= $loop; $k++) {
            deleteFromS3($timeline['class_img_name' . $k]);
        }

        //Handle Feedback Resource Delete
        for ($j = 1; $j <= 3; $j++) {
            deleteFromS3($feedbacks['feedback_ava_name' . $j]);
        }

        deleteFromS3($landing->cover_promo_name);

        $landing->delete();
        return redirect('/manage/courses');
    }

    public function downloadWaitList(Request $request)
    {
        // choose the current gen
        if ($request->gen_id) {
            $current_gen = Gen::find($request->gen_id);
        } else {
            $current_gen = Gen::getCurrentGen();
        }

        $waitClassesQuery = $current_gen->studyclasses()
            ->where("name", "not like", "%.%");


        if ($request->base_id) {
            $waitClassesQuery = $waitClassesQuery->where('base_id', $request->base_id);
        }

        $waitClassIds = $waitClassesQuery->pluck('id');

        $is_paid = 1;
        if ($request->is_paid != null) {
            $is_paid = $request->is_paid;
        }

        $registers_query = Register::where('gen_id', $current_gen->id)
            ->where('status', $is_paid)
            ->whereIn('class_id', $waitClassIds)
            ->orderBy('created_at', 'desc');

        $registers = $registers_query->get()->map(function ($register) {
            $student = new \stdClass();
            if ($register->call_status == 0) {
                $count = TeleCall::where('student_id', $register->user_id)->count();
                if ($count != 0) {
                    $register->call_status = 2;
                }
            }
            switch ($register->call_status) {
                case 0:
                    $student->call_status = "Chưa gọi";
                    break;
                case 1:
                    $student->call_status = "Thành công";
                    break;
                case 2:
                    $student->call_status = "Thất bại";
                    break;
            }
            $student->name = $register->user->name;
            $student->email = $register->user->email;
            $student->phone = $register->user->phone;
            $student->class_name = $register->studyClass->name;
            $student->created_at = format_date_full_option(strtotime($register->created_at));
            return $student;
        })->toArray();


        return Excel::create('Danh sách chờ ' . ($is_paid == 1 ? 'Đã đóng tiền' : "chưa đóng tiền") . ' Khoá ' . $current_gen->name,
            function ($excel) use ($registers) {
                $excel->sheet('students', function ($sheet) use ($registers) {
                    $sheet->fromArray(json_decode(json_encode($registers), true));
                });
            })->download('xls');
    }

    public function download_paid_students(Request $request)
    {
        $genId = $request->genid;
        $gen = Gen::find($genId);
        $registers_id = $gen->registers()->where('status', 1)->get()->pluck('user_id')->toArray();
        $students = User::whereIn('id', $registers_id)->get();
        $students = $students->map(function ($student) use ($gen) {

            $student->gender = gender($student->gender);
            $student->dob = format_date($student->dob);
            $registers = $student->registers()->where('gen_id', $gen->id)->get();
            $student->class = $registers->map(function ($register) {
                $class = $register->studyClass;
                $base = $class->base;
                if ($base) {
                    $className = $class->name . " (" . $base->name . ": " . $base->address . ")";
                } else {
                    $className = $class->name;
                }

                return $className;
            })->reduce(function ($carry, $item) {
                return $carry . ", " . $item;
            }, "");
            unset($student->id);
            unset($student->created_at);
            unset($student->updated_at);
            unset($student->role);
            unset($student->code);
            unset($student->avatar_url);
            unset($student->cover_url);
            unset($student->description);
            unset($student->money);
            unset($student->status);
            unset($student->avatar_name);
            unset($student->cover_name);
            unset($student->cover_name);
            unset($student->order);
            unset($student->registers);
            return $student;
        })->toArray();
        return Excel::create('Khoá ' . $gen->name, function ($excel) use ($students) {
            $excel->sheet('students', function ($sheet) use ($students) {
                $sheet->fromArray($students);
            });
        })->download('xls');
    }

}

