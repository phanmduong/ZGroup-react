<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoodOrder extends Model
{
    //
    protected $table = 'good_order';

    public function good(){
        return $this->belongsTo(Good::class, 'good_id');
    }
}
