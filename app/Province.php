<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table = 'province';

    public $incrementing = false;

    protected $primaryKey = 'provinceid';

    public function districts()
    {
        return $this->hasMany(District::class, 'provinceid', "provinceid");
    }

    public function transform()
    {
        return [
            "id" => $this->provinceid,
            "name" => $this->name,
            "type" => $this->type,
        ];
    }
}
