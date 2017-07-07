<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubscribersList extends Model
{
    protected $table = 'subscribers_lists';

    public function subscribers()
    {
        return $this->belongsToMany('App\Subscriber')->withTimestamps();
    }

    public function campaigns()
    {
        return $this->belongsToMany('App\EmailCampaign')->withTimestamps();
    }
}
