<?php

namespace App\Console\Commands;

use App\EmailCampaign;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SendEmailsMarketing extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'emailsMarketing:send';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $email_campaigns = EmailCampaign::where('sended', '<>', 1)->whereRaw("\"" . rebuild_date("Y-m-d H:i", time()) . "\" = DATE_FORMAT(timer, \"%Y-%m-%d %H:%i\")")->get();
        if ($email_campaigns->count() > 0) {
            foreach ($email_campaigns as $email_campaign) {
                $email_campaign->sended = 2;
                $email_campaign->save();

                $email_form = $email_campaign->email_form()->first();
                $email_form->template = $email_form->template()->first();
                $data = convert_email_form($email_form);

                $list_ids = $email_campaign->subscribers_lists()->get()->pluck('id')->toArray();
                $str = implode(',', $list_ids);
                $query = "select distinct email,name from subscribers where id in " .
                    "(select subscriber_id from subscriber_subscribers_list where subscribers_list_id in ($str)) ";

                $subscribers = DB::select($query);


                foreach ($subscribers as $subscriber) {
                    if (filter_var($subscriber->email, FILTER_VALIDATE_EMAIL)) {
                        $user = [
                            'name' => $subscriber->name ? $subscriber->name : "",
                            'email' => $subscriber->email,
                        ];

                        send_mail_query($user, 'emails.view_email', ['data' => $data], $email_campaign->subject);
                    }
                }
                $email_campaign->sended = 1;
                $email_campaign->save();
            }


        }
    }
}
