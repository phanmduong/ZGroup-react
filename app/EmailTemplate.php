<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\EmailMaketing\Entities\EmailForms;

class EmailTemplate extends Model
{
    protected $table = 'email_templates';

    public function owner()
    {
        return $this->belongsTo('App\User', 'owner_id');
    }

    public function email_forms(){
        return $this->hasMany(EmailForms::class, 'template_id');
    }
}
