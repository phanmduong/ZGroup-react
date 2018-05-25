<?php

namespace App\Http\Controllers;

use App\Gen;
use App\Info;
use App\Product;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use stdClass;

class ManageInfoController extends Controller
{

    public function getInfo(Request $request)
    {

//        $this->data['current_tab'] = 55;
//        $info = Info::all();
//        $this->data['info'] = $info;
//        return view('info.index', $this->data);
        return response()->json($request->has('duong.test1'));
    }

}
