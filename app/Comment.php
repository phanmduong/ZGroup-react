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

    public function transform($user = null)
    {
        return [
            'id' => $this->id,
            'created_at' => format_full_time_date($this->created_at),
            'content' => $this->content,
            'image_url' => $this->image_url,
            'commenter' => [
                'avatar_url' => generate_protocol_url($this->commenter->avatar_url),
                'name' => $this->commenter->name,
                'username' => $this->commenter->username
            ],
            'count_like' => $this->likes,
            'is_liked' => $user && $this->comment_likes()->where('user_id', $user->id)->first() ? true : false
        ];
    }

}
