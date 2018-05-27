<?php

namespace App\Http\Controllers;

use App\Jobs\SendSMS;
use App\Register;
use App\Sms;
use App\SmsList;
use App\SmsTemplate;
use App\StudyClass;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageSmsController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 47;
    }

    public function sms()
    {
        $this->data['user_id'] = $this->user->id;
        return view('manage.sms.sms_list', $this->data);
    }

    public function smsClasses(Request $request)
    {
        $search = $request->search;
        if ($search) {
            $classes = StudyClass::where("name", 'like', '%' . $search . '%')->orderBy('created_at', 'desc')->paginate(20);
        } else {
            $classes = StudyClass::orderBy('created_at', 'desc')->paginate(20);
        }
        return $classes->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
                'num_students' => $c->registers()->where('status', 1)->count()
            ];
        });
    }

    public function createSmsTemplate(Request $request)
    {
        $sms_template = new SmsTemplate();
        $sms_template->name = $request->name;
        $sms_template->content = $request->body;
        $sms_template->user_id = $this->user->id;
        $sms_template->save();
        return [
            'status' => 1,
            'template' => [
                "name" => $sms_template->name,
                "body" => $sms_template->content,
                "id" => $sms_template->id,
                "user_name" => $sms_template->user->name,
                "created_at" => format_time_to_mysql(strtotime($sms_template->created_at)),
            ]
        ];
    }

    public function smsTemplates()
    {
        $templates = SmsTemplate::orderBy('created_at', 'desc')->paginate();

        return $templates->map(function ($t) {
            return [
                "name" => $t->name,
                "body" => $t->content,
                "id" => $t->id,
                "user_name" => $t->user->name,
                "created_at" => format_time_to_mysql(strtotime($t->created_at)),
            ];
        });
    }

    public function smsList()
    {
        $sms = Sms::orderBy('created_at', 'desc')->paginate();

        return $sms->map(function ($s) {
            return [
                "name" => $s->user->name,
                "phone" => $s->user->phone,
                "id" => $s->id,
                "content" => $s->content,
                "created_at" => format_time_to_mysql(strtotime($s->created_at)),
                "status" => $s->status,
                "purpose" => $s->purpose
            ];
        });
    }

    public function sendSms(Request $request)
    {
        $smsList = new SmsList();
        $smsList->name = "list " . format_date_full_option(strtotime('now'));
        $smsList->user_id = $this->user->id;
        $smsList->save();


        $smsId = $request->smsId;
        $smsTemplate = SmsTemplate::find($smsId);
        $classes = $request->classes;

        foreach ($classes as $classId) {
            $smsList->classes()->attach($classId);
        }

        $registers = Register::whereIn('class_id', $classes)->get();
        foreach ($registers as $register) {
            $this->dispatch(new SendSMS($register, $smsTemplate->content));
        }
        return [
            'status' => 1
        ];

    }
}
