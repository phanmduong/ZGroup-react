<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscribersList extends Model
{
    use SoftDeletes;
    protected $table = 'subscribers_lists';

    protected $dates = ['deleted_at'];

    public function subscribers()
    {
        return $this->belongsToMany('App\Subscriber', 'subscriber_subscribers_list', 'subscribers_list_id', 'subscriber_id')->withTimestamps();
    }

    public function campaigns()
    {
        return $this->belongsToMany('App\EmailCampaign')->withTimestamps();
    }
}
