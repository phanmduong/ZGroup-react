<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    //
    protected $table = 'passwords';
    protected $fillable = ['password'];
    public function transform(){
        return [
            "id" => $this->id,
            "code" => $this->code,
            "name" => $this->name,
            "password" => $this->password,
            "created_at" => $this->created_at
        ];
    }
}
