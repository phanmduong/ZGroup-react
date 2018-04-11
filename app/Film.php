<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    //
    protected $table = "films";

    public function film_sessions()
    {
        return $this->hasMany('App\FilmSession','film_id');
    }


}
