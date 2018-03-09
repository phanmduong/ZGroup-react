<?php

namespace Modules\Department\Http\Controllers;

use App\Department;
use App\Http\Controllers\ManageApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;


class DepartmentController extends ManageApiController
{
    public function getAllDepartment(Request $request)
    {
        if ($request->limit != -1) {
            $departments = Department::paginate(10);

            return $this->respondWithPagination($departments, [
                "departments" => $departments->map(function ($department) {
                    $users = $department->employees;
                    return [
                        "id" => $department->id,
                        "name" => $department->name,
                        "employees" => $users->map(function ($user) {
                            return [
                                "id" => $user->id,
                                "email" => $user->email,
                                "name" => $user->name,
                            ];
                        }),
                        "color" => $department->color
                    ];
                }),
            ]);
        } else {
            $departments = Department::all();
            return $this->respondSuccessWithStatus([
                "departments" => $departments->map(function ($department) {
                    return [
                        "id" => $department->id,
                        "name" => $department->name,
                    ];
                })
            ]);
        }
    }

    public function addDepartment(Request $request)
    {
        if ($request->name === null) return $this->respondErrorWithStatus("Thieu name");

        $department = new Department;
        $department->name = $request->name;
        $department->color = $request->color;
        $department->save();
        return $this->respondSuccessWithStatus([
            "message" => "Them thanh cong"
        ]);
    }

    public function editDepartment(Request $request)
    {
        $department = Department::find($request->id);
        if (!$department) return $this->respondErrorWithStatus("Khong ton tai");
        $department->name = $request->name;
        $department->color = $request->color;
        $department->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sua thanh cong"
        ]);
    }

    public function deleteDepartment($departmentId, Request $request)
    {
        $department = Department::find($departmentId);
        if (!$department) return $this->respondErrorWithStatus("Khong ton tai");
        $department->delete();
        return $this->respondSuccessWithStatus([
            "message" => "xoa thanh cong"
        ]);
    }

    public function addEmployees($departmentId, Request $request)
    {
        $department = Department::find($departmentId);
        if (!$department) return $this->respondErrorWithStatus("Khong ton tai bo phan");
        $user_arrs = json_decode($request->employees);
        foreach ($user_arrs as $user_arr) {
            $user = User::find($user_arr->id);
            if (!$user) return $this->respondErrorWithStatus("Khong ton tai nhan vien");
            $user->department_id = $departmentId;
            $user->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "them thanh cong"
        ]);
    }

    public function deleteEmployees($departmentId, Request $request)
    {
        $department = Department::find($departmentId);
        if (!$department) return $this->respondErrorWithStatus("Khong ton tai bo phan");
        $user_arrs = json_decode($request->employees);
        foreach ($user_arrs as $user_arr) {
            $user = User::find($user_arr->id);
            if (!$user) return $this->respondErrorWithStatus("Khong ton tai nhan vien");
            $user->department_id = 0;
            $user->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "xoa thanh cong"
        ]);

    }

    public function summaryEmployee(Request $request)
    {
        $pre_data = User::join('departments', 'departments.id', '=', 'users.department_id')
            ->select(DB::raw('count(users.id) as count'), DB::raw('departments.name as department_name'))
            ->where('users.role', '>', 0)->where('users.department_id', '>', 0)
            ->groupby('users.department_id')->get();
        return $this->respondSuccessWithStatus([
            'data' => $pre_data,
        ]);
    }
}
