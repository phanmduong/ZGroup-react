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

    public function comment_likes()
    {
        return $this->hasMany(CommentLike::class, 'comment_id');
    }

    public function child_comments()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'created_at' => format_full_time_date($this->created_at),
            'content' => $this->content,
            'commenter' => [
                'avatar_url' => $this->commenter->avatar_url,
                'name' => $this->commenter->name,
                'username' => $this->commenter->username
            ],
        ];
    }

}
