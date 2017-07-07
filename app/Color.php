<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = 'colors';

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }
}
