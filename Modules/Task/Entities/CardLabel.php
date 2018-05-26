<?php

namespace Modules\Task\Entities;

use App\Card;
use App\Task;
use Illuminate\Database\Eloquent\Model;

class CardLabel extends Model
{
    protected $table = "card_labels";

    public function cards()
    {
        return $this->belongsToMany(Card::class, "card_card_labels", "card_label_id", "card_id");
    }

}
