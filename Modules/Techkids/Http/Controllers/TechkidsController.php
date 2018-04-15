<?php

namespace Modules\Techkids\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class TechkidsController extends Controller
{
    public function index()
    {
        return view('techkids::index');
    }

}
