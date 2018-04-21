<?php

namespace App\Console\Commands;

use App\EmailCampaign;
use App\Jobs\SendEmail;
use App\Notification;
use App\Repositories\NotificationRepository;
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
    protected $notificationRepository;

    /**
     * Create a new command instance.
     *
     * @param NotificationRepository $notificationRepository
     */
    public function __construct(NotificationRepository $notificationRepository)
    {
        parent::__construct();
        $this->notificationRepository = $notificationRepository;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $email_campaigns = EmailCampaign::where('sended', '=', 0)->whereRaw('"' . rebuild_date('Y-m-d H:i', time()) . '" = DATE_FORMAT(timer, "%Y-%m-%d %H:%i")')->get();
        if ($email_campaigns->count() > 0) {
            foreach ($email_campaigns as $email_campaign) {
                $email_campaign->sended = 2;
                $email_campaign->save();

                $email_form = $email_campaign->email_form()->first();
                $email_form->template = $email_form->template()->first();
                $data = convert_email_form($email_form);

                $list_ids = $email_campaign->subscribers_lists()->get()->pluck('id')->toArray();
                $str = implode(',', $list_ids);
                $query = 'select distinct email, name from subscribers where id in ' .
                    "(select subscriber_id from subscriber_subscribers_list where subscribers_list_id in ($str)) ";

                $subscribers = DB::select($query);

                $subscribers_chunk = array_chunk($subscribers, 50);

                foreach ($subscribers_chunk as $subscribers_array) {
                    $job = new SendEmail($email_campaign, $subscribers_array, $data);
                    dispatch($job);
                };

                $notification = new Notification;
                $notification->actor_id = $email_campaign->owner_id;
                $notification->receiver_id = $email_campaign->owner_id;
                $notification->type = 21;
                $message = $notification->notificationType->template;

                $message = str_replace('[[NAME_CAMPAIGN]]', '<strong>' . $email_campaign->name . '</strong>', $message);
                $notification->message = $message;

                $notification->color = $notification->notificationType->color;
                $notification->icon = $notification->notificationType->icon;
                $notification->url = '/manage/campaigns';

                $notification->save();

                $this->notificationRepository->sendNotification($notification);

                $email_campaign->sended = 1;
                $email_campaign->save();
            }
        }
    }
}
