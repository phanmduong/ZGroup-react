<?php

namespace App\Services;

use App\EmailForm;
use App\Course;
use App\StudyClass;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    protected $emailCompanyName;
    protected $emailCompanyFrom;
    protected $emailCompanyTo;
    protected $emailCompanyLogo;

    public function __construct()
    {
        $this->emailCompanyName = config('app.email_company_name');
        $this->emailCompanyFrom = config('app.email_company_from');
        $this->emailCompanyTo = config('app.email_company_to');
    }

    public function send_mail($user, $view, $subject)
    {
        Mail::send($view, ['user' => $user], function ($m) use ($user, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_mail_query($user, $view, $data, $subject)
    {
        if (empty($user['email'])) {
            return;
        }
        Mail::queue($view, $data, function ($m) use ($user, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_mail_queue($user, $data, $subject)
    {
        if (empty($user['email'])) {
            return;
        }
        Mail::queue('emails.view_email', ['data' => $data], function ($m) use ($user, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_mail_queue_cc($user, $data, $subject)
    {
        if (empty($user['email'])) {
            return;
        }
        Mail::queue('emails.view_email', ['data' => $data], function ($m) use ($user, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            if (!empty($this->emailCompanyTo)) {
                $m->to($user['email'], $user['name'])->bcc($this->emailCompanyTo)->subject($subject);
            } else {
                $m->to($user['email'], $user['name'])->subject($subject);
            }
        });
    }

    public function send_mail_not_queue($user, $view, $data, $subject)
    {
        Mail::send($view, $data, function ($m) use ($user, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            $m->to($user['email'], $user['name'])->subject($subject);
        });
    }

    public function send_marketing_mail($email, $view, $subject)
    {
        Mail::send($view, ['email' => $email], function ($m) use ($email, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            $m->to($email, $email)->subject($subject);
        });
    }

    public function send_mail_confirm_order($order, $emailcc)
    {
        $email_form = EmailForm::where('code', 'confirm_order');

        $subject = '[' . $this->emailCompanyName . ']Xác nhận đơn đặt hàng mua sách';

        $data = convert_email_form($email_form);
        $data = str_replace('[[EMAIL_ORDER]]', (!empty($order['email']) ? $order['email'] : ''), $data);
        $data = str_replace('[[NAME_ORDER]]', (!empty($order['name']) ? $order['name'] : ''), $data);

        $this->send_mail_queue_cc($order, $data, $subject);
    }

    public function send_mail_confirm_registration($user, $class_id)
    {
        $class = StudyClass::find($class_id);

        $course = Course::find($class->course_id);

        $email_form = EmailForm::where('code', 'confirm_registration')->first();

        $data = convert_email_form($email_form);
        $searchReplaceArray = [
            '[[EMAIL_COMPANY_NAME]]' => $this->emailCompanyName,
            '[[COURSE_COVER_URL]]' => $course->cover_url,
            '[[COURSE_NAME]]' => $course->name,
            '[[COURSE_DURATION]]' => $course->duration,
            '[[COURSE_PRICE]]' => currency_vnd_format($course->price),
            '[[CLASS_ROOM]]' => ($class->room ? $class->room->name : ''),
            '[[CLASS_NAME]]' => $class->name,
            '[[CLASS_ADDRESS]]' => ($class->base ? $class->base->name . ': ' . $class->base->address : ''),
            '[[CLASS_DATE_START]]' => $class->datestart,
            '[[USER_NAME]]' => $user->name,
            '[[USER_EMAIL]]' => $user->email,
            '[[USER_PHONE]]' => $user->phone,
            '[[USER_ADDRESS]]' => $user->address,
            '[[USER_UNIVERSITY]]' => $user->university,
            '[[USER_WORK]]' => $user->work,
            '[[CLASS_STUDY_TIME]]' => $class->study_time
        ];
        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );

        $subject = '[' . $this->emailCompanyName . '] Xác nhận đăng kí khoá học ' . $course->name;

        $this->send_mail_queue_cc($user, $data, $subject);
    }

    public function send_mail_confirm_receive_student_money($register)
    {
        $user = $register->user;
        $class = $register->studyClass;
        $course = $register->studyClass->course;

        $email_form = EmailForm::where('code', 'confirm_receive_student_money')->first();

        $data = convert_email_form($email_form);

        $searchReplaceArray = [
            '[[COURSE_COVER_URL]]' => $course->cover_url,
            '[[COURSE_NAME]]' => $course->name,
            '[[COURSE_DURATION]]' => $course->duration,
            '[[COURSE_PRICE]]' => currency_vnd_format($course->price),
            '[[CLASS_NAME]]' => $class->name,
            '[[CLASS_ADDRESS]]' => ($class->base ? $class->base->name . ': ' . $class->base->address : ''),
            '[[CLASS_ROOM]]' => ($class->room ? $class->room->name : ''),
            '[[CLASS_STUDY_TIME]]' => $class->study_time,
            '[[CLASS_DATE_START]]' => $class->datestart,
            '[[USER_NAME]]' => $user->name,
            '[[USER_EMAIL]]' => $user->email,
            '[[USER_PHONE]]' => $user->phone,
            '[[USER_ADDRESS]]' => $user->address,
            '[[REGISTER_PAID_TIME]]' => $register->paid_time,
            '[[REGISTER_MONEY]]' => currency_vnd_format($register->money),
            '[[REGISTER_CODE]]' => $register->code,
        ];

        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );

        $subject = '[' . $this->emailCompanyName . '] Xác nhận thanh toán thành công khoá học ' . $course->name;

        $this->send_mail_queue_cc($user, $data, $subject);
    }

    public function send_mail_goodbye($register, $emailcc)
    {
        $email_form = EmailForm::where('code', 'goodbye')->first();

        $data = convert_email_form($email_form);

        $user = $register->user;

        $class = $register->studyClass;

        $searchReplaceArray = [
            '[[COURSE_DURATION]]' => $class->course->duration,
            '[[CLASS_NAME]]' => $class->name,
            '[[USER_NAME]]' => $user->name,
        ];

        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );

        $subject = '[' . $this->emailCompanyName . '] Lời chào tạm biệt từ ' . $this->emailCompanyName;

        $this->send_mail_queue($user, $data, $subject);
    }

    public function send_mail_delete_register($register, $staff)
    {
        $user = $register->user;

        $data['student'] = $user;
        $data['class'] = $register->studyClass;
        $data['staff'] = $staff;

        $subject = 'Xoá Register';

        Mail::queue('emails.email_delete_register', $data, function ($m) use ($subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);

            $m->to($this->emailCompanyTo, $this->emailCompanyName)->subject($subject);
        });
    }

    public function send_mail_activate_class($register, $emailcc)
    {
        $class = $register->studyClass;
        $course = $class->course;

        $user = $register->user;

        $class = $register->studyClass;

        $email_form = EmailForm::where('code', 'active_class')->first();

        $data = convert_email_form($email_form);

        $searchReplaceArray = [
            '[[COURSE_COVER_URL]]' => $course->cover_url,
            '[[COURSE_NAME]]' => $course->name,
            '[[COURSE_DURATION]]' => $course->duration,
            '[[COURSE_LINK_MAC]]' => $course->linkmac,
            '[[COURSE_MAC_HOW_INSTALL]]' => $course->mac_how_install,
            '[[COURSE_LINK_WINDOW]]' => $course->linkwindow,
            '[[COURSE_WINDOW_HOW_INSTALL]]' => $course->window_how_install,
            '[[COURSE_PRICE]]' => currency_vnd_format($course->price),
            '[[CLASS_NAME]]' => $class->name,
            '[[CLASS_ADDRESS]]' => ($class->base ? $class->base->name . ': ' . $class->base->address : ''),
            '[[CLASS_ROOM]]' => ($class->room ? $class->room->name : ''),
            '[[CLASS_STUDY_TIME]]' => $class->study_time,
            '[[CLASS_DATE_START]]' => $class->datestart,
            '[[USER_NAME]]' => $user->name,
            '[[USER_EMAIL]]' => $user->email,
            '[[USER_PHONE]]' => $user->phone,
            '[[REGISTER_CODE]]' => $register->code,
        ];

        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );

        $subject = '[' . $this->emailCompanyName . '] Thông báo khai giảng khoá học ' . $course->name;

        $this->send_mail_queue_cc($user, $data, $subject);
    }

    public function send_mail_confirm_change_class($register, $oldclass)
    {
        $class = $register->studyClass()->first();
        $course = $class->course;

        $user = $register->user;

        $email_form = EmailForm::where('code', 'confirm_change_class')->first();

        $data = convert_email_form($email_form);

        $searchReplaceArray = [
            '[[COURSE_DURATION]]' => $course->duration,
            '[[COURSE_PRICE]]' => currency_vnd_format($course->price),
            '[[CLASS_NAME]]' => $class->name,
            '[[CLASS_ADDRESS]]' => ($class->base ? $class->base->name . ': ' . $class->base->address : ''),
            '[[CLASS_ROOM]]' => ($class->room ? $class->room->name : ''),
            '[[CLASS_STUDY_TIME]]' => $class->study_time,
            '[[CLASS_DATE_START]]' => $class->datestart,
            '[[USER_NAME]]' => $user->name,
            '[[USER_EMAIL]]' => $user->email,
            '[[USER_PHONE]]' => $user->phone,
            '[[REGISTER_CODE]]' => $register->code,
            '[[OLD_CLASS_NAME]]' => $oldclass,
            '[[NEW_CLASS_NAME]]' => $class->name,
        ];

        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );

        $subject = '[' . $this->emailCompanyName . '] Xác nhận đã đổi thành công từ lớp ' . $oldclass . ' sang lớp ' . $class->name;

        $this->send_mail_queue_cc($user, $data, $subject);
    }

    public function send_mail_confirm_change_code($register, $oldCode)
    {
        $class = $register->studyClass;
        $course = $class->course;

        $user = $register->user;

        $class = $register->studyClass;

        $email_form = EmailForm::where('code', 'confirm_change_code')->first();

        $data = convert_email_form($email_form);

        $searchReplaceArray = [
            '[[COURSE_DURATION]]' => $course->duration,
            '[[COURSE_NAME]]' => $course->name,
            '[[COURSE_PRICE]]' => currency_vnd_format($course->price),
            '[[CLASS_NAME]]' => $class->name,
            '[[CLASS_ADDRESS]]' => ($class->base ? $class->base->name . ': ' . $class->base->address : ''),
            '[[CLASS_ROOM]]' => ($class->room ? $class->room->name : ''),
            '[[CLASS_STUDY_TIME]]' => $class->study_time,
            '[[CLASS_DATE_START]]' => $class->datestart,
            '[[USER_NAME]]' => $user->name,
            '[[USER_EMAIL]]' => $user->email,
            '[[USER_PHONE]]' => $user->phone,
            '[[REGISTER_CODE]]' => $register->code,
            '[[OLD_REGISTER_CODE]]' => $oldCode,
            '[[NEW_REGISTER_CODE]]' => $register->code,
        ];

        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );

        $subject = '[' . $this->emailCompanyName . '] Xác nhận đã đổi thành công từ mã học viên ' . $oldCode . ' sang mã ' . $register->code;

        $this->send_mail_queue($user, $data, $subject);
    }

    public function send_mail_lesson($user, $lesson, $class, $study_date, $emailcc)
    {
        $subject = 'Lịch trình và Giáo trình Buổi ' . $lesson->order . ' Lớp ' . $class->name;

        $email_form = EmailForm::where('code', 'lesson')->first();

        $data = convert_email_form($email_form);

        $searchReplaceArray = [
            '[[SUBJECT]]' => $subject,
            '[[STUDY_DATE]]' => $study_date,
            '[[LESSON_ORDER]]' => $lesson->order,
            '[[COURSE_NAME]]' => $class->course->name,
            '[[CLASS_NAME]]' => $class->name,
            '[[CLASS_ADDRESS]]' => ($class->base ? $class->base->name . ': ' . $class->base->address : ''),
            '[[CLASS_ROOM]]' => ($class->room ? $class->room->name : ''),
            '[[CLASS_STUDY_TIME]]' => $class->study_time,
            '[[CLASS_DATE_START]]' => $class->datestart,
            '[[USER_NAME]]' => $user->name,
            '[[USER_EMAIL]]' => $user->email,
            '[[USER_PHONE]]' => $user->phone,
            '[[LINK_LESSON]]' => config('app.protocol') . config('app.domain') . '/resource/' .
                convert_vi_to_en($lesson->course->name) . '/lesson/' . $lesson->id,
            '[[LINK_LESSON_CONTENT]]' => config('app.protocol') . config('app.domain') .
                '/student/lessoncontent/' . $lesson->id,
        ];

        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $data
        );
        $this->send_mail_queue($user, $data, $subject);
    }

    public function send_mail_regis_shift($user, $week, $gen, $emailcc)
    {
        $data['week'] = $week;
        $data['gen'] = $gen;
        $data['user'] = $user;

        $subject = 'Đăng ký trực tuần ' . $week . ' Khoá ' . $gen->name;
        $data['subject'] = $subject;

        Mail::queue('emails.mail_regis_shift', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);
            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
    }

    public function send_mail_confirm_email($email, $name, $hash, $phone, $token)
    {
        $subject = 'Xác thực email đăng kí';
        $data = [
            'url' => generate_protocol_url(config('app.domain_social') .
                "/confirm-email-success?email=$email&name=$name&phone=$phone&hash=$hash&token=$token")
        ];

        Mail::send('emails.verify_user_email', $data, function ($m) use ($email, $name, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);
            $m->to($email, $name)->subject($subject);
        });
    }

    public function send_mail_password($user, $password)
    {
        $subject = 'KEETOOL - Tài khoản demo';
        $data = [
            'user' => $user,
            'password' => $password
        ];

        Mail::send('emails.user_password', $data, function ($m) use ($user, $subject) {
            $m->from($this->emailCompanyFrom, $this->emailCompanyName);
            $m->to($user->email, $user->name)->subject($subject);
        });
    }
}
