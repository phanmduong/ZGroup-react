<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    //
    protected $table = 'fields';
    public function transform(){
        return[
          "id" => $this->id,
          "name" => $this->name,
        ];
    }
}
