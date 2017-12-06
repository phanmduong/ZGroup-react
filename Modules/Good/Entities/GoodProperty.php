<?php

namespace Modules\Good\Entities;

use App\Good;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodProperty extends Model
{
    use SoftDeletes;
    protected $table = "good_properties";

    public function transform()
    {
        return [
            "id" => $this->id,
            "property_item_id" => $this->property_item_id,
            "name" => $this->name,
            "value" => $this->value
        ];
    }

}
