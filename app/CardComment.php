<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CardComment extends Model
{
    protected $table = "card_comments";

    public function commenter()
    {
        return $this->belongsTo(User::class, "commenter_id");
    }

    public function card()
    {
        return $this->belongsTo(Card::class, "card_id");
    }

    public function cardCommentAttachments()
    {
        return $this->hasMany(CardComment::class, "card_comment_id");
    }

    public function transform()
    {
        $commenter = $this->commenter;
        return [
            "id" => $this->id,
            "commenter" => [
                "id" => $commenter->id,
                "name" => $commenter->name,
                "avatar_url" => generate_protocol_url($commenter->avatar_url)
            ],
            "content" => $this->content,
            "card_id" => $this->card_id,
            "created_at" => time_elapsed_string(strtotime($this->created_at))
        ];
    }
}
