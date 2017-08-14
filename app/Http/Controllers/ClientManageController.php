<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ClientManageController extends Controller
{
    public function respond($data, $headers = [], $statusCode = 200)
    {
        return response()->json($data, $statusCode, $headers);
    }

    public function ping()
    {
        return $this->respond("Ok");
    }
}