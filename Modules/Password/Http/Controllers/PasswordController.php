<?php

namespace Modules\Password\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Password;
use DB;

class PasswordController extends ManageApiController
{
    public function store(Request $request)
    {
        $pass = new Password();
        $pass->name = $request->name;
        $pass->password = md5($request->password);
        if($pass->save()){
            return response()->json([
                'id' => $pass->id,
            ]);
        }
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
            return "OK";
        }else{
            return "false";
        }
    }

    public function destroy($id)
    {
        Password::where('id', $id)->delete();
        return "Deleted";
    }

    public function showAll(Request $request)
    {
        return Password::all();
    }
}
