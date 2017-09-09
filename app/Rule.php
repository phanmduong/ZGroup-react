<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 21:45
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    public function ruleChapter()
    {
        return $this->belongsTo(RuleChapter::class, 'rule_chapter_id');
    }

    public function creator(){
        return $this->belongsTo(User::class,'creator_id');
    }

    public function finesRewards(){
        return $this->hasMany(FineReward::class,'rule_id');
    }
}