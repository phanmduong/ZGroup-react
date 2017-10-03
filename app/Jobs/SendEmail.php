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

class SendEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $email_campaign;
    protected $data;
    protected $subscriber;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(EmailCampaign $email_campaign, $subscriber, $data)
    {
        $this->email_campaign = $email_campaign;
        $this->subscriber = $subscriber;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mail = new SendMailController();
        $url = config("app.protocol") . config("app.domain") . '/manage/email/open?cam_id=' . $this->email_campaign->id . '&to=' . $this->subscriber->email;
        $content = $this->data . '<img src="' . $url . '" width="1" height="1"/>';
        $result = $mail->sendAllEmail([$this->subscriber->email], $this->email_campaign->subject, $content);
        $email_id = $result->get('MessageId');

        $email = Email::find($email_id);
        if ($email == null) {
            $email = new Email();
            $email->id = $email_id;
            $email->status = 0;
        }
        $email->campaign_id = $this->email_campaign->id;
        $email->to = $this->subscriber->email;
        $email->save();
    }
}
