<?php

namespace Modules\Order\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\ManageApiController;

class StaffController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getStaffs(Request $request)
    {
        $keyword = $request->search;

        $staffs = User::where('role', '<>', 0)->where(function ($query) use ($keyword){
            $query->where('name', 'like', "%$keyword%")->orWhere('email', 'like', "%$keyword%")->orWhere('phone', 'like', "%$keyword%");
        });

        $staffs->limit(20)->get();
        return $this->respondSuccessWithStatus([
            'staffs' => $staffs->map(function ($staff) {
                return [
                    'id' => $staff->id,
                    'name' => $staff->name,
                    'email' => $staff->email,
                    'phone' => $staff->phone,
                ];
            })
        ]);
    }
}
