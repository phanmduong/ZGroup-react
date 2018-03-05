<?php

namespace Modules\Elight\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;

class ElightSendingMailController extends Controller
{
    public function contact_info(Request $request)
    {
        //dd($request);
        $data = [
            'name' => $request->name,
            'email' => $request->email, 
            'message_str' => $request->message_str
        ];
        // dd($data);

        Mail::send('emails.elight_contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Elight');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->subject($subject);
        });
        // Mail::send('emails.contact_us', $data, function ($m) use ($request) {
        //     $m->from('no-reply@colorme.vn', 'Graphics');
        //     $subject = "Xác nhận thông tin";
        //     $m->to($request->email, $request->name)->subject($subject);
        // });
        return "OK";
    }

    public function index_info(Request $request)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone
        ];
        dd($data);
        // Send mail
    }

    public function book_info(Request $request)
    {
        $data = [
            'radio' => $request->radio,
            'message_str' => $request->message_str,
            'phone' => $request->phone
        ];
        dd($data);
        // Send mail
    }

    public function aboutus_info(Request $request)
    {
        $data = [
            'message_str' => $request->message_str,
            'name' => $request->name,
            'phone' => $request->phone
        ];
        dd($data);
        // Send mail
    }
}
