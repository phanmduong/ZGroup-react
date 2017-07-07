<?php

namespace App\Jobs;

use App\ClassSurvey;
use App\Jobs\Job;
use App\StudyClass;
use App\Survey;
use App\SurveyUser;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CloseSurvey extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $class;
    protected  $survey;

    /**
     * Create a new job instance.
     *
     * @return void
     */
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
            // SurveyUser status == 2 thi la deactive
            if ($surveyUser != null) {
                if ($surveyUser->status == 0) {
                    $surveyUser->status = 2;
                    $surveyUser->save();
                }
            }
        }
        $classSurvey->save();
    }
}
