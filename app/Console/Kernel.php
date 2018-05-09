<?php

namespace App\Console;

use App\Console\Commands\CancelTransactions;
use App\Console\Commands\CheckInCheckOutSMNotification;
use App\Console\Commands\RemindCalendarEvent;
use App\Console\Commands\SendCheckInCheckOutNotification;
use App\Console\Commands\SendSmsCampaign;
use App\Console\Commands\WorkShiftsCheckInCheckOutNoti;
use App\Console\Commands\SendEmailsResource;
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
                Commands\WorkShifts::class,
                RemindCalendarEvent::class,
                SendCheckInCheckOutNotification::class,
                CheckInCheckOutSMNotification::class,
                WorkShiftsCheckInCheckOutNoti::class,
                SendEmailsResource::class,
                SendSmsCampaign::class,
                CancelTransactions::class,
        ];

        /**
         * Define the application's command schedule.
         *
         * @param  \Illuminate\Console\Scheduling\Schedule $schedule
         * @return void
         */
        protected function schedule(Schedule $schedule)
        {
        // $schedule->command('sms:birthday')->everyMinute();
                $schedule->command('emailsMarketing:send')->everyMinute();
                $schedule->command('smsCampaign:send')->everyMinute();
                $schedule->command('transactions:cancel')->everyMinute();
                $schedule->command('activate:class')->dailyAt('12:00');

                $schedule->command('notification:checkincheckout')->dailyAt('00:10');
                $schedule->command('notification:checkincheckoutsm')->dailyAt('01:10');
                $schedule->command('notification:checkincheckout:workshift')->dailyAt('00:30');

                $schedule->command('sms:send')->dailyAt('20:00');
//        $schedule->command('mail:startlesson')->dailyAt('12:00');
                $schedule->command('survey:send')->dailyAt('01:00');
                $schedule->command('shift:create')->weekly()->fridays()->at('23:00');
                $schedule->command('create:workShifts')->weekly()->fridays()->at('21:00');
                $schedule->command('calendarEvent:remind')->everyMinute();

                $schedule->command('emailsSending:resource')->weekly()->mondays()->at('9:00');
        }
}
