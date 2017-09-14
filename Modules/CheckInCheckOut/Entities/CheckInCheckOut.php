<?php

namespace Modules\CheckInCheckOut\Entities;

use App\Base;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CheckInCheckOut extends Model
{
    protected $fillable = [];
    use SoftDeletes;
    protected $table = "checkin_checkout";

    public function base(){
        return $this->belongsTo(Base::class, "base_id");
    }
}
