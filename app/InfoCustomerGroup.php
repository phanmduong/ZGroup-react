<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InfoCustomerGroup extends Model
{
    //
    use SoftDeletes;
    protected $table = 'info_customer_groups';

    public function customer(){
        return $this->belongsToMany('App\CustomerGroup','users','customer_group_id');
    }
}
