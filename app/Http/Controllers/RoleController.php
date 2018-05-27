<?php

namespace App\Http\Controllers;

use App\Role;
use App\Tab;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Http\Response;

class RoleController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 2;
    }

    public function index()
    {
        return view('manage.role.index', $this->data);
    }

    public function nhanViens(Request $request)
    {
        $page = 1;
        $limit = 10;
        if ($request->limit) {
            $limit = $request->limit;
        }
        if ($request->page) {
            $page = $request->page;
        }

//        $nhanViens = User::where('role', ">", 0)->skip(($page - 1) * $limit)->take($limit)->get();
        $nhanViens = User::where('role', ">", 0)->get();
        return response()->json($nhanViens, 200);
    }

    public function roles(Request $request)
    {
        $page = 1;
        $limit = 0;
        if ($request->limit) {
            $limit = $request->limit;
        }
        if ($request->page) {
            $page = $request->page;
        }

//        $roles = Role::orderBy('created_at', 'desc')->skip(($page - 1) * $limit)->take($limit)->get();
        $roles = Role::orderBy('created_at', 'desc')->get();
        return response()->json($roles, 200);
    }

    public function role($roleId)
    {
        $role = Role::find($roleId);
        $role_tabs_id = $role->tabs()->pluck('tabs.id')->toArray();
        $tabs = Tab::all();
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
        return response()->json($data, 200);
    }

    public function tabs()
    {
        $tabs = Tab::all();
        $tabs = $tabs->map(function ($tab) {
            $tab->checked = false;
            return $tab;
        });
        return response()->json($tabs, 200);
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

            if ($t['checked'] == true) {
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
        return response()->json($msg, 200);
    }

    public function delete_role($id)
    {
        Role::find($id)->delete();
    }

    public function delete_staff($id)
    {
        $staff = User::find($id);
        $staff->role = 0;
        $staff->role_id = 0;
        $staff->save();
    }

    public function change_base($staffId, Request $request)
    {
        $staff = User::find($staffId);
        $staff->base_id = $request->base_id;;
        $staff->save();
        $msg = [
            'message' => "Updated"
        ];
        return response()->json($msg, 200);
    }

    public function change_role($staffId, Request $request)
    {
        $role_id = $request->role_id;
        $staff = User::find($staffId);
        $staff->role = 1;
        $staff->role_id = $role_id;
        $staff->save();
        $msg = [
            'message' => "Updated"
        ];
        return response()->json($msg, 200);
    }

}
