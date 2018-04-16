<?php

namespace Modules\NhatQuangShop\Entities;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [];
    protected $table = 'events';
    // Carbon::createFromFormat('Y-m', $dateVariable);
}
