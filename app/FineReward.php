<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 21:46
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class FineReward extends Model
{
    protected $table="fines_rewards";
    public function rule()
    {
        return $this->belongsTo(Rule::class, 'rule_id');
    }

    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }
}