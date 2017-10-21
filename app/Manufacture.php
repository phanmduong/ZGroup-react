<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manufacture extends Model
{
    //
    protected $table = "manufactures";
    public function Transform(){
        return [
            "id" => $this->id,
            "name" => $this->name
        ];
    }
}
