<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Good\Entities\GoodProperty;

class Good extends Model
{
    protected $table = "goods";

    use SoftDeletes;

    public function orders()
    {
        return $this->hasMany('App\Order', 'good_id');
    }

    public function importedGoods()
    {
        return $this->hasMany('App\ImportedGoods', 'good_id');
    }

    public function goodWarehouse()
    {
        return $this->hasMany('App\GoodWarehouse', 'good_id');
    }

    public function properties()
    {
        return $this->hasMany(GoodProperty::class, "good_id");
    }
}
