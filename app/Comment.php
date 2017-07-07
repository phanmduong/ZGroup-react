<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    public function commenter()
    {
        return $this->belongsTo('App\User', 'commenter_id');
    }

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }
}
