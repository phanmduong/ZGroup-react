<?php

namespace App\Console\Commands;

use App\Base;
use App\Gen;
use App\Jobs\CreateShiftJob;
use App\Role;
use App\Shift;
use App\ShiftSession;
use App\Tab;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class CreateShifts extends Command
{

    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'shift:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create shifts';

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
        $this->dispatch(new CreateShiftJob());
        $this->info('done');
    }
}
