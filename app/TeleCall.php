<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeleCall extends Model
{
    protected $table = 'tele_calls';

    public function caller(){
        return $this->belongsTo('App\User','caller_id');
    }
    public function gen(){
        return $this->belongsTo('App\Gen','gen_id');
    }
    public function scopeGetCallHistory($scope,$caller_id)
    {
        $telecalls = TeleCall::where('caller_id', $caller_id)->select('')->get();
    }
    public function student(){
        return $this->belongsTo('App\User','student_id');
    }
}
