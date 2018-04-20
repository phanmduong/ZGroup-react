<?php
namespace Modules\Elight\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use App\Lesson;

class ElightSendingMailController extends Controller
{
    public function contact_info(Request $request)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'message_str' => $request->message_str
        ];
        Mail::send('emails.elight_contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Elight');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->bcc("elightbook.popup@gmail.com")->subject($subject);
        });
        return "OK";
    }
    public function index_info(Request $request)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'time' => date('n/d/Y H:i:s'),
            'phone' => $request->phone,
        ];
        Mail::send('emails.elight_index', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Nhà sách Elight');
            $subject = $request->name . " - Elight Nhận thông tin tư vấn";
            $m->to($request->email, $request->name)->subject($subject);
        });

        Mail::send('emails.elight_index_staff', $data, function ($m) {
            $m->from('no-reply@colorme.vn', 'ELIGHT BOOK');
            $m->to("elightbook.popup@gmail.com")->subject('ĐƠN HÀNG ĐẶT MUA SÁCH TIẾNG ANH CƠ BẢN');
        });
    }
    public function book_info(Request $request)
    {
        $lesson = Lesson::find($request->lesson_id);
        $course = $lesson->course;
        $term = $lesson->term;

        $data = [
            'radio' => $request->radio,
            'message_str' => $request->message_str,
            'email' => $request->email,
            'lesson' => $lesson,
            'course' => $course,
            'term' => $term,
        ];
        Mail::send('emails.elight_book', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Nhà sách Elight');
            $subject = "Elight THƯ CẢM ƠN và PHIẾU GIẢM GIÁ";
            $m->to($request->email, $request->name)->subject($subject);
        });

        Mail::send('emails.elight_book_staff', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Nhà sách Elight');
            $subject = "ELIGHT FEEDBACK THU VIEN TU HOC";
            $m->to("elightbook.thuvientuhoc@gmail.com", $request->name)->subject($subject);
        });
    }

    public function aboutus_info(Request $request)
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'time' => date('n/d/Y H:i:s'),
            'phone' => $request->message_str,
        ];

        Mail::send('emails.elight_aboutus', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Nhà sách Elight');
            $subject = $request->name . " - Cảm ơn bạn đã liên lạc với Elight";
            $m->to($request->email, $request->name)->subject($subject);
        });
        
        Mail::send('emails.elight_index_staff', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Nhà sách Elight');
            $subject = "ELIGHT ABOUT US";
            $m->to("elightbook.popup@gmail.com", $request->name)->subject($subject);
        });
    }
}