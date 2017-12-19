<?php

namespace App\Http\Controllers;


class ClientController extends Controller
{

    public function __construct()
    {
    }

    public function email($path)
    {
        return view("client.email");
    }

    public function manufacture()
    {
        return view("client.manufacture");
    }

}
