<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table='permissions';

    /**
     * Many to many relationship
     * @return QueryBuilder
     */
    public function roles(){
        return $this->belongsToMany('App\Role');
    }
}
