<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/10/17
 * Time: 00:17
 */

namespace App\Repositories;


class RuleRepository
{
    public function rule_chapters($rule_chapters)
    {
        if ($rule_chapters) {
            return $rule_chapters->map(function ($rule_chapter) {
                return $this->rule_parents($rule_chapter);
            });
        }
    }

    public function rule_parents($rule_chapter)
    {
        if ($rule_chapter) {

            $rules = $rule_chapter->rules()->where(function ($query) {
                $query->whereNull('rule_father_id')->orWhere('rule_father_id', 0);
            })->orderBy('order')->get();

            $rule_chapter->rules = $this->rule_childs($rules, $rule_chapter);

            return $rule_chapter;
        }
    }

    public function rule_childs($rules, $rule_chapter)
    {
        if ($rules) {
            return $rules->map(function ($rule) use ($rule_chapter) {

                $rule_childs = $rule_chapter->rules()->where('rule_father_id', $rule->id)->orderBy('order')->get();
                $rule->rule_childs = $rule_childs->map(function ($rule_child) {

                    return $this->rule_child($rule_child);
                });

                $rule->finesRewards;
                return $rule;
            });
        }
    }

    public function rule_child($rule_child)
    {
        $rule_child->finesRewards;
        return $rule_child;
    }
}