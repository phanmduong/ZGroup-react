<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseKey extends Model
{
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function registers()
    {
        return $this->hasMany(Register::class, 'course_key_id')->whereNotNull('course_id');
    }

    public function emailCampaign()
    {
        return $this->belongsTo(EmailCampaign::class, 'email_campaign_id');
    }
}
