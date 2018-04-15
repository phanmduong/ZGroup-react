<?php

namespace Modules\Demo\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class DemoController extends Controller
{
    public function index($theme, Request $request)
    {
        return view('demo::index');
    }
}
