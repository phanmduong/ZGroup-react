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
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

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

    public function campaingns($campaigns)
    {
        if ($campaigns) {
            return $campaigns->map(function ($campaign) {
                return $this->campaingn($campaign);
            });
        }
    }

    public function campaingn($campaign)
    {
        if ($campaign) {
            $open = $campaign->emails()->where('status', 3)->count();
            $sended = $campaign->emails()->count();
            $complaint = $campaign->emails()->where('status', 4)->count();
            $delivery = $campaign->emails()->where('status', 1)->count() + $open + $complaint;

            $total_subscribers_lists = $campaign->subscribers_lists->count();
            $data = [
                'id' => $campaign->id,
                'name' => $campaign->name,
                'subject' => $campaign->subject,
                'owner' => $this->userRepository->staff($campaign->owner),
                'send_status' => $campaign->sended,
                'open' => $open,
                'sended' => $sended,
                'avatar_url' => $campaign->email_form ? generate_protocol_url($campaign->email_form->avatar_url) : "",
                'complaint' => $complaint,
                'delivery' => $delivery,
                'hide' => $campaign->hide ? $campaign->hide : 0,
                'timer' => $campaign->timer,
                'form_id' => $campaign->form_id
            ];

            if ($total_subscribers_lists != 0) {
                $list_ids = $campaign->subscribers_lists()->get()->pluck('id')->toArray();
                $str = implode(',', $list_ids);
                $query = 'select distinct count(email) as nums from subscribers where id in ' .
                    "(select subscriber_id from subscriber_subscribers_list where subscribers_list_id in ($str)) ";
                $total = DB::select($query)[0]->nums;

                $data['subscribers_list_ids'] = $list_ids;
            }

            if (isset($total)) {
                $data['total'] = $total;
            }

            return $data;
        };
    }
}
