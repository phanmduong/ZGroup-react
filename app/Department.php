<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    //
    use SoftDeletes;
    protected $table = 'departments';
    public function  employees(){
        return $this->hasMany("App\User",'department_id');
    }
}
