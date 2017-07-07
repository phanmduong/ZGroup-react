<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $table = 'votes';

    public function voter()
    {
        return $this->belongsTo('App\User', 'voter_id');
    }

    public function topic()
    {
        return $this->belongsTo('App\Topic', 'topic_id');
    }

}
