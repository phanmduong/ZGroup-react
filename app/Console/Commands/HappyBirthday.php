<?php

namespace App\Console\Commands;

use App\Test;
use Illuminate\Console\Command;

class HappyBirthday extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sms:birthday';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends a Happy birthday message to users via SMS';

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
        $test = new Test();
        $test->content = 'test1';
        $test->save();
    }
}
