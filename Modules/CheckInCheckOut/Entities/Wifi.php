<?php

namespace Modules\CheckInCheckOut\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wifi extends Model
{
    protected $fillable = [];
    protected $table = "wifis";
    use SoftDeletes;
}
