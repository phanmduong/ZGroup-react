<?php

namespace Modules\CheckInCheckOut\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppSession extends Model
{
    protected $fillable = [];
    protected $table = "app_sessions";
    use SoftDeletes;
}
