<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyUser extends Model
{
  protected $table = 'survey_users';

  public function user()
  {
    return $this->belongsTo('App\User', 'user_id');
  }

  public function survey()
  {
    return $this->belongsTo('App\Survey', 'survey_id');
  }
  public function gen(){
    return $this->belongsTo('App\Gen','gen_id');
  }
}
