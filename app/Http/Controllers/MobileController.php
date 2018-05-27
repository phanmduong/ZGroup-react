<?php

namespace App\Http\Controllers;

use App\Attendance;
use App\Base;
use App\Colorme\Transformers\AttendanceTransformer;
use App\Colorme\Transformers\ClassTransformer;
use App\Colorme\Transformers\GenTransformer;
use App\Course;
use App\Gen;
use App\Lesson;
use App\Order;
use App\Register;
use App\Repositories\NotificationRepository;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class MobileController extends ApiController
{

    protected $classTransformer;
    protected $genTransformer;
    protected $attendanceTransformer;
    protected $notificationRepository;


    public function __construct(
        ClassTransformer $classTransfomer,
        NotificationRepository $notificationRepository,
        GenTransformer $genTransformer,
        AttendanceTransformer $attendanceTransformer)
    {
        parent::__construct();

        $this->classTransformer = $classTransfomer;
        $this->genTransformer = $genTransformer;
        $this->attendanceTransformer = $attendanceTransformer;
        $this->notificationRepository = $notificationRepository;
    }

    public function refreshToken()
    {
        $token = JWTAuth::fromUser($this->user);
        return $this->respond(['token' => $token]);
    }


    public function bases()
    {
        $bases = Base::orderBy('created_at', 'desc')->get();
        return response()->json([
            'bases' => $bases,
        ]);
    }


    public function gens()
    {
        $gens = Gen::orderBy('created_at', 'desc')->get();
        return response()->json([
            'gens' => $gens,
        ]);
    }

    public function courses()
    {
        $courses = Course::orderBy('created_at', 'desc')->get();
        return response()->json([
            'courses' => $courses->map(function ($course) {
                return $course->detailedTransform();
            })
        ]);
    }

    public function classes($gen_id, $baseId, $couseId)
    {
        $base = Base::find($baseId);
        $course = Course::find($couseId);
        if (!$base) {
            return response()->json([
                'error' => "Cơ sở không tồn tại",
            ], 404);
        }
        if (!$course) {
            return response()->json([
                'error' => "Môn học không tồn tại",
            ], 404);
        }
        $classes = StudyClass::where('course_id', $couseId)->where('base_id', $baseId)->where('gen_id', $gen_id)->get();

        return response()->json([
            'course' => [
                'name' => $course->name,
                'avatar_url' => $course->icon_url
            ],
            'classes' => $classes,
        ]);
    }

    public function lessons($courseId)
    {
        $course = Course::find($courseId);
        if (!$course) {
            return response()->json([
                'error' => "Môn học không tồn tại",
            ], 404);
        }
        $lessons = Lesson::where('course_id', $courseId)->orderBy('order')->get();
        return response()->json([
            'course' => [
                'id' => $course->id,
                'name' => $course->name,
                'avatar_url' => $course->icon_url
            ],
            'lessons' => $lessons,
        ]);
    }

    public function student_code($code)
    {
        $register = Register::where('code', $code)->first();

        if (!$register) {
            return response()->json([
                'error' => "Học viên không tồn tại",
            ], 404);
        }
        $student = $register->user;
        $student->attendances = $register->attendances->map(function ($attendance) use ($register) {
            if (time() > $attendance->classLesson->time) {
                $status = 1;
                if ($attendance->status == 0) {
                    $status = -100;
                }
                return [
                    'id' => $attendance->id,
                    'created_at' => format_vn_date(strtotime($attendance->classLesson->time)),
                    'order' => $attendance->classLesson->lesson->order,
                    'status' => $status
                ];
            } else {
                return [
                    'id' => $attendance->id,
                    'created_at' => format_vn_date(strtotime($attendance->classLesson->time)),
                    'order' => $attendance->classLesson->lesson->order,
                    'status' => $attendance->status
                ];
            }
        })->sortBy('order')->values()->all();

        return response()->json([
            'student' => $student,
            'class' => [
                'id' => $register->studyClass->id,
                'name' => $register->studyClass->name,
                'avatar_url' => $register->studyClass->course->icon_url
            ]
        ]);
    }

    public function attendance($attendance_id, Request $request)
    {
        $attendance = Attendance::find($attendance_id);
        if (!$attendance) {
            return response()->json([
                'error' => "Attendance không tồn tại",
            ], 404);
        }
        if (($request->status != 1 && $request->status != 0) ||
            (($request->hw_status != 1 && $request->hw_status != 0))
        ) {
            return response()->json([
                'error' => "status và hw_status phải bằng 0 hoặc 1",
            ], 400);
        }
        $attendance->status = ($request->status == 0) ? 0 : 1;
        $attendance->hw_status = ($request->hw_status == 0) ? 0 : 1;
        $user = JWTAuth::parseToken()->authenticate();
        $attendance->checker_id = $user->id;
        $attendance->register->received_id_card = 1;
        $attendance->register->save();
        $attendance->device = "Điện thoại";
        $attendance->save();

        $this->notificationRepository->sendConfirmStudentAttendanceNotification($this->user, $attendance);

        return response()->json([
            'message' => 'success',
            'attendance' => $attendance->transform(),
        ]);
    }

    public function dashboardv2($gen_id, Request $request, $base_id = null)
    {
        $data = [];
//        $data['user'] = $this->user;

        $current_gen = Gen::find($gen_id);

        $campaign_labels = null;
        $campaign_registers = null;
        $campaign_paids = null;

        $start_time = $request->start_time ? $request->start_time : $current_gen->start_time;
        $end_time = $request->end_time ? $request->end_time : $current_gen->end_time;
        $end_time_plus_1 = date("Y-m-d", strtotime("+1 day", strtotime($end_time)));

        $date_array = createDateRangeArray(strtotime($start_time), strtotime($end_time));

        $data['current_gen'] = [
            'name' => $current_gen->name,
            'id' => $current_gen->id,
            'start_time' => $current_gen->start_time,
            'end_time' => $current_gen->end_time
        ];
        if ($base_id == null) {

            $zero_paid_num = Register::where('gen_id', $current_gen->id)->where('status', '=', 1)->where('money', '=', 0)->count();
//            $total_money = Register::where('gen_id', $current_gen->id)->sum('money');
            $num = Register::where('gen_id', $current_gen->id)->count();
            $paid_number = Register::where('gen_id', $current_gen->id)->where('money', ">", 0)->count();
            $uncalled_number = Register::where('gen_id', $current_gen->id)->where('call_status', 0)->groupBy('user_id')->count();
            $total_classes = $current_gen->studyclasses->count();
            $remain_days = (strtotime($current_gen->end_time) - time());


            $total_paid_personal = $this->user->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')->count();
            $bonus = compute_sale_bonus($total_paid_personal);


            // ca nhan
            $registers_by_date_personal_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where('saler_id', $this->user->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_personal_temp = Register::select(DB::raw('DATE(paid_time) as date,count(1) as num'))
                ->whereBetween('paid_time', array($start_time, $end_time_plus_1))
                ->where('saler_id', $this->user->id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('num', 'date');

//            $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));

            // ca colorme
            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date,count(1) as num'))
                ->whereBetween('paid_time', array($start_time, $end_time_plus_1))
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('num', 'date');

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
                    $data["campaign_paids"] = $campaign_paids;
                }

                // end compute data for pie chart


                $count_total = $this->user->sale_registers()->where('gen_id', $current_gen->id)->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })->count();
                $count_paid = $this->user->sale_registers()->where('money', '>', 0)->where('gen_id', $current_gen->id)->count();
                $data['count_total'] = $count_total;
                $data['count_paid'] = $count_paid;
            }

            $registers_by_date_personal = array();
            $paid_by_date_personal = array();

            $registers_by_date = array();
            $paid_by_date = array();
            $money_by_date = array();

            $di = 0;

            $total_money = 0;

            $money_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date, sum(money) as money'))
                ->whereBetween('paid_time', array($start_time, $end_time_plus_1))
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('money', ' date');

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

                if (isset($money_by_date_temp[$date])) {
                    $money_by_date[$di] = $money_by_date_temp[$date];
                    $total_money += $money_by_date[$di];
                } else {
                    $money_by_date[$di] = 0;
                }

                $di += 1;
            }


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

            $money_today = DB::select(DB::raw(' select sum(money) as money from `registers` where date(paid_time)=curdate()'));
            $count_registers_today = DB::select(DB::raw(' select count(*) as num from `registers` where date(created_at)=curdate()'));

            $classes = $current_gen->studyclasses;
            $target_revenue = 0;
            foreach ($classes as $class) {
                $target_revenue += $class->target * $class->course->price * 0.55;
            }

            $target_revenue = round($target_revenue);



            $data['target_revenue'] = $target_revenue;

            $data['money_today'] = currency_vnd_format($money_today[0]->money);
            $data['count_registers_today'] = $count_registers_today[0]->num;

            $data['campaign_labels'] = $campaign_labels;
            $data['campaign_registers'] = $campaign_registers;

            $data['money_by_date'] = $money_by_date;
            $data['bonus'] = currency_vnd_format($bonus);
            $data['zero_paid_num'] = $zero_paid_num;
            $data['registers_by_date_personal'] = $registers_by_date_personal;
            $data['paid_by_date_personal'] = $paid_by_date_personal;
            $data['registers_by_date_personal_temp'] = $registers_by_date_personal_temp;
            $data['classes'] = $this->classTransformer->transformCollection($current_gen->studyclasses);
            $data['total_money'] = (is_numeric($total_money) ? $total_money : 0);
            $data['register_number'] = (is_numeric($num) ? $num : 0);
            $data['paid_number'] = (is_numeric($paid_number) ? $paid_number : 0);
            $data['uncalled_number'] = (is_numeric($uncalled_number) ? $uncalled_number : 0);
            $data['total_classes'] = (is_numeric($total_classes) ? $total_classes : 0);
            $data['remain_days'] = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);
            $data['date_array'] = $date_array;
            $data['registers_by_date'] = $registers_by_date;
            $data['paid_by_date'] = $paid_by_date;

            $data['registers_by_hour'] = $registers_hour_array;
            $data['orders_by_hour'] = array_values($return_orders);
            $data['month_ago'] = $month_ago;
            $data['gen_id'] = $current_gen->id;
            $data['user_id'] = $this->user->id;

        } else {
            $base = Base::find($base_id);
            $classes = $base->classes()->where('gen_id', $current_gen->id);

            $registers = Register::where('gen_id', $current_gen->id)->where('gen_id', $current_gen->id)->whereIn('class_id', $classes->pluck('id'));
            $zero_paid_num = Register::where('status', '=', 1)->where('money', '=', 0)->whereIn('class_id', $classes->pluck('id'))->count();
//            $total_money = $registers->sum('money');
            $num = $registers->count();
            $paid_number = $registers->where('gen_id', $current_gen->id)->where('money', ">", 0)->count();
            $uncalled_number = $registers->where('call_status', 0)->groupBy('user_id')->count();
            $total_classes = $classes->count();

            $remain_days = (strtotime($current_gen->end_time) - time());
            $classes_id = $classes->pluck("id");
            $registers_by_date = Register::select(DB::raw('count(1) as num'))->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(created_at)'))->pluck('num')->toArray();
            $classes_id2 = $base->classes()->pluck('id');

//            $total_paid_personal = $this->user->sale_registers()->where('gen_id', $current_gen->id)->where('money', '>', '0')->count();
//            $bonus = compute_sale_bonus($total_paid_personal);
//            $data['bonus'] = currency_vnd_format($bonus);
            $money_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date, sum(money) as money'))
                ->whereIn("class_id", $classes_id2)
                ->whereBetween('paid_time', array($start_time, $end_time_plus_1))
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('money', ' date');

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

//            $date_array = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));

            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $current_gen->id)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date,count(1) as num'))
                ->whereBetween('paid_time', array($start_time, $end_time_plus_1))
                ->where('money', '>', 0)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('num', 'date');

//            $registers_by_date_personal = array();
//            $paid_by_date_personal = array();

            $money_today = DB::select(DB::raw(' select sum(money) as money from `registers` 
                                                  where date(paid_time)=curdate() 
                                                  and class_id in 
                                                  (select id from classes where base_id = ' . $base_id . ')'));
            $count_registers_today = DB::select(DB::raw(' select count(*) as num from `registers` 
                                                          where date(created_at)=curdate() and class_id in 
                                                          (select id from classes where base_id = ' . $base_id . ')'));

            $data['money_today'] = currency_vnd_format($money_today[0]->money);
            $data['count_registers_today'] = $count_registers_today[0]->num;

            $data['campaign_labels'] = $campaign_labels;
            $data['campaign_registers'] = $campaign_registers;

            $di = 0;

            $total_money = 0;
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

                if (isset($money_by_date_temp[$date])) {
                    $money_by_date[$di] = $money_by_date_temp[$date];
                    $total_money += $money_by_date[$di];
                } else {
                    $money_by_date[$di] = 0;
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

            $data['target_revenue'] = $target_revenue;


            $data['orders_by_hour'] = null;
            $data['month_ago'] = null;
            $data['money_by_date'] = $money_by_date;
            $data['zero_paid_num'] = $zero_paid_num;
//            $data['bonus'] = currency_vnd_format($bonus);
//            $data['registers_by_date_personal'] = $registers_by_date_personal;
//            $data['paid_by_date_personal'] = $paid_by_date_personal;
            $data['registers_by_date_personal_temp'] = [];
            $data['classes'] = $this->classTransformer->transformCollection($classes->get());
            $data['total_money'] = (is_numeric($total_money) ? $total_money : 0);
            $data['register_number'] = (is_numeric($num) ? $num : 0);
            $data['paid_number'] = (is_numeric($paid_number) ? $paid_number : 0);
            $data['uncalled_number'] = (is_numeric($uncalled_number) ? $uncalled_number : 0);
            $data['total_classes'] = (is_numeric($total_classes) ? $total_classes : 0);
            $data['remain_days'] = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);
            $data['date_array'] = $date_array;
            $data['paid_by_date'] = $paid_by_date;
            $data['registers_by_date'] = $registers_by_date;
            $data['registers_by_hour'] = $registers_hour_array;
        }
        return response()->json($data, 200);
    }

    public function dashboard($gen_id, $base_id = null)
    {
//        $current_gen = Gen::getCurrentGen();
        if ($this->user->role == 0) {
            return $this->responseUnAuthorized('Bạn không có quyền truy cập dữ liệu này');
        }
        $data = [];
        if ($gen_id) {
            $current_gen = Gen::find($gen_id);
        } else {
            return response()->json([message => "gen_id is required"], 400);
        }

        $data['current_gen'] = $this->genTransformer->transform($current_gen);

        if ($base_id == null) {

            $zero_paid_num = Register::where('gen_id', $current_gen->id)->where('status', '=', 1)->where('money', '=', 0)->count();
            $total_money = Register::where('gen_id', $current_gen->id)->sum('money');
            $num = Register::where('gen_id', $current_gen->id)->count();
            $paid_number = Register::where('gen_id', $current_gen->id)->where('code', "!=", "")->count();
            $uncalled_number = Register::where('gen_id', $current_gen->id)->where('call_status', 0)->groupBy('user_id')->count();
            $total_classes = $current_gen->studyclasses->count();
            $remain_days = (strtotime($current_gen->end_time) - time());
            $registers_by_date = Register::select(DB::raw('count(1) as num'))->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(created_at)'))->pluck('num')->toArray();
            $money_by_date = Register::select(DB::raw('sum(money) as money'))->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(paid_time)'))->pluck('money')->toArray();
            $registers_by_hour = Register::select(DB::raw('HOUR(created_at) as \'hour\', count(1) as num'))->where('gen_id', $current_gen->id)->groupBy(DB::raw('HOUR(created_at)'))->get();
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

            $data['target_revenue'] = $target_revenue;
            $data['money_by_date'] = $money_by_date;
            $data['zero_paid_num'] = $zero_paid_num;
            $data['classes'] = $this->classTransformer->transformCollection($current_gen->studyclasses);
            $data['total_money'] = (is_numeric($total_money) ? $total_money : 0);
            $data['register_number'] = (is_numeric($num) ? $num : 0);
            $data['paid_number'] = (is_numeric($paid_number) ? $paid_number : 0);
            $data['uncalled_number'] = (is_numeric($uncalled_number) ? $uncalled_number : 0);
            $data['total_classes'] = (is_numeric($total_classes) ? $total_classes : 0);
            $data['remain_days'] = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);
            $data['date_array'] = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));
            $data['registers_by_date'] = $registers_by_date;
            $data['registers_by_hour'] = $registers_hour_array;
        } else {
            $base = Base::find($base_id);
            $classes = $base->classes()->where('gen_id', $current_gen->id);

            $registers = Register::where('gen_id', $current_gen->id)->where('gen_id', $current_gen->id)->whereIn('class_id', $classes->pluck('id'));
            $zero_paid_num = Register::where('status', '=', 1)->where('money', '=', 0)->whereIn('class_id', $classes->pluck('id'))->count();
            $total_money = $registers->sum('money');
            $num = $registers->count();
            $paid_number = $registers->where('gen_id', $current_gen->id)->where('code', "!=", "")->count();
            $uncalled_number = $registers->where('call_status', 0)->groupBy('user_id')->count();
            $total_classes = $classes->count();

            $remain_days = (strtotime($current_gen->end_time) - time());
            $classes_id = $classes->pluck("id");
            $registers_by_date = Register::select(DB::raw('count(1) as num'))->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(created_at)'))->pluck('num')->toArray();
            $registers_by_hour = Register::select(DB::raw('HOUR(created_at) as \'hour\', count(1) as num'))->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->groupBy(DB::raw('HOUR(created_at)'))->get();
            $money_by_date = Register::select(DB::raw('sum(money) as money'))->whereIn("class_id", $classes_id)->where('gen_id', $current_gen->id)->groupBy(DB::raw('DATE(paid_time)'))->pluck('money')->toArray();

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

            $data['target_revenue'] = $target_revenue;


            $data['money_by_date'] = $money_by_date;
            $data['zero_paid_num'] = $zero_paid_num;
            $data['classes'] = $this->classTransformer->transformCollection($current_gen->studyclasses);
            $data['total_money'] = (is_numeric($total_money) ? $total_money : 0);
            $data['register_number'] = (is_numeric($num) ? $num : 0);
            $data['paid_number'] = (is_numeric($paid_number) ? $paid_number : 0);
            $data['uncalled_number'] = (is_numeric($uncalled_number) ? $uncalled_number : 0);
            $data['total_classes'] = (is_numeric($total_classes) ? $total_classes : 0);
            $data['remain_days'] = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);
            $data['date_array'] = createDateRangeArray(strtotime($current_gen->start_time), strtotime($current_gen->end_time));
            $data['registers_by_date'] = $registers_by_date;
            $data['registers_by_hour'] = $registers_hour_array;
        }
        return response()->json($data, 200);

    }

}
