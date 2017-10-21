<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Good_category extends Model
{
    //
    protected $table = "good_categories";
    use SoftDeletes;
    public function Category_transform(){
        return([
            'id'=> $this->id,
             'name'=>$this->name,
            'parent_id'=>$this->parent_id
        ]);
    }
}
