<?php

namespace App\Console\Commands;

use App\EmailCampaign;
use Illuminate\Console\Command;

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
        $email_campaigns = EmailCampaign::whereRaw("DATE_FORMAT(NOW(), \"%Y-%m-%d %H:%i\") = DATE_FORMAT(timer, \"%Y-%m-%d %H:%i\")")->get();
        if ($email_campaigns) {
            $user = [
                'email' => "duong@colorme.vn",
                'name' => "Tester"
            ];

            send_mail_query($user, 'emails.view_email', ['data' => "ok"], "hen giowf guiwr mail");
        }
    }
}
