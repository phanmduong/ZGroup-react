<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';

    public function survey()
    {
        return $this->belongsTo('App\Survey', 'survey_id');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer', 'question_id');
    }
}
