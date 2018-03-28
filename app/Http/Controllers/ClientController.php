<?php

namespace App\Http\Controllers;


class ClientController extends Controller
{

    public function __construct()
    {
        if (url('/') != url()->current()) {
            $path = explode(url('/') . '/', url()->current())[1];
        } else {
            $path = 'dashboard';
        }
        $this->middleware('permission_tab_react:' . $path);
    }

    public function email()
    {
        return view("client.email");
    }

    public function dashboard()
    {
        return view("client.dashboard");
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

    public function book()
    {
        return view("client.book");
    }

    public function hr()
    {
        return view("client.hr");
    }

    public function good()
    {
        return view("client.good");
    }

    public function work()
    {
        return view("client.work");
    }

    public function blog()
    {
        return view("client.blog");
    }

    public function marketing()
    {
        return view("client.marketing");
    }

    public function finance()
    {
        return view("client.finance");
    }

    public function profile()
    {
        return view("client.profile");
    }

    public function shift()
    {
        return view("client.shift");
    }

    public function workShift()
    {
        return view("client.workshift");
    }

    public function landingPage()
    {
        return view("client.landingpage");
    }

    public function survey()
    {
        return view('client.survey');
    }

    public function order()
    {
        return view('client.order');
    }

    public function notification()
    {
        return view('client.notification');
    }

    public function customerServices()
    {
        return view('client.customerServices');
    }
}
