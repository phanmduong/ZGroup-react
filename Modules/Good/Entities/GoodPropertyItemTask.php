<?php

namespace Modules\Good\Entities;

use Illuminate\Database\Eloquent\Model;

class GoodPropertyItemTask extends Model
{
    use SoftDeletes;
    protected $table = "good_property_item_task";
}
