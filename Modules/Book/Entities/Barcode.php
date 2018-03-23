<?php

namespace Modules\Book\Entities;

use App\Good;
use Illuminate\Database\Eloquent\Model;

class Barcode extends Model
{
    protected $table = "barcode";

    public function good()
    {
        return $this->belongsTo(Good::class, "good_id");
    }

    public function transform()
    {
        $data = [
            "id" => $this->id,
            "value" => $this->value,
            "image_url" => $this->image_url
        ];

        if ($this->good) {
            $data["good"] = [
                "id" => $this->good->id,
                "name" => $this->good->name
            ];
        }

        return $data;
    }
}
