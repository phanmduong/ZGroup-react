<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Landing extends Model
{
    protected $table = 'landing';

    public $timestamps = false;

    public function course()
    {
        return $this->hasOne('\App\Course', 'id', 'course_id');
    }
}
