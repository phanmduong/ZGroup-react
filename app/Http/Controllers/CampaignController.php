<?php

namespace App\Http\Controllers;

use App\EmailCampaign;
use App\EmailTemplate;
use App\Jobs\SendMarketingEmail;
use App\SubscribersList;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class CampaignController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 29;
    }

    public function index()
    {
        $campaigns = EmailCampaign::orderBy('created_at', 'desc')->paginate(15);

        foreach ($campaigns as &$cam) {
            $open = $cam->emails()->where('status', 3)->count();
            $sended = $cam->emails()->count();
            $complaint = $cam->emails()->where('status', 4)->count();
            $delivery = $cam->emails()->where('status', 1)->count() + $open + $complaint;

            $cam->delivery = $delivery;
            $cam->open = $open;
            $cam->mail_sended = $sended;
//            dd($cam->subscribers_lists);
            if ($cam->subscribers_lists->count() != 0) {

                $list_ids = $cam->subscribers_lists()->select('id')->get()->pluck('id')->toArray();
                $str = implode(',', $list_ids);
                $query = "select distinct count(email) as nums from subscribers where id in " .
                    "(select subscriber_id from subscriber_subscribers_list where subscribers_list_id in ($str)) ";
                $cam->total = DB::select($query)[0]->nums;

                if ($cam->total == 0) {
                    $cam->mail_sended_total = 0;
                } else {
                    $cam->mail_sended_total = round($sended / $cam->total, 4);
                }
            }


            if ($sended == 0) {
                $cam->delivery_sended = 0;
            } else {
                $cam->delivery_sended = round($delivery / $sended, 4);
            }
            if ($delivery == 0) {
                $cam->open_delivery = 0;
            } else {
                $cam->open_delivery = round($open / $delivery, 4);
            }

        }

        $lastPage = $campaigns->lastPage();
        $currentPage = $campaigns->currentPage();

        $this->data['lastPage'] = $lastPage;
        $this->data['currentPage'] = $currentPage;
        $this->data['campaigns'] = $campaigns;
        return view('manage.email.campaigns', $this->data);
    }

    public function new_campaign()
    {
        $this->data['lists'] = SubscribersList::orderBy('updated_at', 'desc')->get();
        $lists = SubscribersList::select('id', 'name')->get();
        $tags = array();
        foreach ($lists as $list) {
            $tags[] = $list->name . '-id=' . $list->id;
        }
        $this->data['tags'] = json_encode($tags);
        return view('manage.email.new_campaign', $this->data);

    }

    public function select_template(Request $request)
    {
        $cam_id = $request->cam_id;
        $template_id = $request->id;
        $cam = EmailCampaign::find($cam_id);
        $cam->template_id = $template_id;
        $cam->save();
        return redirect('manage/campaign?id=' . $cam_id);
    }


    public function campaign(Request $request)
    {
        $cam = EmailCampaign::find($request->id);
        $current_list_id = $cam->subscribers_lists->pluck('id')->toArray();
        $lists = SubscribersList::select('id', 'name')->whereNotIn('id', $current_list_id)->get();
        $tags = array();
        foreach ($lists as $list) {
            $tags[] = $list->name . '-id=' . $list->id;
        }
        $this->data['tags'] = json_encode($tags);

        if ($cam->subscribers_lists->count() != 0) {
            $lists = $cam->subscribers_lists;

            $list_ids = $cam->subscribers_lists()->select('id')->get()->pluck('id')->toArray();
            $str = implode(',', $list_ids);

            $query = "select distinct count(email) as nums from subscribers where id in " .
                "(select subscriber_id from subscriber_subscribers_list where subscribers_list_id in ($str)) ";
            $total = DB::select($query)[0]->nums;
            $this->data['lists'] = $lists;
        } else {
            $total = 0;
        }
        $can_send = $cam->template != null && $lists->count() != 0;

        $open = $cam->emails()->where('status', 3)->count();
        $bounce = $cam->emails()->where('status', 2)->count();
        $complaint = $cam->emails()->where('status', 4)->count();
        $delivery = $cam->emails()->where('status', 1)->count() + $open + $complaint;

        $templates = EmailTemplate::all();

        $this->data['open'] = $open;
        $this->data['delivery'] = $delivery;
        $this->data['bounce'] = $bounce;
        $this->data['complaint'] = $complaint;
        $this->data['total'] = $total;
//        $this->data['lists'] = $lists;
        $this->data['can_send'] = $can_send;

        $this->data['cam'] = $cam;
        $this->data['templates'] = $templates;
        return view('manage.email.campaign', $this->data);
    }

    public function view_template(Request $request)
    {
        $tem = EmailTemplate::find($request->id);
        return $tem->content;
    }

    public function store_email_template(Request $request)
    {
        $file = $request->file('email_template');
        $content = File::get($file);
        $tem = new EmailTemplate();
        $tem->name = $file->getClientOriginalName();
        $tem->owner_id = $this->user->id;
        $tem->content = $content;
        $tem->save();

        $cam = EmailCampaign::find($request->id);
        $cam->template_id = $tem->id;
        $cam->save();
        return redirect('manage/campaign?id=' . $request->id);
    }

    public function edit_campaign(Request $request)
    {
        $cam = EmailCampaign::find($request->id);
        $cam->lists = '';
        $this->data['lists'] = SubscribersList::orderBy('updated_at', 'desc')->get();
        $this->data['cam'] = $cam;

        $lists = SubscribersList::select('id', 'name')->get();
        $tags = array();
        foreach ($cam->subscribers_lists as $l) {
            $t = $l->name . '-id=' . $l->id;
            if ($cam->lists == '') {
                $cam->lists .= $t;
            } else {
                $cam->lists .= ',' . $t;
            }
        }
        foreach ($lists as $list) {
            $tags[] = $list->name . '-id=' . $list->id;
        }
        $this->data['tags'] = json_encode($tags);

        return view('manage.email.edit_campaign', $this->data);
    }

    public function store_campaign(Request $request)
    {
        if ($request->edit == 1) {
            $cam = EmailCampaign::find($request->cam_id);
            $url = 'manage/campaign?id=' . $cam->id;
        } else {
            $cam = new EmailCampaign();
            $url = 'manage/campaigns';
        }

        $lists = explode(',', $request->list_id);
        $list_ids = array();

        $cam->name = $request->name;
        $cam->subject = $request->subject;
        $cam->sended = 0;
        $cam->owner_id = $this->user->id;
        $cam->save();

        $current_list_ids = $cam->subscribers_lists()->select('id')->get()->pluck('id')->toArray();
        foreach ($lists as $l) {
            $t = explode('=', $l);
            $list_ids[] = $t[1];
            if (!in_array($t[1], $current_list_ids)) {
                $cam->subscribers_lists()->attach($t[1]);
            }
        }
        foreach ($current_list_ids as $i) {
            if (!in_array($i, $list_ids)) {
                $cam->subscribers_lists()->detach($i);
            }
        }

        return redirect($url);
    }

    public function send_more_list(Request $request)
    {
        $cam = EmailCampaign::find($request->cam_id);
        $lists = explode(',', $request->list_id);
        $lists_array = array();
        $list_ids = array();
        foreach ($lists as $l) {
            $t = explode('=', $l);
            $lists_array[] = SubscribersList::find($t[1]);
            $list_ids[] = $t[1];
            $cam->subscribers_lists()->attach($t[1]);
        }
        $take = 5;
        $delay = 40;
        $total_mails = 0;
        foreach ($lists_array as $l) {
            $total_mails += $l->subscribers()->count();
        }
        $nums_jobs = $total_mails / $take;
        for ($i = 0; $i < $nums_jobs; $i++) {
            $job = (new SendMarketingEmail($cam, $list_ids, $i * $take, $take))->delay($i * $delay);
            $this->dispatch($job);
        }
        $cam->send_time = $cam->send_time + $nums_jobs * $delay;
        $cam->save();
        return redirect('manage/campaign?id=' . $cam->id);
    }

    public function queue_mail(Request $request)
    {
        $cam = EmailCampaign::find($request->id);
//        $subscribers = $cam->subscrneibers_list->subscribers;
//        foreach ($subscribers as $subscriber) {
//            Mail::queue('emails.template', ['content' => $cam->template->content], function ($message) use ($cam, $subscriber) {
//                $message->from('colorme.idea@gmail.com', 'Color Me')->to($subscriber->email)->subject($cam->subject)->bcc('colorme.idea@gmail.com');
//            });
//
//        }

//        dd($cam->sub_emails);
        $take = 5;
        $delay = 40;
        $total_mails = 0;
        foreach ($cam->subscribers_lists as $l) {
            $total_mails += $l->subscribers()->count();
        }
        $list_ids = $cam->subscribers_lists()->select('id')->get()->pluck('id')->toArray();
        $nums_jobs = $total_mails / $take;
        for ($i = 0; $i < $nums_jobs; $i++) {
            $job = (new SendMarketingEmail($cam, $list_ids, $i * $take, $take))->delay($i * $delay);
            $this->dispatch($job);
        }
        $cam->sended = 1;
        $cam->send_time = $nums_jobs * $delay;
        $cam->save();
        return redirect('manage/campaign?id=' . $cam->id);


    }
}
