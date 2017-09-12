<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 21:45
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class RuleChapter extends Model
{
    public function rules(){
        return $this->hasMany(Rule::class,'rule_chapter_id');
    }
}