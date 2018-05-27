<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'emails';

    public function campaign()
    {
        return $this->belongsTo('App\EmailCampaign', 'campaign_id');
    }
}
