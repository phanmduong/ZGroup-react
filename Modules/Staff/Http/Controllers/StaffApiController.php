<?php

namespace Modules\Staff\Http\Controllers;

use App\Http\Controllers\ManageApiController;
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
        if (!$request->name || !$request->email || !$request->phone || !$request->username) {
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

        $phone = trim($request->phone);
        $user = User::where("phone", $phone)->first();

        if ($user) {
            $errors['phone'] = "Số điện thoại đã có người sử dụng";
        }

        if (!empty($errors)) {
            return $this->respondErrorWithStatus($errors);
        }

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $username;
        $user->phone = $request->phone;
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
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }

    public function getStaffs(Request $request)
    {
        $limit = 20;
        if ($request->limit) {
            $limit = $request->limit;
        }
        $staffs = User::where("role", ">", 0)->orderBy("name");
        if ($limit === -1) {
            $staffs = $staffs->get();
            return $this->respond([
                "status" => 1,
                "staffs" => $staffs->map(function ($staff) {
                    return [
                        "id" => $staff->id,
                        "name" => $staff->name
                    ];
                })
            ]);
        } else {
            $staffs = $staffs->paginate($limit);
            return $this->respondWithPagination(
                $staffs,
                [
                    "staffs" => $staffs->map(function ($staff) {
                        return [
                            "id" => $staff->id,
                            "name" => $staff->name
                        ];
                    })
                ]
            );
        }


    }

}
