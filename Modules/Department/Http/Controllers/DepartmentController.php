<?php

namespace Modules\Department\Http\Controllers;

use App\Department;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class DepartmentController extends ManageApiController
{
    public function getAllDepartment(Request $request)
    {
        $departments = Department::paginate(10);

        return $this->respondWithPagination($departments, [
            "departments" => $departments->map(function ($department) {
                return [
                    "id" => $department->id,
                    "name" => $department->name,
                ];
            }),
        ]);

    }

    public function addDepartment(Request $request)
    {
        if ($request->name === null) return $this->respondErrorWithStatus("Thieu name");

        $department = new Department;
        $department->name = $request->name;
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
        $department->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sua thanh cong"
        ]);
    }

    public function deleteDepartment(Request $request)
    {
        $department = Department::find($request->id);
        if (!$department) return $this->respondErrorWithStatus("Khong ton tai");
        $department->delete();
        return $this->respondSuccessWithStatus([
            "message" => "xoa thanh cong"
        ]);
    }
}
