<?php

namespace App\Jobs;

use App\ClassLesson;
use App\ClassSurvey;
use App\Jobs\Job;
use App\StudyClass;
use App\Survey;
use App\SurveyUser;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateSurvey extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $class;
    protected  $survey;

    public function __construct(StudyClass $class, Survey $survey)
    {
        $this->class = $class;
        $this->survey = $survey;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $classSurvey = ClassSurvey::where('class_id', $this->class->id)->where('survey_id', $this->survey->id)->first();
        if ($classSurvey == null) {
            $classSurvey = new ClassSurvey;
            $classSurvey->class_id = $this->class->id;
            $classSurvey->survey_id = $this->survey->id;
        }
        $classSurvey->send_status = 1;
        $gen = $this->class->gen;
        foreach ($this->class->registers()->where("status", 1)->get() as $register) {
            $student = $register->user;
            $surveyUser = SurveyUser::where('gen_id', $gen->id)
                ->where('survey_id', $this->survey->id)->where('user_id', $student->id)->first();
            if ($surveyUser == null) {
                $surveyUser = new SurveyUser;
                $surveyUser->survey_id = $this->survey->id;
                $surveyUser->user_id = $student->id;
                $surveyUser->gen_id = $gen->id;
                $surveyUser->save();
            } else {
                if ($surveyUser->status == 2) {
                    $surveyUser->status = 0;
                    $surveyUser->save();
                }
            }
        }
        $classSurvey->save();
    }
}
