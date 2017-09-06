<?php

namespace App\Jobs;

use App\Email;
use App\EmailCampaign;
use App\Http\Controllers\SendMailController;
use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;

class SendMarketingEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $campaign;
    protected $skip;
    protected $take;
    protected $list_ids;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(EmailCampaign $cam, $list_ids, $skip, $take)
    {
        $this->campaign = $cam;
        $this->skip = $skip;
        $this->take = $take;
        $this->list_ids = $list_ids;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mail = new SendMailController();
        $cam = $this->campaign;
//        $list_ids = $cam->subscribers_lists()->select('id')->get()->pluck('id')->toArray();
        $str = implode(',', $this->list_ids);
        $query = "select distinct email from subscribers where id in " .
            "(select subscriber_id from subscriber_subscribers_list where subscribers_list_id in ($str)) limit " . $this->take . " offset " . $this->skip;
        $subscribers = DB::select($query);
//        $subscribers = $l->subscribers()->take($this->take)->skip($this->skip)->get();
        foreach ($subscribers as $subscriber) {
            if (filter_var($subscriber->email, FILTER_VALIDATE_EMAIL)) {
                $url = config("app.protocol") . config("app.domain") . '/manage/email/open?cam_id=' . $cam->id . '&to=' . $subscriber->email;
                $content = $cam->template->content . '<img src="' . $url . '" width="1" height="1"/>';
                $result = $mail->sendAllEmail([$subscriber->email], $cam->subject, $content);
                $email_id = $result->get('MessageId');
                $email = Email::find($email_id);
                if ($email == null) {
                    $email = new Email();
                    $email->id = $email_id;
                    $email->status = 0;
                }
                $email->campaign_id = $cam->id;
                $email->to = $subscriber->email;
                $email->save();
            }
        }

    }
}
