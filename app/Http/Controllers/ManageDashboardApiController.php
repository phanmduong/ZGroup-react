<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/3/17
 * Time: 20:17
 */

namespace App\Http\Controllers;

use App\Repositories\ClassRepository;
use App\StudyClass;
use App\User;
use App\Base;
use App\Course;
use App\Gen;
use App\Register;
use App\Repositories\DashboardRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManageDashboardApiController extends ManageApiController
{
    protected $dashboardRepository;
    protected $classRepository;

    public function __construct(DashboardRepository $dashboardRepository, ClassRepository $classRepository)
    {
        parent::__construct();
        $this->dashboardRepository = $dashboardRepository;
        $this->classRepository = $classRepository;
    }

    public function dashboard($gen_id, $base_id = null)
    {

        $data = [];
        $gen = Gen::find($gen_id);
        $courses = Course::all();

        $date_array = createDateRangeArray(strtotime($gen->start_time), strtotime($gen->end_time));

        if ($base_id) {
            $base = Base::find($base_id);
            $classes = $base->classes()->where('gen_id', $gen_id);

            $registers = $this->dashboardRepository->registers($gen_id, $classes);
            $paid_number = $this->dashboardRepository->registers($gen_id, $classes)->where('status', 1)->where('money', '>', 0)->count();
            $zero_paid_number = $this->dashboardRepository->registers($gen_id, $classes)->where('status', 1)->where('money', '=', 0)->count();

            $data['total_classes'] = $classes->count();

            $classes_id = $classes->pluck("id");

            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $gen_id)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $gen_id)
                ->where('money', '>', 0)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $money_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date, sum(money) as money'))
                ->where('gen_id', $gen_id)
                ->whereIn("class_id", $classes_id)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('money', ' date');

        } else {
            $classes = $gen->studyclasses();
            $registers = $this->dashboardRepository->registers($gen_id);
            $paid_number = $this->dashboardRepository->registers($gen_id)->where('status', 1)->where('money', '>', 0)->count();
            $zero_paid_number = $this->dashboardRepository->registers($gen_id)->where('status', 1)->where('money', '=', 0)->count();

            $data['total_classes'] = $classes->count();

            $count_total = $this->user->sale_registers()->where('gen_id', $gen_id)->where(function ($query) {
                $query->where('status', 0)
                    ->orWhere('money', '>', 0);
            })->count();
            $count_paid = $this->user->sale_registers()->where('money', '>', 0)->where('gen_id', $gen_id)->count();
            $data['count_total'] = $count_total;
            $data['count_paid'] = $count_paid;

            $registers_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $gen_id)
                ->where(function ($query) {
                    $query->where('status', 0)
                        ->orWhere('money', '>', 0);
                })
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $paid_by_date_temp = Register::select(DB::raw('DATE(created_at) as date,count(1) as num'))
                ->where('gen_id', $gen_id)
                ->where('money', '>', 0)
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('num', 'date');

            $money_by_date_temp = Register::select(DB::raw('DATE(paid_time) as date, sum(money) as money'))
                ->where('gen_id', $gen_id)
                ->groupBy(DB::raw('DATE(paid_time)'))->pluck('money', ' date');
        }

        $data['classes'] = $classes->get()->map(function ($class) {
            return $this->classRepository->get_class($class);
        });
        $registers_by_date = array();
        $paid_by_date = array();
        $money_by_date = array();

        $di = 0;

        foreach ($date_array as $date) {

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
            } else {
                $money_by_date[$di] = 0;
            }
            $di += 1;
        }

        $total_paid_personal = $this->user->sale_registers()->where('gen_id', $gen->id)->where('money', '>', '0')->count();
        // tính bonus tiền
        $bonus = compute_sale_bonus_array($total_paid_personal)[0];

        foreach (Course::all() as $course) {
            $class_ids = $course->classes()->pluck('id')->toArray();
            $count = $this->user->sale_registers()->where('gen_id', $gen->id)->where('money', '>', '0')->whereIn('class_id', $class_ids)->count();

            $money = $course->sale_bonus * $count;
            $bonus += $money;
        }

        $target_revenue = 0;
        foreach ($classes->get() as $class) {
            $target_revenue += $class->target * $class->course->price * 0.5;
        }

        $courses = $classes->select('course_id', DB::raw('count(*) as total_classes'))->groupBy('course_id')->get();

        $courses = $courses->map(function ($c) {
            $course = Course::find($c->course_id);
            return [
                'total_classes' => $c->total_classes,
                'id' => $course->id,
                'name' => $course->name,
                'color' => $course->color,
            ];
        });

        $total_money = $registers->sum('money');
        $register_number = $registers->count();

        $remain_days = (strtotime($gen->end_time) - time());
        $percent_remain_days = $remain_days < 0 ? 0 :
            100 * $remain_days / (strtotime($gen->end_time) - strtotime($gen->start_time));
        $remain_days = round((is_numeric($remain_days) ? $remain_days : 0) / (24 * 3600), 2);

        $data['courses'] = $courses;
        $data['bonus'] = $bonus;
        $data['total_money'] = $total_money;
        $data['target_revenue'] = $target_revenue;
        $data['paid_number'] = $paid_number;
        $data['zero_paid_number'] = $zero_paid_number;
        $data['register_number'] = $register_number;
        $data['remain_days'] = $remain_days;
        $data['percent_remain_days'] = $percent_remain_days;
        $data['registers_by_date'] = $registers_by_date;
        $data['paid_by_date'] = $paid_by_date;
        $data['date_array'] = $date_array;
        $data['money_by_date'] = $money_by_date;


        $rating = $this->dashboardRepository->ratingUser($this->user);
        $user = $this->user;

        $is_saler = $registers->where('saler_id', $user->id)->first() ? true : false;

        $data['user'] = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'username' => $user->username,
            'avatar_url' => generate_protocol_url($user->avatar_url),
            'color' => $user->color,
            'current_role' => [
                'id' => $user->current_role->id,
                'role_title' => $user->current_role->role_title
            ],
            'role' => $user->role,
            'is_saler' => $is_saler
        ];

        if (!empty($rating))
            $data['user']['rating'] = $rating;

        return $this->respondSuccessWithStatus($data);
    }

    public function change_class_status(Request $request)
    {

        if ($this->user->role === 2) {
            $class_id = $request->class_id;
            $class = $this->classRepository->change_status($class_id);
            if ($class) {
                return $this->respondSuccessWithStatus([
                    'class' => [
                        'id' => $class->id,
                        'status' => $class->status
                    ]
                ]);
            }
            return $this->responseWithError("Có lỗi xảy ra");
        }

        return $this->responseUnAuthorized();
    }
}