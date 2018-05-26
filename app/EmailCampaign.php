<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailCampaign extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
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

    public function email_form()
    {
        return $this->belongsTo(EmailForm::class, 'form_id');
    }

    public function emails()
    {
        return $this->hasMany('App\Email', 'campaign_id');
    }
}
