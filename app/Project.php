<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\Task\Entities\CardLabel;

class Project extends Model
{
    protected $table = "projects";

    public static $OPEN = "open";
    public static $CLOSE = "close";
    public static $ADMIN_ROLE = 1;
    public static $MEMBER_ROLE = 0;

    public function boards()
    {
        return $this->hasMany(Board::class, 'project_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function labels()
    {
        return $this->hasMany(CardLabel::class, "project_id");
    }

    public function members()
    {
        return $this
            ->belongsToMany(User::class,
                'project_user',
                'project_id', 'user_id')
            ->withPivot('role', "adder_id")
            ->withTimestamps();
    }

    public function transform()
    {
        $boardIds = $this->boards()->pluck("id");
        $board_count = $boardIds->count();

        $data = [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            "canDragBoard" => $this->can_drag_board,
            "canDragCard" => $this->can_drag_card,
            "canEditTask" => $this->can_edit_task,
            "color" => $this->color,
            "boards" => $this->boards()->where("status", "open")->orderBy("order")->get()->map(function ($board) {
                return $board->transform();
            }),
            'board_count' => $board_count,
            'card_count' => Card::whereIn("board_id", $boardIds)->count(),
            'members' => $this->members->map(function ($member) {
                return [
                    "id" => $member->id,
                    "name" => $member->name,
                    "email" => $member->email,
                    "is_admin" => $member->pivot->role === 1,
                    "added" => true,
                    "avatar_url" => generate_protocol_url($member->avatar_url)
                ];
            }),
            'created_at' => format_time_main($this->created_at),
            'updated_at' => format_time_main($this->updated_at)
        ];

        if ($this->editor) {
            $data['editor'] = [
                "id" => $this->editor->id,
                "name" => $this->editor->name
            ];
        }
        if ($this->creator) {
            $data['creator'] = [
                "id" => $this->creator->id,
                "name" => $this->creator->name
            ];
        }

        $startBoard = $this->boards()->where("is_start", 1)->first();
        if ($startBoard) {
            $data['start_board'] = $startBoard->transform();
        }

        return $data;
    }
}
