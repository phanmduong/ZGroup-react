<?php

namespace App\Console;

use App\Console\Commands\RemindCalendarEvent;
use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\HappyBirthday::class,
        Commands\Activate::class,
        Commands\StartLesson::class,
        Commands\SendSurvey::class,
        Commands\CreateShifts::class,
        Commands\SendEmailsMarketing::class,
        Commands\SendRemindSms::class,
        RemindCalendarEvent::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
//        $schedule->command('sms:birthday')->everyMinute();
        $schedule->command('emailsMarketing:send')->everyMinute();
        $schedule->command('activate:class')->dailyAt('12:00');
        $schedule->command('sms:send')->dailyAt('20:00');
//        $schedule->command('mail:startlesson')->dailyAt('12:00');
        $schedule->command('survey:send')->dailyAt('01:00');
//        $schedule->command('shift:create')->weekly()->fridays()->at('23:00');
        $schedule->command('shift:create')->weekly()->saturdays()->at('10:53');
        $schedule->command('calendarEvent:remind')->everyMinute();

    }
}
