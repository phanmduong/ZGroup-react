<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PasswordController extends Controller
{
    public function doneResetPassword()
    {
        return view('auth.passwords.done');
    }
}
