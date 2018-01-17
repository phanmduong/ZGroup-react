<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table='answers';

    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }

    public function getData() {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'correct' => $this->correct,
            "question_id" => $this->question_id
        ];
    }
}
