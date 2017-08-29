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
                'start_company' => $user->start_company,
                'start_company_vi' => format_date($user->start_company),
                'address' => $user->address,
                'age' => $user->age,
                'color' => $user->color,
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
            "avatar_url" => config('app.protocol') . trim_url($avatar_url),
        ]);
    }

    public function edit_profile(Request $request)
    {
        $user = $this->user;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->marital = $request->marital;
        $user->phone = $request->phone;
        $user->age = $request->age;
        $user->address = $request->address;
        $user->homeland = $request->homeland;
        $user->literacy = $request->literacy;
        $user->start_company = $request->start_company;
        if ($request->color) {
            $user->color = $request->color;
        }
        $user->save();
        $user->avatar_url = config('app.protocol') . trim_url($user->avatar_url);
        return $this->respondSuccessWithStatus([
            "user" => $user
        ]);
    }
}