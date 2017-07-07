<?php

namespace App\Console\Commands;

use App\StudyClass;
use Illuminate\Console\Command;

class SendRemindSms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:send';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send remind sms';

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
        $date = new \DateTime();
        $date->modify('+1 days');
        $formatted_date = $date->format('Y-m-d');
        $classes = StudyClass::whereDate('datestart', '=', $formatted_date)
            ->where('name', 'like', '%.%')->get();
        foreach ($classes as $class) {
            foreach ($class->registers as $regis) {
                send_sms_remind($regis);
            }
        }
        $this->info("send remind sms");
    }
}
