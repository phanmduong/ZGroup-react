<?php

namespace Modules\Staff\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\User;
use Faker\Provider\DateTime;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class StaffApiController extends ManageApiController
{
    /**
     * POST /staff
     * @return Response
     */
    public function createStaff(Response $request)
    {
        $errors = [];
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
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }

}
