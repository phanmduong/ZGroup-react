<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class StudentAccessController extends Controller
{
    protected $user;
    protected $data;

    protected $s3_url;

    public function __construct()
    {
        $this->s3_url = config('app.s3_url');
        $this->middleware('auth');
        $this->data = array();
        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }
}
