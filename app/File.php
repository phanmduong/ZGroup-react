<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = "files";

    public function goods()
    {
        return $this->belongsToMany(Good::class, "file_good", "file_id", "good_id");
    }
}
