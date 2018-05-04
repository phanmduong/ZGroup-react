<?php
namespace Modules\User\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ManageApiController;
use App\Gen;
use App\MarketingCampaign;
use Illuminate\Support\Facades\DB;
use App\Shift;
use App\WorkShiftUser;
use Modules\WorkShift\Providers\WorkShiftServiceProvider;
use App\WorkShift;
use App\Repositories\AttendancesRepository;
use App\Repositories\ClassRepository;
use App\StudyClass;
use App\ClassLesson;
use App\Register;
use App\Colorme\Transformers\RegisterTransformer;

class UserManageApiController extends ManageApiController
{
    protected $attendancesRepository;
    protected $classRepository;
    protected $registerTransformer;

    public function __construct(ClassRepository $classRepository, AttendancesRepository $attendancesRepository, RegisterTransformer $registerTransformer)
    {
        parent::__construct();
        $this->classRepository = $classRepository;
        $this->attendancesRepository = $attendancesRepository;
        $this->registerTransformer = $registerTransformer;
    }

    public function getDetailProfile(Request $request)
    {
        $gen_id = $request->gen_id ? $request->gen_id : Gen::getCurrentGen()->id;
        $gen = Gen::find($gen_id);
        
        $base_id = $request->base_id;
        
        $user = $this->user;
        // dd($user->id);
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'username' => $user->username,
            'avatar_url' => generate_protocol_url($user->avatar_url),
            'color' => $user->color,
            'marital' => $user->marital,
            'homeland' => $user->homeland,
            'literacy' => $user->literacy,
            'money' => $user->money,
            'start_company' => $user->start_company,
            'start_company_vi' => format_date($user->start_company),
            'address' => $user->address,
            'age' => $user->age,
            'color' => $user->color,
            'current_role' => [
                'id' => $user->current_role->id,
                'role_title' => $user->current_role->role_title
            ],
            'base' => [
                'name' => $user->base ?  $user->base->name : ""
            ]
        ];

        if ($user->department) {
            $data['department'] = [
                'name' => $user->department->name,
                'name' => $user->department->color,
            ];
        }

        //saler

        $registers = $user->sale_registers()->where('gen_id', $gen_id);

        $cloneRegisters = clone $registers;

        $is_saler = $cloneRegisters->where('saler_id', $user->id)->first() ? true : false;

        $data['total_registers_count'] = $cloneRegisters->count();

        $data['paid_registers_count'] = $cloneRegisters->where('status', 1)->count();//select(DB::raw('sum(status) as paid_registers_count'))->first()->paid_registers_count;

        $data['total_money'] = $cloneRegisters->select(DB::raw('sum(money) as total_money'))->first()->total_money;

        $date_array = createDateRangeArray(strtotime($gen->start_time), strtotime($gen->end_time));

        if ($base_id) {
            $base = Base::find($base_id);
            $classes = $base->classes()->where('gen_id', $gen_id);

            $classes_id = $classes->pluck("id");

            $registers = $registers->whereIn("class_id", $classes_id)
                                ->orderBy('created_at', 'desc');

            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->whereIn("class_id", $classes_id)
                ->where('saler_id',$user->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('money', '>', 0)
                ->whereIn("class_id", $classes_id)
                ->where('saler_id',$user->id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $money_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date, sum(money) as money'))
                ->whereIn("class_id", $classes_id)
                ->where('saler_id',$user->id)
                ->whereBetween('paid_time', array($gen->start_time, $gen->end_time))
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('money', ' date');
        } else {
            $registers = $registers->orderBy('created_at', 'desc');

            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $gen_id)
                ->where('saler_id',$user->id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('money', '>', 0)
                ->where('gen_id', $gen_id)
                ->where('saler_id',$user->id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $money_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date, sum(money) as money'))
                ->whereBetween('paid_time', array($gen->start_time, $gen->end_time))
                ->where('saler_id',$user->id)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('money', ' date');
        }

        $data['registers_paid'] = $this->registerTransformer->transformCollection((clone $registers)->where('status', 1)->take(10)->get());
        $data['registers'] = $this->registerTransformer->transformCollection((clone $registers)->where('status', 0)->take(10)->get());
        $data['total_registers_paid'] = (clone $registers)->where('status', 1)->count();
        $data['total_registers'] = (clone $registers)->where('status', 0)->count();
        // $data['registers'] = $registers->orderBy('created_at', 'desc')->get();

        $registers_by_date = array();
        $paid_by_date = array();
        $money_by_date = array();

        $di = 0;
        $sum_registers = 0;
        $total_money = 0;

        foreach ($date_array as $date) {

            if (isset($registers_by_date_temp[$date])) {
                $registers_by_date[$di] = $registers_by_date_temp[$date];
                $sum_registers += $registers_by_date[$di];
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
                $total_money += $money_by_date_temp[$date];
            } else {
                $money_by_date[$di] = 0;
            }

            $di += 1;
        }

        $data['has_registers'] = $sum_registers > 0;

        $data['campaigns'] = MarketingCampaign::join('registers', 'marketing_campaign.id', '=', 'registers.campaign_id')
            ->where('deleted_at', null)
            ->where('registers.gen_id', $gen_id)
            ->where('registers.saler_id', $user->id)
            ->select('marketing_campaign.*', DB::raw('count(*) as register_count'), DB::raw('sum(registers.status) as paid_register_count'), DB::raw('sum(money) as total_money'))
            ->groupBy('marketing_campaign.id')->get();
        
        $time = date('Y-m-d');
        $timenow = new \DateTime();
        $timenow = $timenow->getTimestamp();
        //shifts
        $shifts = Shift::whereBetween("shifts.date", array($time, date('Y-m-d', strtotime("+1 days"))))
            ->where('user_id', $user->id)
            ->join('shift_sessions', 'shifts.shift_session_id', '=', 'shift_sessions.id')
            ->orderBy('shifts.shift_session_id')
            ->select('shifts.*', 'shift_sessions.start_time', 'shift_sessions.end_time', 'shift_sessions.name')->get();
        $shifts = $shifts->map(function ($shift) use ($timenow) {
            $data = [
                'date' => format_vn_date(strtotime($shift->date)),
                'date_vi' => date_shift(strtotime($shift->date)),
                'id' => $shift->id,
                'name' => $shift->name,
                'start_shift_time' => format_time_shift(strtotime($shift->start_time)),
                'end_shift_time' => format_time_shift(strtotime($shift->end_time)),
            ];

            if ($shift->user) {
                $data['staff'] = [
                    'id' => $shift->user->id,
                    'name' => $shift->user->name,
                    'color' => $shift->user->color,
                ];
            }

            if ($shift->base) {
                $data['base'] = [
                    'id' => $shift->base->id,
                    'name' => $shift->base->name,
                ];
            }

            $data['checkin_status'] = "none";
            $data['checkout_status'] = "none";
            $time_start = strtotime($shift->start_time . ' ' .$shift->date);
            $time_end = strtotime($shift->end_time . ' ' .$shift->date);
            if ($timenow > $time_start){
                $data['checkin_status'] = "absent";
            }
            if ($timenow > $time_end){
                $data['checkout_status'] = "absent";
            }
            if ($shift->check_in){
                $data['check_in_time'] = format_time_shift(strtotime($shift->check_in->created_at));
                $time_checkin = strtotime($data['check_in_time'] . ' ' .$shift->date);
                if ($time_checkin <= $time_start){
                    $data['checkin_status'] = "accept";
                } else {
                    $data['checkin_status'] = "no-accept";
                }
            }
            if ($shift->check_out){
                $data['check_out_time'] = format_time_shift(strtotime($shift->check_out->created_at));
                $time_checkout = strtotime($data['check_out_time'] . ' ' .$shift->date);
                if ($time_checkout >= $time_end){
                    $data['checkout_status'] = "accept";
                } else {
                    $data['checkout_status'] = "no-accept";
                }    
            }

            return $data;

        });

        $data['shifts'] = $shifts;

        $shiftsTemp = 
        Shift::whereBetween("shifts.date", array(date('Y-m-d', strtotime('monday this week')), date('Y-m-d', strtotime('sunday this week'))))
            ->where('user_id', $user->id)->get();
        $data['has_shifts'] = !$shiftsTemp->isEmpty();


        //work shifts

        $workShifts = WorkShiftUser::join('work_shifts', 'work_shift_user.work_shift_id', '=', 'work_shifts.id')
            ->join('work_shift_sessions', 'work_shifts.work_shift_session_id', '=', 'work_shift_sessions.id')
            ->whereBetween("work_shifts.date", array($time, date('Y-m-d', strtotime("+1 days"))))
            ->orderBy('work_shifts.id');

        $workShifts = $workShifts->where('work_shift_user.user_id', $user->id)->get();

    
        $workShifts = $workShifts->map(function ($shift) use ($timenow){
            $data = [
                'date' => format_vn_date(strtotime($shift->date)),
                'date_vi' => date_shift(strtotime($shift->date)),
                'name' => $shift->name,
                'start_shift_time' => format_time_shift(strtotime($shift->start_time)),
                'end_shift_time' => format_time_shift(strtotime($shift->end_time)),
            ];
            $data['checkin_status'] = "none";
            $data['checkout_status'] = "none";
            $time_start = strtotime($shift->start_time . ' ' .$shift->date);
            $time_end = strtotime($shift->end_time . ' ' .$shift->date);
            if ($timenow > $time_start){
                $data['checkin_status'] = "absent";
            }
            if ($timenow > $time_end){
                $data['checkout_status'] = "absent";
            }
            if ($shift->check_in){
                $data['check_in_time'] = format_time_shift(strtotime($shift->check_in->created_at));
                $time_checkin = strtotime($data['check_in_time'] . ' ' .$shift->date);
                if ($time_checkin <= $time_start){
                    $data['checkin_status'] = "accept";
                } else {
                    $data['checkin_status'] = "no-accept";
                }
            }
            if ($shift->check_out){
                $data['check_out_time'] = format_time_shift(strtotime($shift->check_out->created_at));
                $time_checkout = strtotime($data['check_out_time'] . ' ' .$shift->date);
                if ($time_checkout >= $time_end){
                    $data['checkout_status'] = "accept";
                } else {
                    $data['checkout_status'] = "no-accept";
                }    
            }
                return $data;
        });

        $data['work_shifts'] = $workShifts;

        $workShiftsTemp = WorkShiftUser::join('work_shifts', 'work_shift_user.work_shift_id', '=', 'work_shifts.id')
        ->whereBetween("work_shifts.date", array(date('Y-m-d', strtotime('monday this week')), date('Y-m-d', strtotime('sunday this week'))))
        ->orderBy('work_shifts.id')
        ->where('work_shift_user.user_id', $user->id)->get();
        $data['has_work_shifts'] = !$workShiftsTemp->isEmpty();

        $classes = StudyClass::leftJoin('class_position','class_position.class_id', "=" , "classes.id")
        ->where("classes.gen_id",$gen_id)
        ->where(function($q) use ($user){
            $q->where('classes.teacher_id', $user->id)
            ->orWhere('class_position.user_id', $user->id);
        })->select("classes.*");

        $classes = $classes->get()->map(function ($class) use ($time){
            $dataClass = $this->classRepository->get_class($class);
            $dataClass['number_learned'] = $class->classLessons()->where('time','<',$time)->count();
            return $dataClass ;
        });

        //lecturer

        $start_time = date("Y-m-d", strtotime('monday this week'));
        $end_time = date("Y-m-d", strtotime('sunday this week'));
       
        $now_classes = StudyClass::orderBy('id');

        $now_classes = $now_classes->join('class_lesson', 'classes.id', '=', 'class_lesson.class_id')
        ->join('lessons','lessons.id','=','class_lesson.lesson_id' )
            ->where(function ($query) use ($user) {
                $query->where('classes.teacher_id', $user->id)->orWhere('classes.teaching_assistant_id', $user->id);
            })
            ->whereBetween('class_lesson.time', array($start_time,  $end_time))
            ->select('classes.*', 'lessons.order','class_lesson.time', 'class_lesson.start_time', 'class_lesson.end_time', 'class_lesson.id as class_lesson_id');

        $now_classes = $now_classes->get()->map(function ($class) {
            $dataClass = $this->classRepository->get_class($class);
            $dataClass['time'] = date_shift(strtotime($class->time));
            $dataClass['order'] = $class->order;
            $dataClass['start_time'] = format_time_shift(strtotime($class->start_time));
            $dataClass['end_time'] = format_time_shift(strtotime($class->end_time));
            $classLesson = ClassLesson::find($class->class_lesson_id);
            $dataClass['attendance_teachers'] = $this->attendancesRepository->attendance_teacher_class_lesson($classLesson);
            $dataClass['attendance_teacher_assistants'] = $this->attendancesRepository->attendance_ta_class_lesson($classLesson);
            return $dataClass;
        });
    
        $data['now_classes'] = $now_classes;
        $data['classes'] = $classes;

        $data['has_now_classes'] = !$now_classes->isEmpty();

        $data['registers_by_date'] = $registers_by_date;
        $data['paid_by_date'] = $paid_by_date;
        $data['date_array'] = $date_array;
        $data['money_by_date'] = $money_by_date;
        $data['total_money'] = $money_by_date;

        return $this->respondSuccessWithStatus(['user' => $data]);
    }

    public function teacherClassLessons(Request $request)
    {
        $user = $this->user;
        if ($request->start_time == null)
            $request->start_time = date('Y-m-d');
        if ($request->end_time == null)
            $request->end_time = date("Y-m-d", strtotime("+1 day", strtotime(date('Y-m-d'))));
        // dd([$request->start_time, $request->end_time]);
        $now_classes = StudyClass::orderBy('class_lesson.time');
        $now_classes = $now_classes->leftJoin('class_position','class_position.class_id', "=" , "classes.id")
                        ->where(function($q) use ($user){
                            $q->where('classes.teacher_id', $user->id)
                            ->orWhere('class_position.user_id', $user->id);
                        });
        $now_classes = $now_classes->join('class_lesson', 'classes.id', '=', 'class_lesson.class_id')
        ->join('lessons','lessons.id','=','class_lesson.lesson_id' )
            ->whereBetween('class_lesson.time', array($request->start_time, $request->end_time))
            ->select('classes.*',  'lessons.order','class_lesson.time', 'class_lesson.start_time', 'class_lesson.end_time', 'class_lesson.id as class_lesson_id');

        $now_classes = $now_classes->get()->map(function ($class) {
            $dataClass = $this->classRepository->get_class($class);
            $dataClass['time'] = $class->time;
            $dataClass['order'] = $class->order;
            $dataClass['start_time'] = format_time_shift(strtotime($class->start_time));
            $dataClass['end_time'] = format_time_shift(strtotime($class->end_time));
            $classLesson = ClassLesson::find($class->class_lesson_id);
            $dataClass['attendance_teachers'] = $this->attendancesRepository->attendance_teacher_class_lesson($classLesson);
            $dataClass['attendance_teacher_assistants'] = $this->attendancesRepository->attendance_ta_class_lesson($classLesson);
            return $dataClass;
        });

        return $this->respondSuccessWithStatus([
            'classes' => $now_classes
        ]);
    }

    public function userShifts(Request $request)
    {
        $user = $this->user;
        if ($request->start_time == null || $request->end_time == null) {
            $start_time = date('Y-m-d');
            $end_time = date("Y-m-d", strtotime("+1 week"));
        }
        else {
            $start_time = $request->start_time;
            $end_time = $request->end_time;
        }

        $timenow = new \DateTime();
        $timenow = $timenow->getTimestamp();

        $shifts = Shift::whereBetween("shifts.date", array($start_time, $end_time))
            ->where('user_id', $user->id)
            ->join('shift_sessions', 'shifts.shift_session_id', '=', 'shift_sessions.id')
            ->orderBy('shifts.shift_session_id')
            ->select('shifts.*', 'shift_sessions.start_time', 'shift_sessions.end_time', 'shift_sessions.name')->get();
            $shifts = $shifts->map(function ($shift) use ($timenow) {
                $data = [
                    'date' => format_vn_date(strtotime($shift->date)),
                    'date_vi' => date_shift(strtotime($shift->date)),
                    'id' => $shift->id,
                    'name' => $shift->name,
                    'start_shift_time' => format_time_shift(strtotime($shift->start_time)),
                    'end_shift_time' => format_time_shift(strtotime($shift->end_time)),
                ];
    
                if ($shift->user) {
                    $data['staff'] = [
                        'id' => $shift->user->id,
                        'name' => $shift->user->name,
                        'color' => $shift->user->color,
                    ];
                }
    
                if ($shift->base) {
                    $data['base'] = [
                        'id' => $shift->base->id,
                        'name' => $shift->base->name,
                    ];
                }
    
                $data['checkin_status'] = "none";
                $data['checkout_status'] = "none";
                $time_start = strtotime($shift->start_time . ' ' .$shift->date);
                $time_end = strtotime($shift->end_time . ' ' .$shift->date);
                if ($timenow > $time_start){
                    $data['checkin_status'] = "absent";
                }
                if ($timenow > $time_end){
                    $data['checkout_status'] = "absent";
                }
                if ($shift->check_in){
                    $data['check_in_time'] = format_time_shift(strtotime($shift->check_in->created_at));
                    $time_checkin = strtotime($data['check_in_time'] . ' ' .$shift->date);
                    if ($time_checkin <= $time_start){
                        $data['checkin_status'] = "accept";
                    } else {
                        $data['checkin_status'] = "no-accept";
                    }
                }
                if ($shift->check_out){
                    $data['check_out_time'] = format_time_shift(strtotime($shift->check_out->created_at));
                    $time_checkout = strtotime($data['check_out_time'] . ' ' .$shift->date);
                    if ($time_checkout >= $time_end){
                        $data['checkout_status'] = "accept";
                    } else {
                        $data['checkout_status'] = "no-accept";
                    }    
                }
    
                return $data;
    
            });

        return $this->respondSuccessWithStatus([
            'shifts' => $shifts
        ]);
    }

    public function userWorkShifts(Request $request)
    {
        $user = $this->user;
        if ($request->start_time == null || $request->end_time == null) {
            $start_time = date('Y-m-d');
            $end_time = date("Y-m-d", strtotime("+1 week"));
        }
        else {
            $start_time = $request->start_time;
            $end_time = $request->end_time;
        }
        $workShifts = WorkShiftUser::join('work_shifts', 'work_shift_user.work_shift_id', '=', 'work_shifts.id')
        ->join('work_shift_sessions', 'work_shifts.work_shift_session_id', '=', 'work_shift_sessions.id')
        ->whereBetween("work_shifts.date", array($start_time, $end_time))
        ->orderBy('work_shifts.id');

         $workShifts = $workShifts->where('work_shift_user.user_id', $user->id)->get();

        $timenow = new \DateTime();
        $timenow = $timenow->getTimestamp();

        $workShifts = $workShifts->map(function ($shift) use ($timenow){
            $data = [
                'date' => format_vn_date(strtotime($shift->date)),
                'date_vi' => date_shift(strtotime($shift->date)),
                'name' => $shift->name,
                'start_shift_time' => format_time_shift(strtotime($shift->start_time)),
                'end_shift_time' => format_time_shift(strtotime($shift->end_time)),
            ];
            $data['checkin_status'] = "none";
            $data['checkout_status'] = "none";
            $time_start = strtotime($shift->start_time . ' ' .$shift->date);
            $time_end = strtotime($shift->end_time . ' ' .$shift->date);
            if ($timenow > $time_start){
                $data['checkin_status'] = "absent";
            }
            if ($timenow > $time_end){
                $data['checkout_status'] = "absent";
            }
            if ($shift->check_in){
                $data['check_in_time'] = format_time_shift(strtotime($shift->check_in->created_at));
                $time_checkin = strtotime($data['check_in_time'] . ' ' .$shift->date);
                if ($time_checkin <= $time_start){
                    $data['checkin_status'] = "accept";
                } else {
                    $data['checkin_status'] = "no-accept";
                }
            }
            if ($shift->check_out){
                $data['check_out_time'] = format_time_shift(strtotime($shift->check_out->created_at));
                $time_checkout = strtotime($data['check_out_time'] . ' ' .$shift->date);
                if ($time_checkout >= $time_end){
                    $data['checkout_status'] = "accept";
                } else {
                    $data['checkout_status'] = "no-accept";
                }    
            }
                return $data;
        });

        $data['work_shifts'] = $workShifts;

        return $this->respondSuccessWithStatus([
            'work_shifts' => $workShifts
        ]);
    }
}