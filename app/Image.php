<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function owner()
    {
        return $this->belongsTo('App\User','owner_id');
    }
}
