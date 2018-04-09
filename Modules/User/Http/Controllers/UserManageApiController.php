<?php
namespace Modules\User\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserManageApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDetailProfile()
    {
        $user = $this->user;
        $data = [
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
            'color' => $user->color,
            'current_role' => [
                'id' => $user->current_role->id,
                'role_title' => $user->current_role->role_title
            ]
        ];
        return $this->respondSuccessWithStatus(['user' => $data]);
    }
}