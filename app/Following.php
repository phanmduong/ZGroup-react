<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Following extends Model
{
    //
    protected $table = "followings";
    use SoftDeletes;
}
