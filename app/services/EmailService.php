<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 11/26/17
 * Time: 10:50 AM
 */

namespace App\Services;

use App\Course;
use App\EmailForm;
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
            $m->from(config('app.email_company_from'), config('app.email_company_name'));

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_mail_query($user, $view, $data, $subject)
    {
        Mail::queue($view, $data, function ($m) use ($user, $subject) {
            $m->from(config('app.email_company_from'), config('app.email_company_name'));

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_mail_not_queue($user, $view, $data, $subject)
    {
        Mail::send($view, $data, function ($m) use ($user, $subject) {
            $m->from(config('app.email_company_from'), config('app.email_company_name'));

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_marketing_mail($email, $view, $subject)
    {

        Mail::send($view, ['email' => $email], function ($m) use ($email, $subject) {
            $m->from(config('app.email_company_from'), config('app.email_company_name'));

            $m->to($email, $email)->subject($subject);
        });
    }

    public function send_mail_confirm_order($order, $emailcc)
    {
        $email_form = EmailForm::where('code', 'confirm_order');

        $subject = "[" . config('app.email_company_name') . "]Xác nhận đơn đặt hàng mua sách";

        $data = convert_email_form($email_form);
        $data = str_replace('[[EMAIL_ORDER]]', (!empty($order['email']) ? $order['email'] : ""), $data);
        $data = str_replace('[[NAME_ORDER]]', (!empty($order['name']) ? $order['name'] : ""), $data);

        Mail::queue('emails.view_email', $data, function ($m) use ($order, $subject) {
            $m->from(config('app.email_company_from'), config('app.email_company_name'));

            $m->to($order['email'], $order['name'])->bcc(config('app.email_company_to'))->subject($subject);
        });
    }

    public function send_mail_confirm_registration($user, $class_id, $emailcc)
    {

        $class = StudyClass::find($class_id);

        $course = Course::find($class->course_id);

        $email_form = EmailForm::where('code', 'confirm_registration')->first();

        $data = convert_email_form($email_form);
        $data = str_replace('[[COURSE_COVER_URL]]', $course->cover_url, $data);
        $data = str_replace('[[COURSE_NAME]]', $course->name, $data);
        $data = str_replace('[[COURSE_DURATION]]', $course->duration, $data);
        $data = str_replace('[[COURSE_PRICE]]', currency_vnd_format($course->price), $data);
        $data = str_replace('[[CLASS_NAME]]', $class->name, $data);
        $data = str_replace('[[CLASS_ADDRESS]]', ($class->base ? $class->base->name . ": " . $class->base->address : ""), $data);
        $data = str_replace('[[USER_NAME]]', $user->name, $data);
        $data = str_replace('[[USER_EMAIL]]', $user->email, $data);
        $data = str_replace('[[USER_PHONE]]', $user->phone, $data);
        $data = str_replace('[[USER_ADDRESS]]', $user->address, $data);
        $data = str_replace('[[USER_UNIVERSITY]]', $user->university, $data);
        $data = str_replace('[[USER_WORK]]', $user->work, $data);
        $data = str_replace('[[CLASS_STUDY_TIME]]', $user->phone, $data);

////        emails.confirm_registration_2
//        $data['class'] = $class;
//        $data['course'] = $course;
//        $data['user'] = $user;

        $subject = "[" . config('app.email_company_name') . "] Xác nhận đăng kí khoá học " . $course->name;

        Mail::queue('emails.view_email', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from(config('app.email_company_from'), config('app.email_company_name'));

            $m->to($user['email'], $user['name'])->bcc(config('app.email_company_to'))->subject($subject);
        });
    }

    public function send_mail_confirm_receive_student_money($register, $emailcc)
    {

        $user = $register->user;
        $class = $register->studyClass;
        $data['class'] = $class;
        $data['course'] = $register->studyClass->course;
        $data['user'] = $user;
        $data['register'] = $register;

        $subject = "[Alibaba English] Xác nhận thanh toán thành công khoá học " . $data['course']->name;

        Mail::queue('emails.confirm_money_email_2', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
    }

    public function send_mail_goodbye($register, $emailcc)
    {

        $user = $register->user;

        $data['student'] = $user;
        $data['class'] = $register->studyClass;

        $subject = "[Alibaba English] Lời chào tạm biệt từ Alibaba English";

        Mail::queue('emails.email_goodbye', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
    }

    public function send_mail_delete_register($register, $staff)
    {

        $user = $register->user;

        $data['student'] = $user;
        $data['class'] = $register->studyClass;
        $data['staff'] = $staff;

        $subject = "Xoá Register";

        Mail::send('emails.email_delete_register', $data, function ($m) use ($subject) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to("thanghungkhi@gmail.com", "Nguyễn Việt Hùng")->bcc("aquancva@gmail.com")->subject($subject);
        });
    }

    public function send_mail_activate_class($register, $emailcc)
    {

        $user = $register->user;
        $data['class'] = $register->studyClass;
        $data['student'] = $user;
        $data['regis'] = $register;
        $data['user'] = $user;
        $data['course'] = $data['class']->course;
        $subject = "[Alibaba English] Thông báo khai giảng khoá học " . $data['course']->name;

        Mail::queue('emails.activate_class_2', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_mail_lesson($user, $lesson, $class, $study_date, $emailcc)
    {

        $data['lesson'] = $lesson;
        $data['class'] = $class;
        $data['user'] = $user;
        $data['study_date'] = $study_date;

        $subject = "Lịch trình và Giáo trình Buổi " . $lesson->order . " Lớp " . $class->name;
        $data['subject'] = $subject;
        Mail::queue('emails.send_lesson', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');

            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
    }

    public function send_mail_regis_shift($user, $week, $gen, $emailcc)
    {

        $data['week'] = $week;
        $data['gen'] = $gen;
        $data['user'] = $user;

        $subject = "Đăng ký trực tuần " . $week . " Khoá " . $gen->name;
        $data['subject'] = $subject;
        Mail::queue('emails.mail_regis_shift', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Alibaba English');
            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
    }
}