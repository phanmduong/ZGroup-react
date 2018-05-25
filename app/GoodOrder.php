<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodOrder extends Model
{
    use SoftDeletes;

    protected $table = 'good_order';

    protected $dates = ['deleted_at'];

    public function good(){
        return $this->belongsTo(Good::class, 'good_id');
    }
}
