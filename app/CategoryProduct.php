<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryProduct extends Model
{
    protected $table = 'category_products';

    public function products()
    {
        return $this->hasMany('App\Product', 'category_id');
    }

    public function mulCatProducts()
    {
        //multi category product
        return $this->belongsToMany(Product::class, 'product_category_product', 'category_product_id', 'product_id');
    }
}
