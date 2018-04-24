<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    //
    protected $table = 'languages';

    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'encoding' => $this->encoding,
        ];
    }
}
