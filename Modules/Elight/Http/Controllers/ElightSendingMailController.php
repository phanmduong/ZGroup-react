<?php

namespace Modules\Elight\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;

class ElightSendingMailController extends Controller
{
    protected $emailcc="elightbook.popup@gmail.com";

    public function contact_info(Request $request)
    {
        //dd($request);
        $data = [
            'name' => $request->name,
            'email' => $request->email, 
            'message_str' => $request->message_str
        ];

        Mail::send('emails.elight_contact_us', $data, function ($m) use ($request, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Elight');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });
        return "OK";
    }

    public function index_info(Request $request)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone
        ];

        Mail::send('emails.elight_index', $data, function ($m) use ($request, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Elight');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });
    }

    public function book_info(Request $request)
    {
        $data = [
            'radio' => $request->radio,
            'message_str' => $request->message_str,
            'email' => $request->email
        ];

        Mail::send('emails.elight_book', $data, function ($m) use ($request, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Elight');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });
    }

    public function aboutus_info(Request $request)
    {
        $data = [
            'message_str' => $request->message_str,
            'name' => $request->name,
            'email' => $request->email
        ];
        Mail::send('emails.elight_aboutus', $data, function ($m) use ($request, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Elight');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });
    }
}
