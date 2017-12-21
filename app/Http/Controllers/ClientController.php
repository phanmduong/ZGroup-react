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

    public function teaching()
    {
        return view("client.teaching");
    }

    public function base()
    {
        return view("client.base");
    }

    public function work()
    {
        return view("client.work");
    }

    public function blog()
    {
        return view("client.work");
    }

}
