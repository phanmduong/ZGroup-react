<?php

namespace Modules\Good\Entities;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodPropertyItem extends Model
{
    use SoftDeletes;
    protected $table = "good_property_items";

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function transform()
    {
        return [
            "name" => $this->name,
            "prevalue" => $this->prevalue,
            "preunit" =>  $this->preunit,
            "type" => $this->type,
            "creator" => [
                    "id" => $this->creator->id,
                    "name" => $this->creator->name,
                    "email" => $this->creator->email
                ]
        ];
    }
}
