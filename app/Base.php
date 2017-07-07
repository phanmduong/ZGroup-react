<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Base extends Model
{
    protected $table = 'bases';

    public function rooms()
    {
        return $this->hasMany('App\Room', 'base_id');
    }

    public function classes()
    {
        return $this->hasMany('App\StudyClass', 'base_id');
    }
}
