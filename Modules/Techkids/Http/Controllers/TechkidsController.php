<?php

namespace Modules\Techkids\Http\Controllers;

use Illuminate\Routing\Controller;

class TechkidsController extends Controller
{
    public function index()
    {
        return view('techkids::index');
    }

    public function course()
    {
        return view('techkids::course');
    }
}
