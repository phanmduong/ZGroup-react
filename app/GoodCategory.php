<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class
GoodCategory extends Model
{
    //
    protected $table = "good_categories";
    use SoftDeletes;
    public function CategoryTransform(){
        return([
            'id'=> $this->id,
            'name'=>$this->name,
            'parent_id'=>$this->parent_id
        ]);
    }

    public function goods()
    {
        return $this->hasMany(Good::class, 'good_category_id');
    }

    public function children()
    {
        return $this->hasMany(GoodCategory::class, 'parent_id');
    }
}
