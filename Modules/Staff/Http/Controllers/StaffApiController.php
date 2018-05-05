<?php

namespace Modules\Staff\Http\Controllers;

use App\Currency;
use App\HistoryExtensionWork;
use App\Http\Controllers\ManageApiController;
use App\UserCurrency;
use App\Work;
use App\WorkStaff;
use Illuminate\Http\Request;
use App\User;
use DateTime;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Modules\Staff\Entities\Salary;

class StaffApiController extends ManageApiController
{
    /**
     * POST /staff
     * @return Response
     */
    public function createStaff(Request $request)
    {

        $errors = [];
        if (!$request->email || !$request->username || trim($request->username) == "" || trim($request->email) == "") {
            return $this->respondErrorWithStatus("Thiếu thông tin");
        }
        $user = User::where('email', '=', trim($request->email))->first();
        if ($user) {
            $errors['email'] = "Email đã có người sử dụng";
        }
        $username = trim($request->username);
        $user = User::where('username', '=', $username)->first();
        if ($user) {
            $errors['username'] = "Username đã có người sử dụng";
        }

        if (!empty($errors)) {
            return $this->respondErrorWithStatus($errors);
        }

        $phone = preg_replace('/[^0-9]+/', '', $request->phone);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $username;
        $user->phone = $phone;
        $user->department_id = $request->department_id;
        $user->role = 1;
        $user->role_id = $request->role_id;
        $user->start_company = new DateTime();
        $user->avatar_url = trim_url($request->avatar_url);
        if ($request->color) {
            $user->color = trim_color($request->color);
        }
        $user->password = Hash::make('123456');
        $user->save();
        $salary = new Salary;
        $salary->user_id = $user->id;
        $salary->base = $request->base ? $request->base : 0;
        $salary->revenue = $request->revenue ? $request->revenue : 0;
        $salary->allowance = $request->allowance ? $request->allowance : 0;
        $salary->save();
        $currencies = Currency::all();
        foreach ($currencies as $currency) {
            $user_currency = new UserCurrency;
            $user_currency->user_id = $user->id;
            $user_currency->currency_id = $currency->id;
            $user_currency->save();
        }
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }

    public function getStaffs(Request $request)
    {
        $limit = 20;
        if ($request->limit) {
            $limit = (int)$request->limit;
        }
        $staffs = User::where("role", ">", 0)->orderBy("name");
        if ($request->search)
            $staffs = $staffs->where('name', 'like', "%$request->search%");
        if ($request->base_id)
            $staffs = $staffs->where('base_id', $request->base_id);
        if ($request->department_id)
            $staffs = $staffs->where('department_id', $request->department_id);
        if ($limit === -1) {
            $staffs = $staffs->get();
            return $this->respond([
                "status" => 1,
                "staffs" => $staffs->map(function ($staff) {
                    return [
                        "id" => $staff->id,
                        "name" => $staff->name,
                        "avatar_url" => $staff->avatar_url ? $staff->avatar_url : defaultAvatarUrl()
                    ];
                })
            ]);
        }
        $staffs = $staffs->paginate($limit);
        return $this->respondWithPagination(
            $staffs,
            [
                "staffs" => $staffs->map(function ($staff) {
                    return $staff->getData();
                })
            ]
        );
    }

    public function changeStatusInWork($staffId, $workId, Request $request)
    {
        $staff = User::find($staffId);
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        if (!$staff) return $this->respondErrorWithStatus("Không tồn tại nhân viên");
        $work_staff = WorkStaff::where('work_id', $workId)->where('staff_id', $staffId)->first();
        if (!$work_staff) return $this->respondErrorWithStatus("Không tồn tại");
        if (!$request->status) return $this->respondErrorWithStatus("Thiếu status");
        $work_staff->status = $request->status;
        $work_staff->cost = $request->cost;
        $work_staff->rate_description = $request->rate_description;
        $work_staff->rate_star = $request->rate_star;
        $work_staff->save();

        $count_staff = WorkStaff::where('work_id', $workId)->count();

        $count_done = WorkStaff::where('work_id', $workId)->where('status', "done")->count();

        $count_doing = WorkStaff::where('work_id', $workId)->where('status', "doing")->count();
        $work = Work::find($workId);
        if ($count_staff == $count_done && $work->hired_status === 1) {
            $work->status = "done";
            $work->save();
        }

        if ($count_staff == $count_doing && $work->hired_status === 1) {
            $work->status = "doing";
            $work->save();
        }

        return $this->respondSuccessWithStatus([
            "message" => "Thành công"
        ]);

    }

    public function extensionWork($staffId, $workId, Request $request)
    {
        $staff = User::find($staffId);
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        if (!$staff) return $this->respondErrorWithStatus("Không tồn tại nhân viên");
        $log = new HistoryExtensionWork;
        $log->staff_id = $staffId;
        $log->work_id = $workId;
        $log->penalty = $request->penalty;
        $log->reason = $request->reason;
        $log->new_deadline = $request->new_deadline;
        $log->save();
        return $this->respondSuccessWithStatus([
            "message" => "Gia hạn công việc thành công"
        ]);
    }
    public function hireWork($staffId, $workId, Request $request)
    {
        $staff = User::find($staffId);
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        if (!$staff) return $this->respondErrorWithStatus("Không tồn tại nhân viên");
        if ($work->payer_id != $staffId) return $this->respondErrorWithStatus("Bạn không có quyền chi tiền");
        $work->hired_status = 1;
        $work->save();
        $count_staff = WorkStaff::where('work_id', $workId)->count();
        $count_doing = WorkStaff::where('work_id', $workId)->where('status', "doing")->count();
        if ($count_staff == $count_doing) {
            $work->status = "doing";
            $work->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "Thành công"
        ]);
    }

}
