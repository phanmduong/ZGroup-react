<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\EmailMaketing\Entities\EmailForms;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailTemplate extends Model
{
    use SoftDeletes;
    protected $table = 'email_templates';
    protected $dates = ['deleted_at'];

    public function owner()
    {
        return $this->belongsTo('App\User', 'owner_id');
    }

    public function email_forms(){
        return $this->hasMany(EmailForms::class, 'template_id');
    }
}
