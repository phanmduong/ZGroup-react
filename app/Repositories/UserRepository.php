<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 8/27/17
 * Time: 2:58 PM
 */

namespace App\Repositories;


use App\Card;
use App\User;

class UserRepository
{
    public function loadStaffs($filter, $take = 20, $skip = 0, $cardId)
    {
        $card = Card::find($cardId);
        $memberIds = $card->assignees()->pluck("id")->toArray();
        $members = User::where("role", ">=", 1)
            ->where(function ($query) use ($filter) {
                $query->where("name", "like", "%$filter%")
                    ->orWhere("email", "like", "%$filter%");
            })
            ->take($take)
            ->skip($skip)
            ->get()
            ->map(function ($member) use ($memberIds) {
                if (in_array($member->id, $memberIds)) {
                    $member['added'] = true;
                    return $member;
                } else {
                    $member['added'] = false;
                    return $member;
                }
            });
        return $members;
    }
}