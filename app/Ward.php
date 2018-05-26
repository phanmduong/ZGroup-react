<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    protected $table = 'ward';

    protected $primaryKey = 'wardid';

    public function district()
    {
        return $this->belongsTo(District::class, 'districtid');
    }
}
