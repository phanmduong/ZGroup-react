<?php

namespace App\Jobs;

use App\Email;
use App\EmailCampaign;
use App\Http\Controllers\SendMailController;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $email_campaign;
    protected $data;
    protected $subscribers;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(EmailCampaign $email_campaign, $subscribers, $data)
    {
        $this->email_campaign = $email_campaign;
        $this->subscribers = $subscribers;
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
        foreach ($this->subscribers as $subscriber) {
            if (filter_var($subscriber->email, FILTER_VALIDATE_EMAIL)) {
                $url = config('app.protocol') . config('app.domain') . '/manage/email/open?cam_id=' . $this->email_campaign->id . '&to=' . $subscriber->email;
                $content = $this->data . '<img src="' . $url . '" width="1" height="1"/>';

                $content = str_replace('[[USER_NAME]]', $subscriber->name, $content);

                $result = $mail->sendAllEmail([$subscriber->email], $this->email_campaign->subject, $content);

                $email_id = $result->get('MessageId');

                $email = Email::find($email_id);
                if ($email == null) {
                    $email = new Email();
                    $email->id = $email_id;
                    $email->status = 0;
                    $email->campaign_id = $this->email_campaign->id;
                    $email->to = $subscriber->email;
                    $email->save();
                }
            }
        }
    }
}
