<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notifications';

    public function notificationType()
    {
        return $this->belongsTo(NotificationType::class, "type");
    }

    public function receiver()
    {
        return $this->belongsTo('App\User', 'receiver_id');
    }

    public function actor()
    {
        return $this->belongsTo('App\User', 'actor_id');
    }

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }

    public function transaction()
    {
        return $this->belongsTo('App\Transaction', 'product_id');
    }

    public function topic()
    {
        return $this->belongsTo('App\Topic', 'product_id');
    }

    public function card()
    {
        return $this->belongsTo(Card::class, "card_id");
    }
}
