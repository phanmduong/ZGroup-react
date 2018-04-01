<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserCarer extends Model
{
    use SoftDeletes;

    protected $table = "user_carer";

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function carer()
    {
        return $this->belongsTo(User::class, 'carer_id');
    }

    public function assigner()
    {
        return $this->belongsTo(User::class, 'assigner_id');
    }
}
