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

class ManageRoleApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
        $this->middleware('permission_tab:2');
    }

    public function store_role(Request $request)
    {
        $tabs_data = $request->tabs;
        $role_data = $request->role;
        $role_id = $role_data['id'];

        if ($role_id != -1) {
            $role = Role::find($role_id);
        } else {
            $role = new Role();
        }

        $role->role_title = $role_data['role_title'];
        $role->save();
        $role->num_tabs = 0;
        foreach ($tabs_data as $t) {
            if (!empty($t['checked']) && $t['checked']) {
                $role->num_tabs += 1;
                $role->tabs()->attach($t['id']);
            } else {
                $role->tabs()->detach($t['id']);
            }
        }
        $role->save();
        $msg = [
            'message' => "Tạo chức vụ thành công"
        ];
        return $this->respondSuccessWithStatus($msg);
    }

    public function delete_role(Request $request)
    {
        $role = Role::where('id', '=', $request->role_id)->first();
        if (!$role) return $this->respondErrorWithStatus("Chức vụ không tồn tại");

        $role->delete();
        return $this->respondSuccessWithStatus(['message' => "Xóa chức vụ thành công"]);
    }

    public function get_role($roleId)
    {
        $role = Role::find($roleId);
        $role_tabs_id = $role->tabs()->pluck('tabs.id')->toArray();
        $tabs = Tab::orderBy('order')->get();
        $tabs = $tabs->map(function ($tab) use ($role_tabs_id) {
            if (in_array($tab->id, $role_tabs_id)) {
                $tab->checked = true;
            } else {
                $tab->checked = false;
            }
            return $tab;
        });
        $data = [
            'role' => $role,
            'tabs' => $tabs
        ];
        return $this->respondSuccessWithStatus($data);
    }

}