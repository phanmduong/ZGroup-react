<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 7/20/17
 * Time: 17:25
 */

namespace App\Http\Controllers;


use App\Providers\AppServiceProvider;
use App\StudyClass;
use App\Role;
use App\Tab;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageStaffApiController extends ApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->middleware('is_admin');
    }

    public function add_staff(Request $request)
    {
        $errors = [];
        $user = User::where('email', '=', $request->email)->first();
        if ($user) {
            $errors['email'] = "Email đã có người sử dụng";
        }
        $username = trim($request->username);
        $user = User::where('username', '=', $username)->first();
        if ($user) {
            $errors['username'] = "Username đã có người sử dụng";
        }

        if (!empty($errors)) {
            return $this->responseNotAccepted($errors);
        }

        $user = User::onlyTrashed()->where('username', '=', $username)->first();
        if (!$user){
            $user = new User;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $username;
        $user->marital = $request->marital;
        $user->phone = $request->phone;
        $user->age = $request->age;
        $user->address = $request->address;
        $user->role = 1;
        $user->role_id = $request->role_id;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        $user->avatar_url = $request->avatar_url;


        $user->password = bcrypt('123456');
        $user->deleted_at = null;
        $user->save();
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }

    public function get_staffs()
    {
        $nhanViens = User::where('role', ">", 0)->get();
        return $this->respondSuccessWithStatus([
            'staffs' => $nhanViens
        ]);
    }

    public function get_staff( $staffId)
    {
        $staff = User::find($staffId);
        return $this->respondSuccessWithStatus(['staff' => $staff]);
    }

    public function get_roles()
    {
        $roles = Role::orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            'roles' => $roles
        ]);
    }

    public function change_role(Request $request)
    {
        $role_id = $request->role_id;
        $staff = User::find($request->staff_id);
        if ($staff->role != 2) {
            $staff->role = 1;
        }
        $staff->role_id = $role_id;
        $staff->save();
        return $this->respondSuccessWithStatus(['message' => "Thay đổi chức vụ thành công"]);
    }

    public function change_base(Request $request)
    {
        $staff = User::find($request->staff_id);
        $staff->base_id = $request->base_id;;
        $staff->save();
        return $this->respondSuccessWithStatus(['message' => "Thay đổi cơ sở thành công"]);
    }

    public function edit_staff(Request $request)
    {
        $errors = null;
        $username = trim($request->username);
        $user = User::where('username', '=', $username)->first();
        if (!$user) {
            $errors = "Tài khoản chưa tồn tại";
        }

        if ($errors) {
            return $this->responseNotAccepted($errors);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->marital = $request->marital;
        $user->phone = $request->phone;
        $user->age = $request->age;
        $user->address = $request->address;
        $user->role_id = $request->role_id;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        $user->save();
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }

    public function delete_staff(Request $request)
    {
        $errors = null;
        $username = trim($request->username);
        $user = User::where('username', '=', $username)->first();
        if (!$user) {
            $errors = "Tài khoản chưa tồn tại";
        }

        if ($errors) {
            return $this->responseNotAccepted($errors);
        }

        $user->delete();
        return $this->respondSuccessWithStatus("Xóa nhân viên thành công");
    }

}