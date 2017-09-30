<?php

namespace Modules\SocialApi\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Http\Requests;

class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    private function respond($status,$data){
        return response()->json([
            "status" => $status,
            "data" => $data
        ],200);
    }

    public function respondSuccess($data){
        return $this->respond(1, $data);
    }
    public function respondFail($data){
        return $this->respond(0, $data);
    }

    public function index()
    {
        return view('socialapi::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('socialapi::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('socialapi::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('socialapi::edit');
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
    public function destroy()
    {
    }
}

//<?php
//
//namespace App\Http\Controllers;
//
//use Illuminate\Http\Request;
//
//use App\Http\Requests;
//
//class ApiController extends Controller
//{
//    //
//    private function respond($status,$data){
//        return response()->json([
//            "status" => $status,
//            "data" => $data
//        ],200);
//    }
//
//    public function respondSuccess($data){
//        return $this->respond(1, $data);
//    }
//    public function respondFail($data){
//        return $this->respond(0, $data);
//    }
//}
