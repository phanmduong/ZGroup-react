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

class ManageStaffApiController extends ManageApiController
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
            return $this->respondErrorWithStatus($errors);
        }

        $user = User::onlyTrashed()->where('username', '=', $username)->orWhere('email', '=', $request->email)->first();
        if (!$user) {
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
        $user->base_id = $request->base_id;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        $user->avatar_url = trim_url($request->avatar_url);
        if ($request->color) {
            $user->color = trim_color($request->color);
        }

        $user->password = bcrypt('123456');
        $user->deleted_at = null;
        $user->save();
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }

    public function get_staffs(Request $request)
    {
        $q = trim($request->search);

        $limit = 20;

        if ($q) {
            $staffs = User::where('role', ">", 0)
                ->where(function ($query) use ($q) {
                    $query->where('email', 'like', '%' . $q . '%')
                        ->orWhere('name', 'like', '%' . $q . '%')
                        ->orWhere('phone', 'like', '%' . $q . '%');
                })
                ->orderBy('created_at')->paginate($limit);
        } else {
            $staffs = User::where('role', ">", 0)->orderBy('created_at')->paginate($limit);
        }


        $data = [
            "staffs" => $staffs->map(function ($staff) {
                $staff->avatar_url = config('app.protocol') . trim_url($staff->avatar_url);
                return $staff;
            })
        ];
        return $this->respondWithPagination($staffs, $data);
    }

    public function get_staff($staffId)
    {
        $staff = User::find($staffId);
        $staff->avatar_url = config('app.protocol') . trim_url($staff->avatar_url);
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
            return $this->respondErrorWithStatus($errors);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->marital = $request->marital;
        $user->phone = $request->phone;
        $user->age = $request->age;
        $user->address = $request->address;
        $user->role_id = $request->role_id;
        $user->base_id = $request->base_id;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        if ($request->color) {
            $user->color = trim_color($request->color);
        }
        $user->save();
        $user->avatar_url = config('app.protocol') . trim_url($user->avatar_url);
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
            return $this->respondErrorWithStatus($errors);
        }

        $user->role_id = 0;
        $user->role = 0;
        $user->save();
        return $this->respondSuccessWithStatus("Xóa nhân viên thành công");
    }

    public function create_avatar(Request $request)
    {
        $avatar_url = uploadFileToS3($request, 'avatar', 250, $this->user->avatar_name);
        $avatar_url = $this->s3_url . $avatar_url;
        return $this->respond([
            "message" => "Tải lên thành công",
            "avatar_url" => config('app.protocol') . trim_url($avatar_url),
        ]);
    }

}