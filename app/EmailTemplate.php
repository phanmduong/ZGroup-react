<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    protected $table = 'email_templates';

    public function owner()
    {
        return $this->belongsTo('App\User', 'owner_id');
    }
}
