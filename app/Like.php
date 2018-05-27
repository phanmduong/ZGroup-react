<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }

    public function liker()
    {
        return $this->belongsTo('App\User', 'liker_id');
    }
}
