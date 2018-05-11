<?php

/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 7/20/17
 * Time: 17:25
 */

namespace App\Http\Controllers;

use DB;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class ManageStaffApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
//        $this->middleware('permission_tab:2');
    }

    public function add_staff(Request $request)
    {
        $errors = [];
        $user = User::where('email', '=', trim($request->email))->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user) {
            $errors['email'] = 'Email đã có người sử dụng';
        }
        $username = trim($request->username);
        $user = User::where('username', '=', $username)->first();
        if ($user) {
            $errors['username'] = 'Username đã có người sử dụng';
        }

        if (!empty($errors)) {
            return $this->respondErrorWithStatus($errors);
        }

        $user = new User;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $username;
        $user->marital = $request->marital;
        $user->phone = $phone;
        $user->age = $request->age;
        $user->address = $request->address;
        $user->role = 1;
        $user->role_id = $request->role_id;
        $user->base_id = $request->base_id ? $request->base_id : 0;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        $user->avatar_url = trim_url($request->avatar_url);
        $user->department_id = $request->department_id;
        if ($request->color) {
            $user->color = trim_color($request->color);
        }

        $user->password = bcrypt('123456');
        $user->deleted_at = null;
        $user->save();
        return $this->respondSuccessWithStatus([
            'user' => $user
        ]);
    }

    public function get_staffs(Request $request)
    {
        $q = trim($request->search);

        $limit = $request->limit ? $request->limit : 20;
        
        if($limit == -1){
            
            $staffs = User::where('role', '>', 0)->get();
            
            if ($q) {
                $staffs = $staffs->where(function ($query) use ($q) {
                    $query->where('email', 'like', '%' . $q . '%')
                    ->orWhere('name', 'like', '%' . $q . '%')
                    ->orWhere('phone', 'like', '%' . $q . '%');
                });
            }
            
            return $this->respondSuccessWithStatus([
                "staffs" => $staffs->map(function($data){
                    return $data;
                })
            ]);
            return $this->respondSuccessWithStatus($staffs);
        }else{
            $staffs = User::where('role', '>', 0);

            if ($q) {
                $staffs = $staffs->where(function ($query) use ($q) {
                    $query->where('email', 'like', '%' . $q . '%')
                    ->orWhere('name', 'like', '%' . $q . '%')
                    ->orWhere('phone', 'like', '%' . $q . '%');
                });
            }
            $staffs = $staffs->orderBy('created_at')->paginate($limit);

            $data = [
                'staffs' => $staffs->map(function ($staff) {
                    $staff->avatar_url = config('app.protocol') . trim_url($staff->avatar_url);
                    return $staff;
                })
            ];
            return $this->respondWithPagination($staffs, $data);
        }
    }

    public function get_staff($staffId = null)
    {
        $staff = User::find($staffId);
        if ($staff == null) {
            $staff = User::find($this->user->id);
        }

        $staff->avatar_url = config('app.protocol') . trim_url($staff->avatar_url);
        return $this->respondSuccessWithStatus(['staff' => $staff]);
    }

    public function get_all_user_not_staff(Request $request)
    {
        $q = trim($request->search);

        $limit = 20;
        $users = User::where('role', '=', 0);

        if ($q) {
            $users = $users->where(function ($query) use ($q) {
                $query->where('email', 'like', '%' . $q . '%')
                    ->orWhere('name', 'like', '%' . $q . '%')
                    ->orWhere('phone', 'like', '%' . $q . '%');
            });
        }

        $users = $users->orderBy('created_at')->paginate($limit);

        $data = [
            'users' => $users->map(function ($user) {
                $user->avatar_url = config('app.protocol') . trim_url($user->avatar_url);
                return $user;
            })
        ];

        return $this->respondWithPagination($users, $data);
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
        return $this->respondSuccessWithStatus(['message' => 'Thay đổi chức vụ thành công']);
    }

    public function change_base(Request $request)
    {
        $staff = User::find($request->staff_id);
        $staff->base_id = $request->base_id;;
        $staff->save();
        return $this->respondSuccessWithStatus(['message' => 'Thay đổi cơ sở thành công']);
    }

    public function edit_staff($staff_id, Request $request)
    {
        $errors = [];
        $user = User::where('id', '=', $staff_id)->first();
        if (!$user) {
            $errors['message'] = 'Tài khoản chưa tồn tại';
            return $this->respondErrorWithStatus($errors);
        }

        if (User::where('id', '<>', $staff_id)->where('email', '=', $request->email)->first()) {
            $errors['email'] = 'Email đã tồn tại';
        }

        if (User::where('id', '<>', $staff_id)->where('username', '=', $request->username)->first()) {
            $errors['username'] = 'Username đã tồn tại';
        }

        if (!empty($errors)) {
            return $this->respondErrorWithStatus($errors);
        }

        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->marital = $request->marital;
        $user->phone = $phone;
        $user->age = $request->age;
        $user->address = $request->address;
        $user->role_id = $request->role_id;
        $user->base_id = $request->base_id;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        $user->department_id = $request->department_id;
        if ($request->color) {
            $user->color = trim_color($request->color);
        }
        $user->save();
        $user->avatar_url = config('app.protocol') . trim_url($user->avatar_url);
        return $this->respondSuccessWithStatus([
            'user' => $user
        ]);
    }

    public function delete_staff(Request $request)
    {
        $errors = null;
        $user = User::where('id', '=', $request->id)->first();
        if (!$user) {
            $errors = 'Tài khoản chưa tồn tại';
        }

        if ($errors) {
            return $this->respondErrorWithStatus($errors);
        }

        $user->role_id = 0;
        $user->role = 0;
        $user->save();
        return $this->respondSuccessWithStatus('Xóa nhân viên thành công');
    }

    public function create_avatar(Request $request)
    {
        $avatar_url = uploadFileToS3($request, 'avatar', 250, $this->user->avatar_name);
        $avatar_url = $this->s3_url . $avatar_url;
        return $this->respond([
            'message' => 'Tải lên thành công',
            'avatar_url' => config('app.protocol') . trim_url($avatar_url),
        ]);
    }

    public function reset_password(Request $request)
    {
        $staff = User::find($request->staff_id);
        $staff->password = bcrypt('123456');
        $staff->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Khôi phục mật khẩu thành công'
        ]);
    }

    public function convertDataUser()
    {
        $users = User::all();

        foreach ($users as $user) {
            if (!empty($user->phone) && (empty($user->password))) {
                $user->password = bcrypt($user->phone);
            }

//            $user->phone = preg_replace('/[^0-9]+/', '', $user->phone);
            $user->save();
        }

        return [
            'message' => 'thành công'
        ];
    }
}
