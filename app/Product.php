<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{

    use SoftDeletes;

    protected $table = 'products';

    protected $dates = ['deleted_at'];

    public function author()
    {
        return $this->belongsTo('App\User', 'author_id');
    }

    public function feature()
    {
        return $this->belongsTo('App\User', 'feature_id');
    }

    public function likes()
    {
        return $this->hasMany('App\Like', 'product_id');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment', 'product_id');
    }

    public function notifications()
    {
        return $this->hasMany('App\Notification', 'product_id');
    }

    // public function views()
    // {
    //     return $this->hasMany('App\View', 'product_id');
    // }

    public function category()
    {
        return $this->belongsTo('App\CategoryProduct', 'category_id');
    }

    public function images()
    {
        return $this->hasMany('App\Image', 'product_id');
    }

    public function colors()
    {
        return $this->hasMany('App\Color', 'product_id');
    }

    public function topicAttendance()
    {
        return $this->hasOne(TopicAttendance::class, 'product_id', 'id');
    }
}
