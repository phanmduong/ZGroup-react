<?php

namespace App;

use Doctrine\DBAL\Query\QueryBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes;
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
    protected $dates = ['deleted_at'];

    public function permissions()
    {
        return $this->belongsToMany('App\Permission');
    }

    public function tabs()
    {
        return $this->belongsToMany('App\Tab', 'tab_role');
    }

    public function getData() {
        return [
            'id' => $this->id,
            'role_title' => $this->role_title
        ];
    }
}
