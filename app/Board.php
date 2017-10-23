<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Board extends Model
{
    protected $table = "boards";

    use SoftDeletes;

    public function cards()
    {
        return $this->hasMany(Card::class, 'board_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "is_start" => $this->is_start,
            "order" => $this->order
        ];
    }

    public function transformBoardWithCard()
    {
        $cards = $this->cards()->where("status", "open")->orderBy('order')->get();
        return [
            "id" => $this->id,
            "title" => $this->title,
            "is_start" => $this->is_start,
            "order" => $this->order,
            "cards" => $cards->map(function ($card) {
                return $card->transform();
            })
        ];
    }
}
