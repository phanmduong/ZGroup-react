<?php

namespace Modules\CheckInCheckOut\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Device extends Model
{
    protected $fillable = [];
    protected $table = "devices";
    use SoftDeletes;
}
