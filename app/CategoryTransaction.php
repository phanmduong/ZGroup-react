<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryTransaction extends Model
{
    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'color' => $this->color,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'updated_at' => format_vn_short_datetime(strtotime($this->updated_at)),
        ];
    }
}
