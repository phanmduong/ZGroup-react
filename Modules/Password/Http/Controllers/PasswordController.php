<?php

namespace Modules\Password\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use App\Password;
use DB;

class PasswordController extends ManageApiController
{
    public function store(Request $request)
    {
        $pass = new Password();
        $pass->name = $request->name;
        $pass->code = $request->code;
        $pass->password = md5($request->password);
        $pass->save();
        return $this->respondSuccessWithStatus("Thêm thành công");
    }


    // public function show(Request $request, $code)
    // {
    //     $passwords = Password::where('code',$code)->get();
    //     $data = array();
    //     foreach ($passwords as $pass){
    //         $data[] = $pass;
    //     }
    //     return $data;
    // }


    public function edit(Request $request,$id)
    {
        $pass = Password::find($id);
        if($pass->password != md5($request->password)){
            $pass->password = md5($request->password);
            $pass->save();
            return $this->respondSuccessWithStatus("Đổi mật khẩu thành công");
        }else{
            return $this->respondErrorWithStatus("Đổi mật khẩu không thành công");
        }
    }

    public function destroy($id)
    {
        Password::where('id', $id)->delete();
        return $this->respondSuccessWithStatus("Xóa thành công");
    }

    public function showAll(Request $request)
    {
        $passwords = Password::all();
        return $this->respondSuccessWithStatus($passwords, [
           "passwords"=>$passwords->map(function ($password){
               return $password->transform();
           })
        ]);
    }
}
