<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 11/26/17
 * Time: 10:50 AM
 */

namespace App\Services;

use App\Course;
use App\StudyClass;
use Illuminate\Support\Facades\Mail;

class EmailService
{

    public function __construct()
    {
    }

    public function send_mail($user, $view, $subject)
    {

        Mail::send($view, ['user' => $user], function ($m) use ($user, $subject) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    function send_mail_query($user, $view, $data, $subject)
    {
        Mail::queue($view, $data, function ($m) use ($user, $subject) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    function send_mail_not_queue($user, $view, $data, $subject)
    {
        Mail::send($view, $data, function ($m) use ($user, $subject) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    function send_marketing_mail($email, $view, $subject)
    {

        Mail::send($view, ['email' => $email], function ($m) use ($email, $subject) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($email, $email)->subject($subject);
        });
    }

    function send_mail_confirm_order($order, $emailcc)
    {
        $data['order'] = $order;

        $subject = "Xác nhận đơn đặt hàng mua sách";

        Mail::queue('emails.confirm_order', $data, function ($m) use ($order, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($order['email'], $order['name'])->bcc($emailcc)->subject($subject);
        });
    }

    function send_mail_confirm_registration($user, $class_id, $emailcc)
    {

        $class = StudyClass::find($class_id);

        $course = Course::find($class->course_id);

        $data['class'] = $class;
        $data['course'] = $course;
        $data['user'] = $user;

        $subject = "[colorME] Xác nhận đăng kí khoá học " . $course->name;

        Mail::queue('emails.confirm_registration_2', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'colorME');

            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
    }


}