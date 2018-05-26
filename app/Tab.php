<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tab extends Model
{
    protected $table="tabs";

    public function roles(){
        return $this->belongsToMany('App\Role','tab_role');
    }
}
