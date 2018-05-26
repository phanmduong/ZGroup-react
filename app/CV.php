<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    protected $table = 'cv';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
