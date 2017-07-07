<?php

namespace App;

use Doctrine\DBAL\Query\QueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';

    /**
     * Many to many relationship
     */
    public function users()
    {
        return $this->hasMany('App\User', 'role_id');
    }

    /**
     * Many to many relationship
     * @return QueryBuilder
     */

    public function permissions()
    {
        return $this->belongsToMany('App\Permission');
    }

    public function tabs()
    {
        return $this->belongsToMany('App\Tab', 'tab_role');
    }
}
