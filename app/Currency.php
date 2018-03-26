<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    //
    protected $table = 'currencies';

    public function transform()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "notation" => $this->notation,
            "ratio" => $this->ratio,
        ];
    }
}
