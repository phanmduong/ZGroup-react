<?php

namespace Modules\Good\Entities;

use App\Good;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodProperty extends Model
{
    use SoftDeletes;
    protected $table = "good_properties";

    public function good()
    {
        return $this->belongsTo(Good::class, "good_id");
    }

}
