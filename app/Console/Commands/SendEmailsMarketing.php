<?php

namespace App\Console\Commands;

use App\Email;
use App\EmailCampaign;
use App\Http\Controllers\SendMailController;
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
        $mail = new SendMailController();
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
                        $url = config("app.protocol") . config("app.domain") . '/manage/email/open?cam_id=' . $email_campaign->id . '&to=' . $subscriber->email;
                        $content = $data . '<img src="' . $url . '" width="1" height="1"/>';
//                        dd($content);
                        $result = $mail->sendAllEmail([$subscriber->email], $email_campaign->subject, $content);
                        $email_id = $result->get('MessageId');
                        $email = Email::find($email_id);
                        if ($email == null) {
                            $email = new Email();
                            $email->id = $email_id;
                            $email->status = 0;
                        }
                        $email->campaign_id = $email_campaign->id;
                        $email->to = $subscriber->email;
                        $email->save();
//                        send_mail_query($user, 'emails.view_email', ['data' => $data], $email_campaign->subject);
                    }
                }
                $email_campaign->sended = 1;
                $email_campaign->save();
            }


        }
    }
}
