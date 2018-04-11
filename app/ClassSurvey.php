<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClassSurvey extends Model
{
    protected $table = 'class_surveys';

    public function studyClass()
    {
        return $this->belongsTo('App\StudyClass', 'class_id');
    }

    public function survey()
    {
        return $this->belongsTo('App\Survey', 'survey_id');
    }
}
