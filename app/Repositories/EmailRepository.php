<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/24/17
 * Time: 12:13
 */

namespace App\Repositories;

use App\Subscriber;
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

    public function subscriber($subscriber)
    {
        if ($subscriber) {
            return [
                'id' => $subscriber->id,
                'email' => $subscriber->email,
                'name' => $subscriber->name,
                'created_at' => format_full_time_date($subscriber->created_at),
                'updated_at' => format_full_time_date($subscriber->updated_at),
            ];
        }
    }

    public function add_subscriber($list_id, $email, $name = null)
    {
        $subscriber = Subscriber::where('email', $email)->first();
        if ($subscriber == null) {
            if ($email != null) {
                $subscriber = new Subscriber();
                $subscriber->email = $email;
                $subscriber->name = $name;
                $subscriber->save();
                $subscriber->subscribers_lists()->attach($list_id);
            }
        } else {
            $count = $subscriber->subscribers_lists()->where('id', $list_id)->count();
            if ($count <= 0) {
                $subscriber->subscribers_lists()->attach($list_id);
            }
            $subscriber->name = $name;
            $subscriber->save();
        }
    }
}