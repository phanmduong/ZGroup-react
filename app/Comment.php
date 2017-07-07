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

    public function comment_likes() {
        return $this->hasMany(CommentLike::class , 'comment_id');
    }


}
