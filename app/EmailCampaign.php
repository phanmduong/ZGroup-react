<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmailCampaign extends Model
{
    protected $table = 'email_campaigns';

    public function owner()
    {
        return $this->belongsTo('App\User', 'owner_id');
    }

    public function subscribers_lists()
    {
        return $this->belongsToMany('App\SubscribersList')->withTimestamps();
    }

    public function template()
    {
        return $this->belongsTo('App\EmailTemplate', 'template_id');
    }

    public function emails()
    {
        return $this->hasMany('App\Email', 'campaign_id');
    }
}
