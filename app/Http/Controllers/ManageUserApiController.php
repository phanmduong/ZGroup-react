<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/29/17
 * Time: 16:24
 */

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManageUserApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_profile()
    {
        $user = $this->user;
        return $this->respondSuccessWithStatus([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'username' => $user->username,
                'avatar_url' => generate_protocol_url($user->avatar_url),
                'color' => $user->color,
                'marital' => $user->marital,
                'homeland' => $user->homeland,
                'literacy' => $user->literacy,
                'money' => $user->money,
                'start_company' => $user->start_company,
                'start_company_vi' => format_date($user->start_company),
                'address' => $user->address,
                'age' => $user->age,
                'status' => $user->status,
                'current_role' => [
                    'id' => $user->current_role->id,
                    'role_title' => $user->current_role->role_title
                ]
            ]
        ]);
    }

    public function change_avatar(Request $request)
    {
        $avatar_url = uploadFileToS3($request, 'avatar', 250, $this->user->avatar_name);
        $avatar_url = $this->s3_url . $avatar_url;
        if ($avatar_url != null) {
            $staff = User::find($request->id);
            $staff->avatar_url = trim_url($avatar_url);
            $staff->save();
        }
        return $this->respond([
            "message" => "Tải lên thành công",
            "avatar_url" => generate_protocol_url(trim_url($avatar_url)),
        ]);
    }

    public function edit_profile(Request $request)
    {
        $user = $this->user;

        $errors = [];
        if (!$user) {
            $errors['message'] = "Tài khoản chưa tồn tại";
            return $this->respondErrorWithStatus($errors);
        }

        if (User::where('id', '<>', $user->id)->where('email', '=', $request->email)->first()) {
            $errors['email'] = "Email đã tồn tại";

        }

        if (User::where('id', '<>', $user->id)->where('username', '=', $request->username)->first()) {
            $errors['username'] = "Username đã tồn tại";

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

    public function change_password(Request $request)
    {
        if (!isset($request->old_password)) {
            return $this->respondErrorWithStatus("Vui lòng nhập mật khẩu cũ");
        }

        if (!isset($request->new_password)) {
            return $this->respondErrorWithStatus("Vui lòng nhập mật khẩu mới");
        }

        if (Hash::check($request->old_password, $this->user->password)) {
            $this->user->fill([
                'password' => Hash::make($request->new_password)
            ])->save();
            return $this->respondSuccessWithStatus([
                'message' => "Thay đổi mật khẩu thành công"
            ]);
        } else {
            return $this->respondErrorWithStatus("Mật khẩu cũ sai.");
        }
    }

    public function change_password_student(Request $request)
    {

        $user = User::find($request->id);

        if ($user == null) {
            return $this->respondErrorWithStatus("Không tồn tại.");
        }

        if ($user->role_id > 0) {
            return $this->respondErrorWithStatus("Không thể thay đổi mật khẩu.");
        }

        if (!isset($request->new_password)) {
            return $this->respondErrorWithStatus("Vui lòng nhập mật khẩu mới");
        }

        $user->fill([
            'password' => Hash::make($request->new_password)
        ])->save();

        return $this->respondSuccessWithStatus([
            'message' => "Thay đổi mật khẩu thành công"
        ]);
    }
}