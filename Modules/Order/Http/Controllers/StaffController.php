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
        $q = trim($request->search);

        $limit = $request->limit ? $request->limit : 20;

        $staffs = User::where('role', ">", 0)
            ->where(function ($query) use ($q) {
                $query->where('email', 'like', '%' . $q . '%')
                    ->orWhere('name', 'like', '%' . $q . '%')
                    ->orWhere('phone', 'like', '%' . $q . '%');
            })
            ->orderBy('created_at')->limit($limit)->get();

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
