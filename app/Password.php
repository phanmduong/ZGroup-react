<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    //
    protected $table = 'passwords';
    protected $fillable = ['code','name','password'];
}
