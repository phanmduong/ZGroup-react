<?php

namespace App\Console\Commands;

use App\CalendarEvent;
use App\Notification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class RemindCalendarEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'calendarEvent:remind';

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
        $date = new \DateTime();
        $date->modify('+1 hours');
        $formatted_time = $date->format('Y-m-d H:i:') . "00";
        $calendarEvents = CalendarEvent::where("start", "=", $formatted_time)->get();
        foreach ($calendarEvents as $calendarEvent) {
            $notification = new Notification;
            $notification->actor_id = 0;
            $notification->receiver_id = $calendarEvent->user_id;
            $notification->type = 10;
            $message = $notification->notificationType->template;

            $message = str_replace('[[EVENT]]', "<strong>" . $calendarEvent->title . "</strong>", $message);
            $notification->message = $message;

            $notification->color = $notification->notificationType->color;
            $notification->icon = $notification->notificationType->icon;
            $notification->url = '/calendar';

            $notification->save();
            $data = array(
                "message" => $message,
                "link" => $notification->url,
                'created_at' => format_time_to_mysql(strtotime($notification->created_at)),
                "receiver_id" => $notification->receiver_id,
                "actor_id" => $notification->actor_id,
                "icon" => $notification->icon,
                "color" => $notification->color
            );

            $publish_data = array(
                "event" => "notification",
                "data" => $data
            );

            Redis::publish(config("app.channel"), json_encode($publish_data));
        }
    }
}
