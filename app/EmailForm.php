<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailForm extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [];

    public function creator(){
        return $this->belongsTo(User::class, 'creator');
    }

    public function template(){
        return $this->belongsTo(EmailTemplate::class, 'template_id');
    }
}
