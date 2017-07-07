<?php

namespace App\Console\Commands;

use App\ClassLesson;
use Illuminate\Console\Command;

class StartLesson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:startlesson';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send the email before lesson start 1 day';

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
        $classLessons = ClassLesson::whereDate('time', '=', $formatted_date)->get();

        foreach ($classLessons as $classLesson) {
            $class = $classLesson->studyClass;
            $registers = $class->registers()->where('status', '=', 1)->get();
            $lesson = $classLesson->lesson;

            foreach ($registers as $register) {
                $user = $register->user;
                send_mail_lesson($user, $lesson, $class, $formatted_date, ['colorme.vn.test@gmail.com']);
            }
        }
    }
}
