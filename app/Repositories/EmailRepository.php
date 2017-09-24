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
                return $this->subscribers_list_item($subscribers_item);
            });
        }
    }

    public function subscribers_list_item($subscribers_list_item)
    {
        if ($subscribers_list_item) {
            return [
                'id' => $subscribers_list_item->id,
                'name' => $subscribers_list_item->name,
                'created_at' => format_full_time_date($subscribers_list_item->created_at),
                'updated_at' => format_full_time_date($subscribers_list_item->updated_at),
                'total_subscribers' => $subscribers_list_item->subscribers()->count(),
            ];
        }
    }
}