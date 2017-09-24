<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/24/17
 * Time: 12:13
 */

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class EmailRepository
{
    public function subscribers_list($subscribers_list)
    {
        if ($subscribers_list) {
            return $subscribers_list->map(function ($subscribers_item) {
                return [
                    'id' => $subscribers_item->id,
                    'name' => $subscribers_item->name,
                    'created_at' => format_full_time_date($subscribers_item->created_at),
                    'updated_at' => format_full_time_date($subscribers_item->updated_at),
                    'total_subscribers' => $subscribers_item->subscribers()->count(),
                ];
            });
        }
    }
}