<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Work extends Model
{
    //
    use SoftDeletes;
    protected $table = 'works';
    public function staffs(){
        return $this->belongsToMany(User::class,'work_staff','work_id','staff_id');
    }
}
