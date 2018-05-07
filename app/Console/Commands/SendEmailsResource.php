<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\ProductSubscription;
use App\User;
use App\Product;
use App\Services\EmailService;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SendEmailsResource extends Command
{
    use DispatchesJobs;

    protected $signature = 'emailsSending:resource';

    protected $description = 'Command description';

    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    public function handle()
    {
        $date = new \DateTime();
        $formatted_time = $date->format('Y-m-d');

        $userIds = ProductSubscription::select(DB::raw('distinct user_id'), 'created_at')->get();
        foreach ($userIds as $userId) {
            $user = User::find($userId->user_id);
            $day = ceil(abs(strtotime($userId->created_at) - strtotime(Carbon::now()->toDateTimeString())) / (60 * 60 * 24));
            $week_count = (int)ceil($day / 7);

            $resourceIds = Product::where('kind', 'resource')->where('status', 1)->pluck('id')->toArray();
            $resourceCount = count($resourceIds);
            $resource = Product::find($resourceIds[$week_count % $resourceCount]);
            if ($user && $resource)
                $this->emailService->send_mail_resource($resource, $user);
        }   
    }
}
