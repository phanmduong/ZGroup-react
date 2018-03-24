<?php

namespace Modules\Password\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Password;
use DB;

class PasswordController extends Controller
{
    public function store(Request $request,$code)
    {
        $pass = new Password();
        $pass->code = $code;
        $pass->name = $request->name;
        $pass->password = md5($request->password);
        if($pass->save()){
            return response()->json([
                'id' => $pass->id,
                'code' => $code
            ]);
        }
    }


    public function show(Request $request, $code)
    {
        $passwords = Password::where('code',$code)->get();
        $data = array();
        foreach ($passwords as $pass){
            $data[] = $pass;
        }
        return $data;
    }


    public function edit(Request $request,$code,$id)
    {
        $pass = Password::find($id);
        if($pass){
            if($pass->code == $code){
                if($pass->password != md5($request->password)){
                    $pass->password = md5($request->password);
                    $pass->save();
                }else{
                    return "false";
                }
            }else{
                return "false";
            }
            return "OK";
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
