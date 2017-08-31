<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Modules\Task\Entities\CardLabel;

class Project extends Model
{
    protected $table = "projects";

    public static $OPEN = "open";
    public static $CLOSE = "close";

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
}
