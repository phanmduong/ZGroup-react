<?php

namespace Modules\Password\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Password;
use DB;
use PhpParser\Node\Expr\Array_;

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('password::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('password::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
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

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show(Request $request, $code)
    {
        $passwords = Password::where('code',$code)->get();
        $data = array();
        foreach ($passwords as $pass){
            $data[] = $pass;
        }
        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
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

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy($id)
    {
        Password::where('id', $id)->delete();
        return "Delete done";
    }
}
