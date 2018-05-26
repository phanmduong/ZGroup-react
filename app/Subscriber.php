<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $table = "subscribers";

    public function subscribers_lists()
    {
        return $this->belongsToMany('App\SubscribersList')->withTimestamps();
    }
}
