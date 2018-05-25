<?php

namespace Modules\Task\Entities;

use App\Card;
use App\Project;
use App\User;
use Illuminate\Database\Eloquent\Model;

class ProjectLog extends Model
{
    protected $table = "project_logs";

    public function actor(){
        return $this->belongsTo(User::class, "actor_id");
    }

    public function project(){
        return $this->belongsTo(Project::class, "project_id");
    }

    public function card(){
        return $this->belongsTo(Card::class, "card_id");
    }
}
