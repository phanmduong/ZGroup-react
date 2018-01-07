<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'surveys';

    public function questions()
    {
        return $this->hasMany('App\Question', 'survey_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function survey_users()
    {
        return $this->hasMany('App\SurveyUser', 'survey_id');
    }

    public function lessons()
    {
        return $this->belongsToMany('App\Lesson', 'lesson_survey')
            ->withPivot('start_time_display', 'time_display')
            ->withTimestamps();
    }

    public function getData() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'user' => $this->user ? $this->user->getData() : null,
        ];
    }

    public function getDetailedData() {
        $data = $this->getData();
        $data['questions'] = $this->questions->map(function ($question){
            return $question->getData();
        });
        return $data;
    }
}
