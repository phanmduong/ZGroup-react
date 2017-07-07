<?php

namespace App\Console\Commands;

use App\StudyClass;
use Illuminate\Console\Command;

class Activate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'activate:class';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Activate the class ';

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
        $date->modify('+2 days');
        $formatted_date = $date->format('Y-m-d');
        $classes = StudyClass::whereDate('datestart', '=', $formatted_date)
            ->where('name', 'like', '%.%')->get();
        foreach ($classes as $class) {
            foreach ($class->registers as $regis) {
                send_mail_activate_class($regis, ['colorme.vn.test@gmail.com']);
            }
            $class->activated = 1;
            $class->save();
        }
        $this->info("check active class");

    }
}
