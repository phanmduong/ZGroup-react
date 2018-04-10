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


class UserManageApiController extends ManageApiController
{
    protected $attendancesRepository;
    protected $classRepository;

    public function __construct(ClassRepository $classRepository, AttendancesRepository $attendancesRepository)
    {
        parent::__construct();
        $this->classRepository = $classRepository;
        $this->attendancesRepository = $attendancesRepository;
    }

    public function getDetailProfile(Request $request)
    {
        $gen_id = $request->gen_id ? $request->gen_id : Gen::getCurrentGen()->id;
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
            ]
        ];
        //saler

        $registers = $user->sale_registers()->where('gen_id', $gen_id);

        $cloneRegisters = clone $registers;

        $data['total_registers_count'] = $cloneRegisters->count();

        $data['paid_registers_count'] = $cloneRegisters->where('status', 1)->count();//select(DB::raw('sum(status) as paid_registers_count'))->first()->paid_registers_count;

        $data['total_money'] = $cloneRegisters->select(DB::raw('sum(money) as total_money'))->first()->total_money;

        $data['registers'] = $registers->orderBy('created_at', 'desc')->get();

        $data['campaigns'] = MarketingCampaign::join('registers', 'marketing_campaign.id', '=', 'registers.campaign_id')
            ->where('deleted_at', null)
            ->where('registers.gen_id', $gen_id)
            ->where('registers.saler_id', $user->id)
            ->select('marketing_campaign.*', DB::raw('count(*) as register_count'), DB::raw('sum(registers.status) as paid_register_count'), DB::raw('sum(money) as total_money'))
            ->groupBy('marketing_campaign.id')->get();
        
        //shifts
        $start = date('Y-m-d');
        $end = date("Y-m-d", strtotime("+1 week"));
        // dd([$start, $end]);
        $shifts = Shift::whereRaw('date between "' . $start . '" and "' . $end . '"')
            ->where('user_id', $user->id)
            ->join('shift_sessions', 'shifts.shift_session_id', '=', 'shift_sessions.id')
            ->orderBy('shifts.shift_session_id')
            ->select('shifts.*', 'shift_sessions.start_time', 'shift_sessions.end_time', 'shift_sessions.name')->get();
        $shifts = $shifts->map(function ($shift) {
            $attendanceShift = [
                'id' => $shift->id,
                'name' => $shift->name,
                'start_shift_time' => format_time_shift(strtotime($shift->start_time)),
                'end_shift_time' => format_time_shift(strtotime($shift->end_time)),
            ];

            if ($shift->user) {
                $attendanceShift['staff'] = [
                    'id' => $shift->user->id,
                    'name' => $shift->user->name,
                    'color' => $shift->user->color,
                ];
            }

            if ($shift->base) {
                $attendanceShift['base'] = [
                    'id' => $shift->base->id,
                    'name' => $shift->base->name,
                ];
            }

            if ($shift->check_in) {
                $attendanceShift['check_in_time'] = format_time_shift(strtotime($shift->check_in->created_at));
            }

            if ($shift->check_out) {
                $attendanceShift['check_out_time'] = format_time_shift(strtotime($shift->check_out->created_at));
            }

            return $attendanceShift;

        });

        if ($shifts->count() != 0)
            $data['shifts'] = $shifts;
        //work shifts

        $workShifts = WorkShiftUser::join('work_shifts', 'work_shift_user.work_shift_id', '=', 'work_shifts.id')
            ->join('work_shift_sessions', 'work_shifts.work_shift_session_id', '=', 'work_shift_sessions.id')
            ->orderBy('work_shifts.id');

        $week = WorkShift::where('gen_id', $gen_id)->max('week');

        if ($gen_id)
            $workShifts = $workShifts->where('work_shifts.gen_id', $gen_id);

        if ($week)
            $workShifts = $workShifts->where('work_shifts.week', $week);

        $workShifts = $workShifts->where('work_shift_user.user_id', $user->id)->get();

        $workShifts = $workShifts->map(function ($shift) {
            $data = [
                'date' => date_shift(strtotime($shift->date)),
                'name' => $shift->name,
                'start_shift_time' => format_time_shift(strtotime($shift->start_time)),
                'end_shift_time' => format_time_shift(strtotime($shift->end_time)),
            ];
            if ($shift->check_in)
                $data['check_in_time'] = format_time_shift(strtotime($shift->check_in->created_at));
            if ($shift->check_out)
                $data['check_out_time'] = format_time_shift(strtotime($shift->check_out->created_at));
            return $data;
        });

        $data['work_shifts'] = $workShifts;

        //lecturer
        $time = date('Y-m-d');
        $time = "2018-5-12";
        $now_classes = StudyClass::orderBy('id');

        $now_classes = $now_classes->join('class_lesson', 'classes.id', '=', 'class_lesson.class_id')
            ->where(function ($query) use ($user) {
                $query->where('classes.teacher_id', $user->id)->orWhere('classes.teaching_assistant_id', $user->id);
            })
            ->whereRaw('time = "' . $time . '"')
            ->select('classes.*', 'class_lesson.time', 'class_lesson.start_time', 'class_lesson.end_time', 'class_lesson.id as class_lesson_id');

        $now_classes = $now_classes->get()->map(function ($class) {
            $dataClass = $this->classRepository->get_class($class);
            $dataClass['time'] = $class->time;
            $dataClass['start_time'] = format_time_shift(strtotime($class->start_time));
            $dataClass['end_time'] = format_time_shift(strtotime($class->end_time));
            $classLesson = ClassLesson::find($class->class_lesson_id);
            $dataClass['attendance_teachers'] = $this->attendancesRepository->attendance_teacher_class_lesson($classLesson);
            $dataClass['attendance_teacher_assistants'] = $this->attendancesRepository->attendance_ta_class_lesson($classLesson);
            return $dataClass;
        });

        if ($now_classes->count() > 0) {
            $data['classes'] = $now_classes;
        }

        return $this->respondSuccessWithStatus(['user' => $data]);
    }
}