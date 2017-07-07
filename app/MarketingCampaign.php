<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MarketingCampaign extends Model
{
    protected $table = "marketing_campaign";

    public function registers()
    {
        return $this->hasMany('App\Register', "campaign_id");
    }
}
