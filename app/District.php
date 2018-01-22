<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table = 'district';

    public $incrementing = false;

    protected $primaryKey = 'districtid';

    public function wards()
    {
        return $this->hasMany(Ward::class, 'districtid');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'provinceid');
    }

    public function bases()
    {
        return $this->hasMany(Base::class, "district_id");
    }

    public function transform()
    {
        return [
            "id" => $this->districtid,
            "name" => $this->name,
            "type" => $this->type,
            "location" => $this->location,
        ];
    }
}
