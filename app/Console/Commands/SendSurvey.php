<?php

namespace App\Console\Commands;

use App\ClassLesson;
use App\ClassSurvey;
use App\Jobs\CloseSurvey;
use App\Jobs\CreateSurvey;
use App\LessonSurvey;
use App\SurveyUser;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class SendSurvey extends Command
{
    use DispatchesJobs;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'survey:send';

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
        $formatted_date = $date->format('Y-m-d');
        $classLessons = ClassLesson::whereDate('time', '=', $formatted_date)->get();

        foreach ($classLessons as $classLesson) {
            $lesson = $classLesson->lesson;
            $class = $classLesson->studyClass;
            if ($class) {
                $schedule = $class->schedule;
                if ($schedule && $schedule->studySessions) {

                    $session = $class->schedule->studySessions->filter(function ($s) use ($date) {
                        $weekdayNumber = $date->format('N');
                        return $weekdayNumber == weekdayViToNumber($s->weekday);
                    })->last();


                    $surveys = $lesson->surveys;
                    if ($session) {
                        foreach ($surveys as $survey) {
                            if ($survey->active) {
                                $lessonSurvey = LessonSurvey::where('lesson_id', $lesson->id)->where('survey_id', $survey->id)->first();
                                if ($lessonSurvey) {
                                    $start_time_display = $lessonSurvey->start_time_display;
                                    $time_display = $lessonSurvey->time_display;
                                    $start_time = date("H:i", strtotime($session->start_time) + ($start_time_display * 60));

                                    $start_time_delay = strtotime($start_time) - time();

                                    $create_survey_job = (new CreateSurvey($class, $survey))->delay($start_time_delay);
                                    $this->dispatch($create_survey_job);

                                    $end_time_delay = $start_time_delay + $time_display * 60;
                                    $close_survey_job = (new CloseSurvey($class, $survey))->delay($end_time_delay);
                                    $this->dispatch($close_survey_job);
                                }
                            }
                        }
                    }
                }
            }
        }
//        $this->info('The surveys were sent successfully!');


    }
}
