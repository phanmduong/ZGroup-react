<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class UpCoworkingSpaceController extends Controller
{
    public function index()
    {
        return view('upcoworkingspace::index');
    }
}
