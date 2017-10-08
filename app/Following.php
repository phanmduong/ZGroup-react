<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Following extends Model
{
    //
    protected $table = "followings";
    use SoftDeletes;

    public function user()
    {
        $this->belongsTo(User::class, 'following_id');
    }
}
